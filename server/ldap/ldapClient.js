const ldap = require('ldapjs');

const createLdapClient = () => {
  const client = ldap.createClient({
    url: process.env.LDAP_URL  // Using the LDAP_URL from the .env file
  });
  return client;
};

module.exports = {
  createLdapClient
};
