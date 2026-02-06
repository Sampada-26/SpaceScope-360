# Singularity

**Democratizing Space: From Cosmic Observation to Earth Application**

Singularity is an interactive web platform that centralizes space observation, space education, and Earth-monitoring insights into one unified futuristic dashboard.  
Built as a hackathon-ready demo, this project makes complex space data simple, visual, and accessible for students, educators, and the general public.

---

## 🌌 Vision

Space data today is scattered, technical, and difficult to understand.  
**Singularity bridges the gap between space science and real-world impact** by transforming satellite data, missions, and cosmic activity into intuitive visual experiences.

From tracking satellites and cosmic weather to learning space science and understanding how satellites protect Earth all in one platform.

---

## 🧭 Core Modules

### 🛰️ Sky Watcher  
Explore the sky like never before.

- 3D rotating Earth placeholder with satellite & ISS markers  
- Smart alerts for visible ISS passes & sky events  
- Traffic-light space alerts (Safe / Moderate / Storm)  
- Celestial event cards with visibility maps  

---

### 📚 Cosmic Classroom  
Learn space science interactively.

- Interactive mission explorer with Earth-impact insights  
- Gamified quizzes with badge levels:
  - Cadet → Explorer → Pilot → Commander  
- Infographics, fun facts & progress tracking  

---

### 🌍 Earth Guardian  
Discover how satellites protect our planet.

- Before/After satellite comparison sliders  
- Disaster monitoring map (floods, fires, cyclones)  
- Satellite Impact Lab with real-world use cases:
  - Agriculture monitoring  
  - Disaster prediction  
  - Climate tracking  
  - Urban planning
- Cosmic weather


---

### ☀️ Cosmic Weather (Advanced Feature)

- Solar storm & radiation alerts  
- Aurora forecast visualization  
- Space weather activity timeline  

---

### Missions
Space mission timeline including information about the motion.

## 🛠️ Tech Stack

This project is built using modern technologies:

- ⚡ Vite  
- ⚛️ React + TypeScript  
- 🎨 Tailwind CSS  
- 🧩 shadcn-ui  
- 🔀 React Router  
- 📁 Mock JSON data (No backend, No APIs)
- MongoDB

---

## ✨ Feature Highlights

- Dark futuristic NASA-style UI  
- Fully responsive design  
- Multi-language support (English, Hindi, Marathi)  
- Modular component-based architecture  
- Clean, well-commented hackathon-ready code  
- Runs completely on frontend with mock data  

---

## 📂 Project Structure

```text
Singularity/
├── client/                  # Frontend (React + Vite + TS)
│   ├── src/
│   │   ├── components/      # Reusable UI elements (Buttons, Cards, Globe)
│   │   ├── pages/           # Main Screens (SkyWatcher, Classroom, Guardian)
│   │   ├── layouts/         # Global Layouts (Navbars, Wrappers)
│   │   ├── hooks/           # Custom React Hooks
│   │   ├── lib/             # Helpers & Utilities
│   │   ├── types/           # TypeScript Definitions
│   │   └── App.tsx          # Main Application Component
│   ├── index.html
│   └── vite.config.ts
│
└── server/                  # Backend (Node + Express)
    ├── index.js             # Main Server Entry Point
    ├── .env                 # Environment Variables
    └── package.json         # API Dependencies
```
## 🧑‍💻 Local Development and installation

Make sure you have **Node.js & npm** installed.

```sh
# Clone the repository
git clone https://github.com/Sampada-26/SpaceScope-360.git

# Navigate into the project
cd SpaceScope-360

Create .env file server 

# Install dependencies
cd client
npm install

cd server
npm install

**Terminal 1 (Frontend):**
```bash
cd client && npm run dev

**Terminal 2 (Backend):**
```bash
cd server && npm run dev
```
