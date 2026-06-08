import express from 'express';
import cors from 'cors';
import JSONDatabase from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database in the server/db folder
const db = new JSONDatabase(path.join(__dirname, 'db', 'bookings.json'));

app.use(cors());
app.use(express.json());

// Administrative password configurations
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'lambo2026';
const ADMIN_TOKEN = 'lambo-admin-token-secure-2026';

// Middleware to verify admin token
function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header required' });
  }

  const token = authHeader.split(' ')[1];
  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Invalid security credentials' });
  }

  next();
}

// 1. Authenticate Admin
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_TOKEN });
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});

// 2. Add Booking (Public Endpoint)
app.post('/api/bookings', async (req, res) => {
  const { name, email, model, tag } = req.body;
  
  if (!name || !email || !model) {
    return res.status(400).json({ error: 'Name, email, and car model are required.' });
  }

  try {
    const booking = await db.insert({ name, email, model, tag });
    return res.status(201).json(booking);
  } catch (e) {
    console.error("Booking error:", e);
    return res.status(500).json({ error: 'Failed to record booking.' });
  }
});

// 3. Get All Bookings (Admin Protected)
app.get('/api/bookings', requireAuth, async (req, res) => {
  try {
    const bookings = await db.getAll();
    // Sort bookings to show the newest ones first
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.json(bookings);
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
});

// 4. Update Booking Status (Admin Protected)
app.put('/api/bookings/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const updated = await db.update(id, { status });
    if (!updated) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    return res.json(updated);
  } catch (e) {
    return res.status(500).json({ error: 'Failed to update booking.' });
  }
});

// 5. Delete Booking (Admin Protected)
app.delete('/api/bookings/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const success = await db.delete(id);
    if (!success) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    return res.json({ message: 'Booking deleted successfully' });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to delete booking.' });
  }
});

app.listen(PORT, () => {
  console.log(`Lamborghini API running on http://localhost:${PORT}`);
});
