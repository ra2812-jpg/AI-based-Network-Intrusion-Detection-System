const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rahul2812", 
    database: "intrusion_db"
});

db.connect((err) => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("✅ MySQL Connected");
    }
});
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/detect", async (req, res) => {
    try {
        const features = req.body.features;

        const response = await axios.post("http://127.0.0.1:5000/predict", {
            features: features
        });

        const result = response.data.prediction;

        // 🔥 Save to MySQL
        db.query(
            "INSERT INTO logs (result) VALUES (?)",
            [result],
            (err) => {
                if (err){ console.log("DB Error:",err);
                }else{
                    console.log("Data inserted",result);
                }
            }
        );

        res.json({ result });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error" });
    }
});
app.post("/simulate-attack", (req, res) => {
    const result = "Attack";

    db.query(
        "INSERT INTO logs (result) VALUES (?)",
        [result],
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "DB Error" });
            }

            console.log("🔥 Fake Attack inserted");
            res.json({ result });
        }
    );
});
app.get("/logs", (req, res) => {
    db.query(
        "SELECT * FROM logs ORDER BY id DESC LIMIT 50", // 🔥 ADD LIMIT
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        }
    );
});
app.delete("/clear-logs", (req, res) => {
    db.query("DELETE FROM logs", (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "DB Error" });
        }

        console.log("🧹 Logs cleared");
        res.json({ message: "Logs cleared" });
    });
});
app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});