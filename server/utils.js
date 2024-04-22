const ldap = require('ldapjs');

function findAllGroups(client, res, done) {
  const opts = {
    filter: '(objectClass=posixGroup)',  // Adjust filter as per LDAP schema
    scope: 'sub',                       // Search within the entire subtree
    attributes: ['cn', 'memberUid']     // Attributes to retrieve
  };

  client.search(process.env.LDAP_BIND_DN, opts, (err, searchRes) => {
    if (err) {
      console.error('Search failed:', err);
      done();  // Unbind client
      return res.status(500).send('LDAP search failed');
    }

    const groups = [];
    searchRes.on('searchEntry', entry => {
      groups.push(entry.object);
    });

    searchRes.on('end', () => {
      done();  // Unbind client
      res.json(groups);  // Send the results back in JSON format
    });

    searchRes.on('error', err => {
      console.error('Search error:', err);
      done();  // Unbind client
      res.status(500).send('LDAP search error');
    });
  });
}


module.exports = {
  findAllGroups
};