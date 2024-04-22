// Assuming all imports and middleware are correctly defined
const express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { createLdapClient } = require('../ldap/ldapClient');
const { findAllGroups } = require('../utils') ;

const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const client = createLdapClient();

  client.bind(`cn=${username},${process.env.LDAP_BIND_DN}`, password, err => {
    if (err) {
      console.error('LDAP bind failed:', err);
      res.status(401).send('Authentication failed');
      client.unbind();
    } else {
      req.session.user = { username, password };  // Save the user in session
      res.send('Authentication successful');
      client.unbind();
    }
  });
});

// Route to fetch groups using session-stored credentials
router.get('/groups', isAuthenticated, (req, res) => {
  // if (!req.session.user || !req.session.user.username || !req.session.user.password) {
  //   return res.status(401).send('Authentication required');
  // }

  // const { username, password } = req.session.user;
  const { username, password } = req.body;

  const client = createLdapClient();

  client.bind(`uid=${username},${process.env.LDAP_BIND_DN}`, password, err => {
    if (err) {
      console.error('LDAP bind failed:', err);
      client.unbind();
      return res.status(500).send('LDAP bind failed');
    }
    console.log('Groups')
    // Call findAllGroups after successful bind using the credentials
    // findAllGroups(client, res, () => client.unbind());  // Ensure unbind after operation
  });
});

module.exports = router;