# CODRx

X3.5.1.1 DRUG STORE EXAMPLE

The project was to develop an online drug store to sell cheaper Canadian prescription drugs to (primarily) U.S. customers. The sale of these drugs is a contentious subject in Canada as well as the U.S. and as a result the industry is characterized by swift regulation changes and fierce competition. The project faced extremely volatile requirements with major changes week on week. It used very short (2-day) iterations and weekly releases to tackle the high rates of change.

As shown in [**Figure X3-12**](https://learning.oreilly.com/library/view/agile-practice-guide/9781628253993/appendix_x3.xhtml#figx3-12), high levels of buy-in and trust are evident for those who worked in an empowered way. The visual nature of the website made it easy to show new increments of functionality, but the system criticality was fairly high with essential funds for the pharmacy at stake. As mentioned, there were very high rates of change, but the small experienced team handled them well and had easy access to a knowledgeable business representative. The approach was very successful and extremely agile.
<br><br>
![drugs store example](./image%20(1).png)

# 💊 CODRX Front-End (Next.js + Tailwind + TypeScript)

**Project Name:** CODRX – *Cross-Border Online Drugstore for Prescriptions*  
**Purpose:** Develop a secure, modern, and scalable front-end for the CODRX platform.  
**Stack:** Next.js 14 (App Router) • TypeScript • Tailwind CSS  
**Author(s):** Agile Development Team (CODRX Initiative)

---

## 🚀 1. Overview

This project is a **Next.js 14** application designed for agile front-end development and KVM (Key Value Metric) tracking.

The setup follows industry best practices for React/Next.js with Tailwind, TypeScript, and clear folder structures for:
- Reusable **components**
- API integrations under **lib/**
- Documentation under **docs/**
- Future authentication and dashboard pages

---

## 🧰 2. Prerequisites

Before cloning or contributing, make sure you have:

| Tool | Version | Purpose |
|------|----------|----------|
| **Node.js** | ≥ 20.x (LTS) | Runs the app and `npx` |
| **npm** | ≥ 10.x | Installs dependencies |
| **VS Code** | Latest | Recommended IDE |
| **Git** | Latest | Version control |

Check your versions:
```bash
node -v
npm -v
npx -v
```

## If any of these commands are "not recognized", install Node.js from:  [Node.js Download Page](https://nodejs.org/en)

## ⚙️ 3. Setting Up the Environment (Windows Guide)
### Step 1 — Fix PowerShell Permissions (if needed)

If you see an error like:
```bash
npx : The term 'npx' is not recognized...
```

or
```bash
npm.ps1 cannot be loaded because running scripts is disabled...
```

✅ Run this command in PowerShell:
```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

Then close and reopen PowerShell or VS Code.

### Step 2 — Confirm npx Works
npx -v


If you get a version number (e.g. 11.6.2), you’re good to go.
If not, reinstall Node.js and make sure “Add to PATH” is checked during setup.

### Step 3 — Create the Project

In your preferred workspace folder (not system32):

```bash
npx create-next-app@latest codrx-frontend --ts --eslint --tailwind --app --src-dir=false
```


### When prompted:

| Question | Recommended Answer |
|---|---|
| Use React Compiler? | Yes ✅ |
| Use a src/ directory? | No ❌ |
| Use Turbopack? | Yes ✅ |
| Customize import alias? | No ❌ (Keep default @/*) |

### Step 4 — Folder Setup

Inside your new project:

```bash
cd codrx-frontend
mkdir components
mkdir lib
mkdir docs
```


### Add placeholder files:

```bash
components/NavBar.tsx

lib/api.ts

docs/README.md
```

These folders will hold UI components, API helpers, and project documentation.

## 🧩 4. Running the App

Start the development server:

```bash
npm run dev
```


Visit:
👉 http://localhost:3000

If it opens correctly, you’ve successfully bootstrapped the CODRX frontend 🎉

## 🧱 5. Project Structure

```text
codrx-frontend/
│
├── app/            # Next.js App Router pages
├── components/     # Reusable UI components
├── lib/            # API calls, helpers, auth
├── docs/           # Documentation & iteration notes
├── public/         # Static files (logo, icons)
├── styles/         # Tailwind global CSS
│
├── package.json    # Dependencies & scripts
└── README.md       # This file
```

## 🔧 6. Troubleshooting Common Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| `npx` not recognized | Node.js not added to PATH | Reinstall Node.js with "Add to PATH" checked |
| PowerShell blocks scripts | ExecutionPolicy restricted | Run: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force` |
| VS Code README not editable | Markdown preview mode active | Press `q` or select "Reopen Editor With → Text Editor" |
| "Could not find part of the path" | PowerShell mkdir limitation | Run commands separately: `mkdir components`, `mkdir lib`, `mkdir docs` |
| Visual Studio Build Tools popup | Unnecessary node-gyp trigger | Safe to cancel - not needed for frontend development |

---
## 📘 7. Iteration Log (Agile Notes)

| Iteration | Focus | Status |
|-----------|-------|--------|
| **Sprint 1** | Environment setup & troubleshooting | ✅ Complete |
| **Sprint 2** | Folder structure, docs, NavBar | 🔄 In Progress |
| **Sprint 3** | Layout integration, Tailwind base styling | ⏳ Planned |
| **Sprint 4** | Authentication, protected pages | ⏳ Planned |

*Last Updated: October 2025*

## 🧩 8. Next Steps

- Add a global layout with `<NavBar />`

- Configure `globals.css` for styling

- Build core pages:

  - `/signin`

  - `/dashboard`

  - `/prescriptions`

  - `/orders`

## 🧑‍💻 9. Contributing

- Fork the repository on GitHub, then clone your fork:

    ```bash
    git clone https://github.com/<your-username>/codrx-frontend.git
    cd codrx-frontend
    ```

- Create a feature/fix branch for each change (use clear, short names):

    ```bash
    git checkout -b feat/<short-description>
    git checkout -b fix/<issue-number>-<short-description>
    ```

- Make focused commits with meaningful messages (conventional style recommended):
  - Examples: `feat: add prescription list`, `fix: handle null patientId`
  - Reference issues in commits: `closes #123`

- Document every iteration and design decision under docs/:
  - Update docs/README.md or add a dated note like `docs/iteration-2025-10-27.md`
  - Include purpose, changes, testing steps, and any migration notes

- Run local checks before pushing:

    ```bash
    npm install
    npm run lint
    npm run build
    npm run dev
    ```

- Push your branch and open a Pull Request against main:
  - Provide a descriptive title and summary
  - Include linked issues (e.g., `closes #123`), testing instructions, and screenshots if UI changes
  - Assign reviewers and add relevant labels

- After review:
  - Address feedback with follow-up commits (use the same branch)
  - Squash or rebase as requested by maintainers, then merge once CI is green

- Keep contributions small and focused; update docs/ for any user-facing or architectural changes.

## 🧩 Result

### ✅ codrx-frontend runs locally with:

- TypeScript + Tailwind configured

- lean folder structure (app, components, lib, docs)

- Editable README and doc files

Start server:

```bash
npm run dev
```

Open → http://localhost:3000

## 🧭 10. Summary

This README was designed for:

- First-time developers joining CODRX

- Agile iteration tracking

- Troubleshooting clarity for Windows users.
