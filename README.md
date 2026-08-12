# Sumathi Universal

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
