# Sumathi Universal Home Clone

React + Vite + TypeScript frontend with a small Express backend.

## Important install note

This package does **not** include `package-lock.json` files, so npm will download packages from the public npm registry.

If npm tries to download from an internal registry, run:

```bash
npm config set registry https://registry.npmjs.org/
```

## Run the full project

```bash
cd sumathi-home-clone-fixed
npm install
npm run install:all
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

## Run separately

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Windows cleanup if npm install fails

Close VS Code terminals and stop running Node processes, then run PowerShell as Administrator:

```powershell
cd D:\projects\sumathi-universal
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
npm config set registry https://registry.npmjs.org/
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .\frontend\node_modules, .\frontend\package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .\backend\node_modules, .\backend\package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm install
npm run install:all
npm run dev
```
