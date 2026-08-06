require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
  res.send("Fleet Ping Service Running");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
  });
});

app.get("/ready", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      status: "ready",
    });
  } catch {
    res.status(503).json({
      status: "database unavailable",
    });
  }
});

app.post("/api/fleet/ping", async (req, res) => {
  try {
    const { vehicleId, lat, lng, speed, timestamp } = req.body;

    await pool.query(
      "INSERT INTO fleet_pings(vehicle_id,lat,lng,speed,ts) VALUES($1,$2,$3,$4,$5)",
      [vehicleId, lat, lng, speed, timestamp]
    );

    res.json({
      status: "ok",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { phone } = req.body;

    const result = await pool.query(
      "SELECT * FROM drivers WHERE phone=$1",
      [phone]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Driver not found",
      });
    }

    const token = jwt.sign(
      {
        driverId: result.rows[0].id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

process.on("SIGTERM", async () => {
  console.log("Graceful shutdown");
  await pool.end();
  server.close(() => process.exit(0));
});

module.exports = app;