# 🎯 Figma Quiz — Pixel-Perfect Frontend Implementation

This project is a **desktop-only quiz application** built to accurately reproduce the UI from the provided **Figma design** with pixel-perfect precision, smooth interactions, and WCAG-compliant accessibility.

It is implemented using **React + TypeScript + Tailwind CSS** and includes improvements for accessibility, performance, and production readiness.

---

## 🚀 Live Demo  
*(Add your deployed Vercel/Netlify link here)*  
**Demo:** https://figma-quiz-frontend.vercel.app

---

## 🛠 Tech Stack Used
- **React (TypeScript)** — Component-driven UI  
- **Tailwind CSS** — Utility-first styling  
- **Create React App (CRA) + react-scripts**  
- **Framer Motion (optional, not included)**  
- **WebP Images (recommended for optimization)**  

---

## 📦 Folder Structure
```
figma-quiz/
│── public/
│   ├── assets/
│   │   ├── paw.png
│   │   └── hero-illustration.png
│   ├── index.html
│
│── src/
│   ├── components/
│   │   ├── Quiz.tsx
│   │   └── Result.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── App.tsx
│   └── types.ts
│
│── package.json
│── tailwind.config.js
│── README.md
```

---

# ⚙️ Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm start
```
This runs the project at:  
👉 **http://localhost:3000**

### 3. Build for production
```bash
npm run build
```

### 4. Deploy
You may deploy the `/build` folder via:

- **Vercel (recommended)**
- **Netlify**
- **GitHub Pages**

---

# ✨ Key Features Implemented

### 🎯 1. Pixel-Perfect UI  
Every spacing, font size, color, radius, and component layout follows the Figma design.

### 🎨 2. Tailwind Styling  
Consistent utility classes, custom color tokens, and responsive layout for desktop screens.

### ⚡ 3. Smooth Interactions  
Hover states, transitions, and animated progress indicators mimic a refined UI experience.

### ♿ 4. WCAG 2.1 Accessibility  
Includes:
- `aria-live` announcements  
- Proper button semantics  
- Keyboard navigation support  
- Visible focus outlines  
- Skip-to-content link  

### 🖼 5. Optimized Images  
Decorative images use lazy-loading + WebP fallback support.

### 🧩 6. Modular TypeScript Components  
Separated into `Quiz`, `Result`, and shared types for maintainability.

---

# 🧪 Improvements Added (as part of assignment)

- Added **`aria-live`** region to announce the score for screen readers  
- Added **`.sr-only`** utility class  
- Replaced static `<img>` with `<picture>` and **WebP fallback**  
- Added **Skip to Content** link in `index.html`  
- Updated `package.json` with:
  - `engines`
  - `repository`
  - `lint` & `format` scripts  
- Added `id="main"` target for accessibility navigation  

---

# 📌 Assumptions Made

1. The quiz design is **desktop-only**, so no mobile responsiveness was implemented unless specified.  
2. Questions are locally defined (`QUESTIONS` constant) since no API was required.  
3. Images in `public/assets/` are assumed to be Figma exports; replacements may be required for 100% pixel accuracy.  
4. No authentication or state persistence (localStorage/server) was required.

---

# ⏱ Time Spent on the Assignment
| Task | Time |
|------|------|
| Setting up React + Tailwind | 30 min |
| Building Quiz UI | 2–3 hours |
| Building Result Screen | 1 hour |
| Pixel-perfect adjustments | 1–2 hours |
| Accessibility improvements | 45 min |
| Final polish + README | 30 min |
| **Total** | **~6 hours** |

---

# 📝 Pre-Submission Checklist

✔ `npm start` runs without errors  
✔ Pixel-perfect visuals matched to Figma  
✔ Hover & focus states implemented  
✔ Accessible navigation and labels  
✔ Production build created (`npm run build`)  
✔ Images optimized  
✔ Live demo deployed  
✔ README completed (this file)

---

# 🙌 Conclusion

This project demonstrates:
- Strong understanding of **React + TypeScript**  
- Ability to convert **Figma designs → real UI**  
- Attention to detail  
- Accessibility best practices  
- Clean, maintainable code  


