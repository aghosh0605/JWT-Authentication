require('dotenv').config();
const express = require('express');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const connect = require('./config/database');
const app = express();
const auth = require('./middleware/auth');
port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Healthcheck Ok' });
});

//Welcome
app.post('/welcome', auth, (req, res) => {
  res.status(200).send(req.user);
});
//Login
app.use('/login', loginRouter);
//Login
app.use('/register', registerRouter);

app.listen(port, () => {
  connect.mongoConnect();
  console.log(`Webserver listening on port ${port}`);
});
