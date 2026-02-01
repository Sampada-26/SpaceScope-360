# SpaceScope 360

## 📂 Project Structure

```text
SpaceScope-360/
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

## 🚀 Quick Start

**Terminal 1 (Frontend):**
```bash
cd client && npm run dev
```

**Terminal 2 (Backend):**
```bash
cd server && npm run dev
```
