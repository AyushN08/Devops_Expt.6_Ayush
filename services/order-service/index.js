const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

let orders = [
  { id: 1, userId: 1, item: 'Laptop', amount: 1200 },
  { id: 2, userId: 2, item: 'Phone', amount: 800 },
];

// Healthcheck endpoint for Jenkins verification
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'order-service' });
});

app.get('/orders', (req, res) => res.json(orders));

app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.post('/orders', (req, res) => {
  const id = orders.length + 1;
  const newOrder = { id, ...req.body };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.listen(port, () => {
  console.log(`✅ Order Service running on port ${port}`);
});
