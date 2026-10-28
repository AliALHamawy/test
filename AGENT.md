# ⚡ AGENT.md — Next.js Master Architecture & Rules

> **Core Objective:** Build a high-end, production-ready, Apple-style web application with strict adherence to modern engineering standards, zero bloat, and surgical precision.

---

## 🛠️ 1. Tech Stack & Package Manager Standards
- 📦 **Package Manager:** Use **`pnpm`** exclusively for all commands (`pnpm add`, `pnpm dev`). *Never* use npm or yarn.
- 🚀 **Initialization:** Always use `pnpm create next-app@latest` for the latest stable React & Next.js versions.
- 📂 **Project Structure (No `src` folder):** Use the standard root-level structure (`app/`, `components/`, `public/`).
- ⚙️ **Core Ecosystem:** Next.js (App Router), TypeScript (Strict Mode), and ESLint.

---

## 🛑 2. Pre-Build Phase, Questions & Design System
- 🔍 **Relentless Questioning Rule (Zero Assumptions):**
  - **Mandatory:** Never start coding or assuming requirements blindly.
  - The AI **must ask detailed questions** about project scope, flows, component behavior, and UX before touching code.
- 🎨 **UI/UX Blueprint & Inspiration:**
  - Propose modern concepts (Liquid Glassmorphism, Bento Grids, micro-interactions) based on top-tier design trends.
  - Submit a clear blueprint and get explicit user approval before writing any file.
- 🧩 **Component Library:** Use **shadcn/ui** and **Magic UI** as primary sources. Never reinvent standard primitives from scratch.
- 🎨 **Theming & Colors:**
  - Discuss color palettes and Dark/Light modes before setup.
  - **Strict Color Rule:** *Never* use hard-coded arbitrary color classes (e.g., `bg-[#123456]`). Always use shadcn/ui CSS variables (`bg-primary`, `text-muted-foreground`).

---

## 📂 3. Component Organization & Flat Architecture
| Directory / Path | Purpose & Guidelines |
| :--- | :--- |
| `components/ui/` | Reserved exclusively for raw/primitive shadcn/ui components. |
| `components/myComponents/` | Custom project components, categorized cleanly. |
| ├── `shared/` | Global shared components used across multiple pages (`Header.tsx`, `Footer.tsx`). |
| └── `[page-name]/` | Page-specific component folders (`home/`, `shop/`, `craft/`). |

- ⚡ **Flat Page Structure:** Page files (`app/page.tsx`) must import and render page-specific components **directly** (e.g., `<HeroSection />`). *Never* create redundant intermediate wrapper components like `HomePage.tsx`.
- 💻 **Client/Server Boundaries:** Keep public pages as **Server Components** by default, isolating interactivity into small client components (`'use client'`). Highly interactive views (dashboards, settings) can be full Client Components.

---

## 📐 4. Strict Layout & Shared Components Policy (No Duplication)
- 🏛️ **Shared Layouts (`layout.tsx`):** All global elements appearing across multiple pages—such as navigation Headers, Footers, and global wrappers—**must** reside inside root or route-specific layout files (`app/layout.tsx`).
- 🚫 **Strict Prohibition in Pages:** *Never* place global navigation or Footer components directly inside individual page files (`app/page.tsx`). Pages must focus solely on unique route content.

---

## 🧠 5. State Management Policy
- 🟢 **Local State:** Use standard React `useState` or `useReducer` for localized component logic.
- 🔵 **Global State:** Use **Zustand** (preferred for lightweight global state) or **Redux Toolkit** when scale demands it.
- ❌ **Strict Prohibition:** **Never use React Context API** for global or shared state management under any circumstances.

---

## 💎 6. Code Quality, Strict Naming & Surgical Edits
- 🔠 **Naming Conventions Policy:**
  - **PascalCase (Default):** Components, Types, Interfaces, Functions, Variables, and files inside `components/myComponents/`.
  - **camelCase (Strict Exception):** Used *only* for React hooks and state setters (`useAuth`, `useState`, `setIsLoading`).
  - **kebab-case:** Used *only* for App Router folder paths (`app/user-profile/page.tsx`).
- 🔬 **Precise & Surgical Edits:** When modifying code, update *only* the specific lines or parts requested. Never rewrite entire files or break shared dependencies.
- 👁️ **Visual Inspection on Persistent Issues:** If a visual bug persists after 1-2 attempts, stop guessing. Inspect rendered DOM styles and console errors to pinpoint the root cause.

---

## 🛣️ 7. Routing & External Libraries (TanStack Policy)
- 🚦 **Routing:** Rely natively on Next.js App Router.
- 📦 **TanStack Rule:** Do not introduce TanStack Router or React Query arbitrarily. Propose and explain the need first, awaiting user confirmation.

---

## 🚀 8. Build, Lint & Git Workflow
- 🛠️ **Standard Verification Commands:**
  - `pnpm build`
  - `pnpm lint`
  - `pnpm type-check` (or `tsc --noEmit`)
- 📌 **Git Workflow:** Keep operations clean and concise:
  - `git add .`
  - `git commit -m "Clear and concise message"`
  - `git push`