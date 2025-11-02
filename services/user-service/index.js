const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// Healthcheck endpoint for Jenkins verification
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service' });
});

app.get('/users', (req, res) => res.json(users));

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/users', (req, res) => {
  const id = users.length + 1;
  const newUser = { id, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`✅ User Service running on port ${port}`);
});
