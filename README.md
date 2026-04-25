# 🔐 Network Intrusion Detection System (NIDS)

## 📌 Overview

This project is an **AI-based Network Intrusion Detection System** that detects whether network traffic is **Normal** or an **Attack** using Machine Learning.

It is a full-stack system that integrates:

* ⚛️ React (Frontend Dashboard)
* 🌐 Node.js (Backend API)
* 🤖 Python (Machine Learning Model)
* 🗄️ MySQL (Database)

---

## 🚀 Features

* 🔍 Manual Network Check
* 🚨 Simulate Attack
* 🔄 Auto Mode (real-time simulation)
* 📊 Live Dashboard with Charts
* 📋 Logs Table (Normal / Attack)
* 🧹 Clear Logs Functionality
* 🌙 Dark Mode UI

---

## 🧠 Machine Learning

* **Algorithm:** Random Forest
* **Dataset:** NSL-KDD
* **Type:** Supervised Learning (Classification)

The model is trained to classify network traffic as **Normal** or **Attack** based on input features.

---

## 🏗️ System Architecture

```
React (Frontend)
       ↓
Node.js (Backend)
       ↓
Python (ML Model)
       ↓
MySQL (Database)
       ↓
Frontend (Dashboard)
```

---

## 🔄 How It Works

1. User interacts with the dashboard
2. Request is sent to Node.js backend
3. Backend forwards data to Python ML model
4. Model predicts **Normal / Attack**
5. Result is stored in MySQL database
6. Frontend fetches and displays results

---

## 📂 Project Structure

```
network-ids/
│
├── frontend/      # React Application
├── backend/       # Node.js Server
├── ml-model/      # Python ML Model
├── database/      # MySQL Setup
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/network-ids.git
cd network-ids
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
node server.js
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

---

### 4️⃣ Machine Learning Setup

```
cd ml-model
pip install -r requirements.txt
python predict_api.py
```

---

## 🗄️ Database Setup

Create database:

```
CREATE DATABASE intrusion_db;
```

Create table:

```
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    result VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📊 Output

* Displays real-time logs of network activity
* Classifies traffic as **Normal** or **Attack**
* Visualizes results using charts and statistics

---

## 🔮 Future Scope

* Real-time packet capture using tools like Wireshark or Scapy
* Cloud deployment
* Advanced attack classification

---

## 👨‍💻 Author

**Rahul Mishra**

---

## ⭐ Conclusion

This project demonstrates how Machine Learning can be combined with full-stack development to build a system capable of detecting network intrusions and visualizing results in a real-time dashboard.
