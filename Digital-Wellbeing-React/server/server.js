import express from 'express';
import crypto from 'node:crypto';
import { promisify } from 'node:util';
import { readUsers, writeUsers, findUserByEmail, readItems, writeItems } from './data.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const scrypt = promisify(crypto.scrypt);
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'change-this-secret-before-public-deployment';

app.use(express.json({ limit: '20kb' }));
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

function publicUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    birthday: user.birthday,
    dailyGoal: user.dailyGoal,
    createdAt: user.createdAt
  };
}

async function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const derivedKey = await scrypt(password, salt, 64);
  return { salt, hash: derivedKey.toString('hex') };
}

async function verifyPassword(password, salt, expectedHash) {
  const derivedKey = await scrypt(password, salt, 64);
  const expected = Buffer.from(expectedHash, 'hex');
  return expected.length === derivedKey.length && crypto.timingSafeEqual(expected, derivedKey);
}

function createToken(user) {
  const payload = Buffer.from(JSON.stringify({
    sub: user.id,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000
  })).toString('base64url');
  const signature = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return res.status(401).json({ message: 'Please log in.' });

  const expected = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest();
  let supplied;
  try {
    supplied = Buffer.from(signature, 'base64url');
  } catch {
    return res.status(401).json({ message: 'Invalid session.' });
  }
  if (supplied.length !== expected.length || !crypto.timingSafeEqual(supplied, expected)) {
    return res.status(401).json({ message: 'Invalid session.' });
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!decoded.sub || decoded.exp < Date.now()) return res.status(401).json({ message: 'Session expired. Please log in again.' });
    req.userId = decoded.sub;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid session.' });
  }
}

app.get('/api/hello', (req, res) => res.json({ message: 'Hello' }));
app.get('/api/status', (req, res) => res.json({ status: 'ok' }));

app.get('/api/items', async (req, res, next) => {
  try {
    const items = await readItems();
    const search = String(req.query.search || '').trim().toLowerCase();
    res.json(search ? items.filter(item => item.name.toLowerCase().includes(search)) : items);
  } catch (error) {
    next(error);
  }
});

app.get('/api/items/:id', async (req, res, next) => {
  try {
    const items = await readItems();
    const item = items.find(entry => entry.id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found.' });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

app.post('/api/items', async (req, res, next) => {
  try {
    const name = String(req.body?.name || '').trim();
    if (!name) return res.status(400).json({ message: 'Item name is required.' });
    const items = await readItems();
    const item = { id: crypto.randomUUID(), name, createdAt: new Date().toISOString() };
    items.push(item);
    await writeItems(items);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/items/:id', async (req, res, next) => {
  try {
    const items = await readItems();
    const filteredItems = items.filter(item => item.id !== req.params.id);
    if (filteredItems.length === items.length) return res.status(404).json({ message: 'Item not found.' });
    await writeItems(filteredItems);
    res.json({ message: 'Item deleted.' });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { fullName, email, password, birthday = '', dailyGoal = '' } = req.body || {};
    if (!fullName?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Enter a valid email address.' });
    }
    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least 8 characters, uppercase and lowercase letters, and a number.' });
    }
    if (await findUserByEmail(normalizedEmail)) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }
    const passwordData = await hashPassword(password);
    const user = {
      id: crypto.randomUUID(),
      fullName: fullName.trim(),
      email: normalizedEmail,
      birthday,
      dailyGoal,
      passwordSalt: passwordData.salt,
      passwordHash: passwordData.hash,
      createdAt: new Date().toISOString()
    };
    const users = await readUsers();
    users.push(user);
    await writeUsers(users);
    res.status(201).json({ message: 'Registration successful.', token: createToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });
    const user = await findUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.passwordSalt, user.passwordHash))) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }
    res.json({ message: 'Login successful.', token: createToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.get('/api/auth/me', authenticate, async (req, res, next) => {
  try {
    const users = await readUsers();
    const user = users.find(item => item.id === req.userId);
    if (!user) return res.status(401).json({ message: 'Account not found.' });
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.get('/api/items', (req, res) => {
  res.json([{ id: 1, name: 'Digital well-being tips' }, { id: 2, name: 'Healthy screen-time habits' }]);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error.' });
});

app.listen(PORT, () => console.log(`Digital Well-being API running at http://localhost:${PORT}`));
