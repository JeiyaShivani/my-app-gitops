const express = require('express');

const app = express();
app.use(express.json());

const PORT = 5000;
const APP_NAME = 'UserAPI';

// In-memory user database
let users = [];
let nextId = 1; // counter for generating user IDs

// Root endpoint
app.get('/', (req, res) => {
    res.send(`${APP_NAME} is running!`);
});

// List all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Create a new user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const user = { id: nextId++, name, email };
    users.push(user);
    res.status(201).json(user);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// Update user by ID
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
});

// Delete user by ID
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    users = users.filter(u => u.id !== id);
    res.json({ message: 'User deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`${APP_NAME} listening on port ${PORT}`);
});

