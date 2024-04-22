const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./routes/router');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors()); 
app.use(session({
  secret: 'your very secret key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in a secure environment
}));

// Use LDAP routes
app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
