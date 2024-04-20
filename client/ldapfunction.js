const ldap = require('ldapjs');

class LDAP {

  constructor(url) {
    this.client = ldap.createClient({ url });
  }

  authenticateDN(username, password, callback) {
    this.client.bind(username, password, (err) => {
      if (err) {
        console.log("Error in new connection " + err);
        callback(err);
      } else {
        console.log("Authenticate successfully!");
        callback(null);
      }
    });
  }

  searchUsers(callback) {
    const opts = {
      filter: '(objectClass=*)',
      scope: 'sub',
      attributes: ['sn']
    };

    this.client.search('ou=users,dc=netsecurityass,dc=com', opts, (err, res) => {
      if (err) {
        console.log("Error in search " + err);
        callback(err, null);
      } else {
        const users = [];
        res.on('searchEntry', (entry) => {
          console.log("Search successfully!");
          users.push(entry.pojo);
        });
        res.on('searchReference', (referral) => {
          console.log('Referral: ' + referral.uris.join());
        });
        res.on('error', (err) => {
          console.error('Error: ' + err.message);
          callback(err, null);
        });
        res.on('end', (result) => {
          console.log('Status: ' + result.status);
          callback(null, users);
        });
      }
    });
  }

  createUser(username, uid, password, email, callback) {
    const dn = `cn=${username},ou=users,dc=netsecurityass,dc=com`; // Định danh cho người dùng mới
    const entry = {
      cn: email,
      uid: uid,
      mail: usermail,
      objectClass: 'inetOrgPerson',
      userPassword: password,
    };

    this.client.add(dn, entry, (err) => {
      if (err) {
        console.error('Error creating user:', err);
        return callback(err);
      } else {
        console.log('User created successfully');
        return callback(null);
      }
    });
  }

  deleteUser(username, callback) {
    this.client.del(`cn=${username},ou=users,dc=netsecurityass,dc=com`, (err) => {
      if (err) {
        console.error('Error deleting user:', err);
        callback(err);
      } else {
        console.log('User deleted successfully');
        callback(null);
      }
    });
  }

  addUserToGroup(groupname, callback) {
    const change = new ldap.Change({
      operation: 'add',
      modification: {
        uniqueMember: 'cn=jill,ou=users,ou=system'
      }
    });

    this.client.modify(groupname, change, (err) => {
      if (err) {
        console.error('Error adding user to group:', err);
        callback(err);
      } else {
        console.log('User added to group successfully');
        callback(null);
      }
    });
  }

  deleteUserFromGroup(groupname, callback) {
    const change = new ldap.Change({
      operation: 'delete',
      modification: {
        uniqueMember: 'cn=hiii,ou=users,ou=system'
      }
    });

    this.client.modify(groupname, change, (err) => {
      if (err) {
        console.error('Error deleting user from group:', err);
        callback(err);
      } else {
        console.log('User deleted from group successfully');
        callback(null);
      }
    });
  }

  updateUser(username, callback) {
    // const change = new ldap.Change({
    //   // operation: 'add',  //use add to add new attribute
    //   operation: 'replace', // use replace to update the existing attribute
    //   modification: {
    //     sn: '1263',
    //     // 'displayName': 'test123'
    //   }
    // });
    const change = new ldap.Change({
      operation: 'replace',
      modification: {
        type: 'sn',
        values: '1263'
      }
    });

    const dn = `cn=${username},ou=users,dc=netsecurityass,dc=com`;

    this.client.modify(dn, change, (err) => {
      if (err) {
        console.error('Error updating user:', err);
        callback(err);
      } else {
        console.log('User updated successfully');
        callback(null);
      }
    });
  }

  compare(dn, callback) {
    this.client.compare(dn, 'sn', '1263', (err, matched) => {
      if (err) {
        console.error('Error comparing user:', err);
        callback(err, null);
      } else {
        console.log('Comparison result:', matched);
        callback(null, matched);
      }
    });
  }

  modifyDN(username, callback) {
    const dn = `cn=${username},ou=users,dc=netsecurityass,dc=com`;
    this.client.modifyDN(dn, 'cn=ba4r', (err) => {
      if (err) {
        console.error('Error modifying user DN:', err);
        callback(err);
      } else {
        console.log('User DN modified successfully');
        callback(null);
      }
    });
  }

  // Thêm các phương thức khác tương tác với LDAP ở đây
}

module.exports = LDAP;

////// Test

// const ldapClients = new LDAP('ldap://localhost:389');
// ldapClients.authenticateDN('cn=admin,dc=netsecurityass,dc=com', '1234', (err) => {
//   if (err) {
//     console.log('Authentication failed');
//   } else {
//     console.log('Authentication successful');
//   }
// });

// console.log(ldapClients.searchUsers());