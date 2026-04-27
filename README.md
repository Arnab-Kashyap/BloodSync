# 🩸 BloodSync

> Connecting blood donors with those in need — faster, smarter, when it matters most.

BloodSync is a full-stack web application that helps people find blood donors during emergencies across India. A smart matching algorithm ranks donors by availability, proximity, and reliability — and an AI assistant guides users through the process.


---

## ✨ Features

- 🔍 Search donors by blood group and location with automatic compatibility matching
- 📊 Smart donor scoring algorithm — ranks by availability, distance, and donation history
- 🚨 Emergency request system — post a request and alert nearby donors instantly
- 💬 AI assistant powered by OpenRouter — answers blood donation questions in real time
- 📍 India-wide coverage across all 28 states with city-level precision

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Auth | JWT |
| AI Chatbot | OpenRouter API |
| Deployment | Vercel + Render |

---

## 🧠 Smart Matching Algorithm

Every search scores donors out of 100:

```
Availability status     → 40 pts
Proximity to requester  → 30 pts
WHO 56-day cooldown     → 20 pts
Response rate history   → 10 pts
```

Compatible blood groups are automatically included — searching O+ also returns O- donors.

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/Arnab-Kashyap/BloodSync.git

# Install
cd server && npm install
cd ../client && npm install

# Configure server/.env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRE=7d
OPENROUTER_API_KEY=your_openrouter_key

# Run
cd server && npm run dev   # http://localhost:5000
cd client && npm run dev   # http://localhost:5173
```

---

## 📌 Roadmap

- [x] Donor registration + JWT auth
- [x] Smart donor search with compatibility logic
- [x] Emergency request system
- [x] AI chatbot (OpenRouter)
- [x] Deployed on Vercel + Render

---

## 👨‍💻 Author

**Arnab Kashyap** — [@Arnab-Kashyap](https://github.com/Arnab-Kashyap)

---

> 💡 Built with purpose — because a few minutes can save a life.
