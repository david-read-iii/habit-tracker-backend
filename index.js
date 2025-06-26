const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // lets you parse JSON requests

app.get('/', (req, res) => {
  res.send('Hello from Node + Express!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});