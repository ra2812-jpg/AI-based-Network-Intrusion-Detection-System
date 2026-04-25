import React, { useState, useEffect } from "react";
import axios from "axios";

// MUI
import {
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Chart
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [result, setResult] = useState("");
  const [logs, setLogs] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoMode, setAutoMode] = useState(true);

  // 🎨 Theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  // 🔍 Manual check
  const sendData = async () => {
    try {
      const data = {
        features: [0,1,2,3,100,200,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,10,10,0.1,0.1,0,0,1,0,0,255,10,0.5,0.1,0.1,0,0.1,0.1,0,0]
      };

      const res = await axios.post("http://localhost:3000/detect", data);
      setResult(res.data.result);
      fetchLogs();
    } catch (error) {
      console.log(error);
    }
  };

  // 🚨 Simulate Attack
  const simulateAttack = async () => {
    try {
      const res = await axios.post("http://localhost:3000/simulate-attack");
      setResult(res.data.result);
      fetchLogs();
    } catch (error) {
      console.log(error);
    }
  };

  // 🧹 Clear logs
  const clearLogs = async () => {
    try {
      await axios.delete("http://localhost:3000/clear-logs");
      setLogs([]);
      setResult("");
    } catch (error) {
      console.log(error);
    }
  };

  // 📥 Fetch logs
  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/logs");

      const newLogs = res.data.map(log => ({ ...log }));
      setLogs(newLogs);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔄 Auto mode + refresh
  useEffect(() => {
    fetchLogs();

    const interval = setInterval(async () => {
      fetchLogs();
      setLastUpdated(new Date());

      if (autoMode) {
        const random = Math.random();

        if (random < 0.7) {
          // Normal traffic
          await axios.post("http://localhost:3000/detect", {
            features: [0,1,2,3,100,200,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,10,10,0.1,0.1,0,0,1,0,0,255,10,0.5,0.1,0.1,0,0.1,0.1,0,0]
          });
        } else {
          // Attack traffic
          await axios.post("http://localhost:3000/simulate-attack");
        }
      }

    }, 4000);

    return () => clearInterval(interval);
  }, [autoMode]);

  // 📊 Stats
  const total = logs.length;
  const normal = logs.filter(l => l.result === "Normal").length;
  const attack = logs.filter(l => l.result === "Attack").length;

  // 📊 Chart
  const chartData = {
    labels: ["Normal", "Attack"],
    datasets: [
      {
        label: "Traffic",
        data: [normal, attack],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container style={{ marginTop: "30px", minHeight: "100vh" }}>

        <Typography variant="h4" align="center">
          🔐 Intrusion Detection Dashboard
        </Typography>

        {/* Dark Mode */}
        <div style={{ textAlign: "center" }}>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Dark Mode
        </div>

        {/* Buttons */}
        <Button
          variant="contained"
          onClick={sendData}
          style={{ display: "block", margin: "20px auto" }}
        >
          🔍 Manual Check
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={simulateAttack}
          style={{ display: "block", margin: "10px auto" }}
        >
          🚨 Simulate Attack
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={clearLogs}
          style={{ display: "block", margin: "10px auto" }}
        >
          🧹 Clear Logs
        </Button>

        <Button
          variant="contained"
          onClick={() => setAutoMode(!autoMode)}
          style={{ display: "block", margin: "10px auto" }}
        >
          {autoMode ? "⏸ Stop Auto Mode" : "▶ Start Auto Mode"}
        </Button>

        {/* Result */}
        <Typography align="center" variant="h6">
          Result: {result}
        </Typography>

        {/* Alert */}
        {result === "Attack" && (
          <Typography color="error" align="center">
            ⚠️ Intrusion Detected!
          </Typography>
        )}

        {/* Live time */}
        <Typography align="center" style={{ marginTop: "10px" }}>
          🔄 Last updated: {lastUpdated.toLocaleTimeString()}
        </Typography>

        {/* Cards */}
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid xs={4}>
            <Card>
              <CardContent>
                <Typography>Total</Typography>
                <Typography variant="h5">{total}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={4}>
            <Card>
              <CardContent>
                <Typography>Normal</Typography>
                <Typography variant="h5">{normal}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={4}>
            <Card>
              <CardContent>
                <Typography>Attacks</Typography>
                <Typography variant="h5">{attack}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Chart */}
        <div style={{ width: "500px", margin: "40px auto" }}>
          <Bar data={chartData} />
        </div>

        {/* Table */}
        <Typography variant="h5" align="center">
          Logs
        </Typography>

        <table border="1" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Result</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No Data Available
                </td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td style={{ color: log.result === "Attack" ? "red" : "green" }}>
                    {log.result}
                  </td>
                  <td>{new Date(log.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </Container>
    </ThemeProvider>
  );
}

export default App;