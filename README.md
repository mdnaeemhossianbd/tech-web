# Tech With Munshi — Development & Run Guide for VS Code

This repository contains the official web platform for **Tech With Munshi** (hosted by **MD Naeem Hossin**).

Follow the steps below to run this project locally on your computer inside **Visual Studio Code (VS Code)**.

---

## 1. Prerequisites

Make sure you have **Node.js** (version 18 or newer) installed on your computer.
- Download Node.js from: [https://nodejs.org](https://nodejs.org)
- Check your installation in your terminal:
  ```bash
  node -v
  npm -v
  ```

---

## 2. Open the Project in VS Code

1. Open **Visual Studio Code**.
2. Click **File** > **Open Folder...** (or press `Ctrl+K Ctrl+O` on Windows / `Cmd+O` on Mac).
3. Select this project folder and click **Open**.

---

## 3. Install Dependencies

Open the built-in terminal in VS Code:
- Press **``Ctrl + ` ``** (or `Cmd + ~` on Mac), or go to menu **Terminal** > **New Terminal**.
- Run:
  ```bash
  npm install
  ```
*(This will download and install all required packages: React, Tailwind CSS, Lucide Icons, Vite, etc.)*

---

## 4. Run the Development Server

In the same terminal, run:
```bash
npm run dev
```

You will see output similar to:
```text
  VITE v8.3.0  ready in 250 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://0.0.0.0:3000/
```

- Hold `Ctrl` (or `Cmd` on Mac) and **click** the `http://localhost:3000/` link in the terminal, or open your web browser and navigate to:
  ```
  http://localhost:3000
  ```

---

## 5. Easy 1-Click Run in VS Code

We have included pre-configured VS Code tasks:
- Press `Ctrl + Shift + B` (or `Cmd + Shift + B` on Mac) to immediately start the `npm: dev` server.
- Or press `F5` to launch Chrome debugging directly to `http://localhost:3000`.

---

## 6. Project Scripts Summary

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server at `http://localhost:3000` with instant hot-reload |
| `npm run build` | Compiles and builds the production bundle into the `dist/` folder |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript type checks (`tsc --noEmit`) to verify code integrity |

---

## 7. How to Add New Mobiles & Content

All content is separated into clean JSON files under `src/data/`:
- **`src/data/mobiles.json`**: Add, edit, or remove smartphone specifications, prices for Saudi Arabia (SAR) & Bangladesh (BDT), and gaming test results.
- **`src/data/reviews.json`**: Written tech reviews across categories.
- **`src/data/videos.json`**: YouTube video embeds and test logs.
- **`src/data/guides.json`**: In-depth tech buyer guides.
- **`src/locales/`**: Multi-language translations (`en.json`, `bn.json`, `ar.json`, `es.json`).
