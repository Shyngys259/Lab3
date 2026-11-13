# Digital Well-being — React + Node.js Authentication

## Requirements
- Node.js 18 or newer
- npm

## 1. Install frontend dependencies
Open a terminal in `Digital-Wellbeing-React`:

```bash
npm install
```

## 2. Install backend dependencies
Open a second terminal:

```bash
cd server
npm install
```

## 3. Start the backend
From the `server` folder:

```bash
npm run dev
```

The API runs at `http://localhost:3000`.
You can check it at `http://localhost:3000/api/status`.

## 4. Start the React frontend
In the first terminal, from `Digital-Wellbeing-React`:

```bash
npm run dev
```

Open the Vite URL printed in the terminal (usually `http://localhost:5173`).

## Authentication features
- Register with full name, email and password.
- Validate email and password; confirm password must match.
- Prevent duplicate email registration.
- Hash passwords with Node.js `scrypt`; plain passwords are never stored.
- Log in with the registered email and password.
- Keep a signed login token for up to 7 days.
- Restore the logged-in user after refreshing the page.
- Log out from the navigation bar.
- User records are stored in `server/users.json`; Lab 5 practice items are stored in `server/items.json`.

## API endpoints
- `GET /api/status` — backend status.
- `POST /api/auth/register` — create an account.
- `POST /api/auth/login` — verify credentials.
- `GET /api/auth/me` — return the current user (Bearer token required).
- `GET /api/hello` — hello response.
- `GET /api/items` and `GET /api/items/:id` — read items (optional `?search=` filter).
- `POST /api/items` — validate and add an item.
- `DELETE /api/items/:id` — delete an item.

## Notes
For a public deployment, set a strong `TOKEN_SECRET` environment variable. The JSON file database is suitable for this local lab project; use a managed database for production.
