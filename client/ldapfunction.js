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

  searchUser(username,callback) {
    const opts = {
      filter: '(objectClass=inetOrgPerson)',
      scope: 'sub',
      attributes: ['sn']
    };
    const dn = `cn=${username},ou=users,dc=netsecurityass,dc=com`;

    this.client.search(dn, opts, (err, res) => {
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

  searchAllUsers(callback) {
    const opts = {
      filter: '(objectClass=inetOrgPerson)',
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

  createUser(username, password, email, id, callback) {
    const dn = `cn=${username},ou=users,dc=netsecurityass,dc=com`; // Định danh cho người dùng mới
    const entry = {
      cn: username,
      sn: 'example',
      uid: id,
      mail: email,
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

  addUserToGroup(username ,groupname, callback) {
    const dn = `cn=${groupname},ou=groups,dc=netsecurityass,dc=com`;
    const newUser = new ldap.Attribute({
      type: 'memberUid',
      values: `cn=${username}, ou=users, dc=netsecurityass, dc=com`
    });
    const change = new ldap.Change({
      operation: 'add',
      modification: newUser
    });
    

    this.client.modify(dn, change, (err) => {
      if (err) {
        console.error('Error adding user to group:', err);
        callback(err);
      } else {
        console.log('User added to group successfully');
        callback(null);
      }
    });
  }

  deleteUserFromGroup(username, groupname, callback) {
    const dn = `cn=${groupname},ou=groups,dc=netsecurityass,dc=com`;
    const deluser = new ldap.Attribute({
      type: 'memberUid',
      values: `cn=${username}, ou=users, dc=netsecurityass, dc=com`
    });
    const change = new ldap.Change({
      operation: 'delete',
      modification: deluser
    });

    this.client.modify(dn, change, (err) => {
      if (err) {
        console.error('Error deleting user from group:', err);
        callback(err);
      } else {
        console.log('User deleted from group successfully');
        callback(null);
      }
    });
  }

  updateUser(username, newname, password, callback) {
    // const change = new ldap.Change({
    //   // operation: 'add',  //use add to add new attribute
    //   operation: 'replace', // use replace to update the existing attribute
    //   modification: {
    //     sn: '1263',
    //     // 'displayName': 'test123'
    //   }
    // });
    // const newAtt = new ldap.Attribute({
    //   type: 'sn',
    //   values: '1263'
    // });
    // const change = new ldap.Change({
    //   operation: 'replace',
    //   modification: newAtt
    // });

    const changes = [];

    // Thêm các thuộc tính mới vào danh sách thay đổi
    // const newSn = new ldap.Attribute({
    //   type: 'cn',
    //   values: newname
    // });
    // changes.push({
    //   operation: 'replace',
    //   modification: newSn
    // });
  
    const newUserPassword = new ldap.Attribute({
      type: 'userPassword',
      values: password
    });
    changes.push({
      operation: 'replace',
      modification: newUserPassword
    });

    const dn = `cn=${username},ou=users,dc=netsecurityass,dc=com`;

    this.client.modify(dn, changes, (err) => {
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
  createObject(objectname, objecttype, callback) {
    // objecttype = role, group
    const dn = `cn=${objectname},ou=${objecttype},dc=netsecurityass,dc=com`; // Định danh cho người dùng mới
    const entry = {
      cn: objectname,
      structuralObjectClass: 'posixGroup',
    };
    // if (objecttype === 'group') {
    //   entry.objectClass = 'posixGroup';
    // }
    // else if (objecttype === 'role') {
    //   entry.objectClass = 'organizationalRole';
    // }
    this.client.add(dn, entry, (err) => {
      if (err) {
        console.error(`Error creating ${objecttype}:`, err);
        return callback(err);
      } else {
        console.log(`${objecttype} created successfully`);
        return callback(null);
      }
    });
  }

  deleteObject(objectname, objecttype, callback) {
    // objecttype = role, group
    const dn = `cn=${objectname},ou=${objecttype},dc=netsecurityass,dc=com`; // Định danh cho người dùng mới
    this.client.del(dn, (err) => {
      if (err) {
        console.error(`Error deleting ${objecttype}:`, err);
        return callback(err);
      } else {
        console.log(`${objecttype} deleting successfully`);
        return callback(null);
      }
    });
  }

  createRole(rolename, callback) {
    this.createObject(rolename, 'role', callback);
  }

  // createGroup(groupname, callback) {
  //   this.createObject(groupname, 'group', callback);
  // }

  createGroup(groupname, gid, callback) {
    const dn = `cn=${groupname},ou=groups,dc=netsecurityass,dc=com`; // Định danh cho người dùng mới
    const entry = {
      cn: groupname,
      gidNumber: gid,
      objectClass: 'posixGroup',
    };
    this.client.add(dn, entry, (err) => {
      if (err) {
        console.error('Error creating group:', err);
        return callback(err);
      } else {
        console.log('Group created successfully');
        return callback(null);
      }
    });
  }

  deleteRole(rolename, callback) {
    this.deleteObject(rolename, 'role', callback);
  }

  deleteGroup(groupname, callback) {
    this.deleteObject(groupname, 'group', callback);
  }
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

// ldapClients.createGroup('Test_1', 800, (err) => {
//   if (err) {
//     console.log('Error creating group');
//   } else {
//     console.log('Group created successfully');
//   }
// });

// console.log(ldapClients.searchUsers());


// ldapClients.addUserToGroup('hr', (err) => {
//   if (err) {
//     console.log('Error adding user to group');
//   } else {
//     console.log('User added to group successfully');
//   }
// });

// ldapClients.createRole('Test 1', (err) => {
//   if (err) {
//     console.log('Error creating role');
//   } else {
//     console.log('Role created successfully');
//   }
// });

// ldapClients.deleteRole('Test Power', (err) => {
//   if (err) {
//     console.log('Error dl role');
//   } else {
//     console.log('Role dl successfully');
//   }
// });

