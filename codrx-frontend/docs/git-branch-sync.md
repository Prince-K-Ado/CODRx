# 🔄 CODRX – Git Branch Synchronization Guide

**Purpose:** Keep `main` and `dev` at the same commit level so the team workflow stays consistent.

---

## 1. Overview

- **main** — stable, deployable branch  
- **dev** — active development branch for features and fixes

Periodically align these branches to prevent drift and minimize merge conflicts.

---

## 2. Prerequisites

- Git installed and configured  
- Clean working directory (no uncommitted changes)  
- `main` and `dev` exist locally and on the remote

Quick checks:
```bash
git status
git fetch origin
git branch -a
```

---

## 3. Steps to sync `main` and `dev`

1. Fetch latest remote refs:
```bash
git fetch origin
```

2. Update `dev` with latest `dev` and `main`:
```bash
git checkout dev
git pull origin dev        # update dev
git pull origin main       # bring main changes into dev
```
- Resolve any conflicts, then:
```bash
git add .
git commit -m "Merge main into dev to align branches"   # only if merge created a commit
```

3. Update `main` from `dev`:
```bash
git checkout main
git pull origin main       # ensure main is up to date
git merge dev              # merge dev into main
```
- If merge creates a commit (or after resolving conflicts):
```bash
git add .
git commit -m "Merge dev into main to align branches"   # only if required
```

4. Push both branches:
```bash
git push origin dev
git push origin main
```

---

## 4. Verify alignment

View the commit graph:
```bash
git log --oneline --graph --decorate --all
```
You should see both branches pointing to the same commit, e.g.:
```
* abc1234 (HEAD -> main, origin/main, origin/dev, dev) Merge dev into main
```

---

## 5. Best practices

| Situation               | Action                                |
|------------------------:|---------------------------------------|
| Starting a feature      | Create `feature/branch-name` off `dev` |
| Completing a feature    | Merge `feature` → `dev`               |
| Preparing for release   | Merge `dev` → `main`                  |
| After release           | Merge `main` → `dev` to resync        |

Quick tips:
- Always `git pull` before merging.  
- Use VS Code Source Control to visualize merges.  
- Keep commit messages meaningful.  
- Run `npm run dev` after merging to verify the app builds.

---

## 6. Summary

Following these steps keeps `main` and `dev` synchronized, reduces conflicts, and helps new developers onboard without breaking history.