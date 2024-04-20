var express = require('express');
var app = express();
var ldap = require('ldapjs');

app.listen(3000, function () {
    console.log("server started")
})

/*update the url according to your ldap address*/
const client = ldap.createClient({
    url: 'ldap://localhost:389'
  });

/*use this to create connection*/
function authenticateDN(username, password) {

    /*bind use for authentication*/
    client.bind(username, password, function (err) {
        if (err) {
            console.log("Error in new connetion " + err)
        } else {
            /*if connection is success then go for any operation*/
            console.log("Success");
            // searchUser();
            // addUser('roo', '1211');
            // deleteUser('user1');
            //addUserToGroup('cn=Administrators,ou=groups,ou=system');
            //deleteUserFromGroup('cn=Administrators,ou=groups,ou=system');
            // updateUser('cn=user2,ou=users,dc=netsecurityass,dc=com');
            //compare('cn=test,ou=users,ou=system');
            // modifyDN('cn=bar,ou=users,ou=system');

            // createUser('user2', 'password123', (err) => {
            //     if (!err) {
            //       // Gọi các hàm tương tác LDAP khác tại đây (vd: deleteUser, searchUser)
            //       console.log('User created successfully');
            //     } else {
            //       console.error('Error creating user:', err);
            //     }
            // });
        }
    });
}

/*use this to search user, add your condition inside filter*/
function searchUser() {
    var opts = {
        filter: '(objectClass=*)',  //simple search
        //  filter: '(&(uid=2)(sn=John))',// and search
        // filter: '(|(uid=2)(sn=John)(cn=Smith))', // or search
        // filter: '(&(sn=Pin))', // and search
        scope: 'sub',
        attributes: ['sn']
    };

    client.search('ou=users,dc=netsecurityass,dc=com', opts, function (err, res) {
        if (err) {
            console.log("Error in search " + err)
        } else {
            res.on('searchEntry', function (entry) {
                console.log('entry: ' + JSON.stringify(entry.pojo));
            });
            res.on('searchReference', function (referral) {
                console.log('referral: ' + referral.uris.join());
            });
            res.on('error', function (err) {
                console.error('error: ' + err.message);
            });
            res.on('end', function (result) {
                console.log('status: ' + result.status);
            });
        }
    });
}

/*use this to add user*/
function addUser(username, password) {
    // var entry = {
    //     sn: 'bar',
    //     email: ['foo@bar.com', 'foo1@bar.com'],
    //     objectclass: 'inetOrgPerson'
    // };
    const entry = {
        cn: username,
        sn: 'bar',
        uid: 'example',
        email: ['foo@bar.com', 'foo1@bar.com'],
        objectClass: 'inetOrgPerson',
        userPassword: password
      };
    
    client.add(`cn=${username},ou=users,dc=netsecurityass,dc=com`, entry, (err) => {
        if (err) {
            console.log("err in new user " + err);
        } else {
            console.log("added user")
        }
    });
}

// Hàm tạo người dùng mới trong LDAP
function createUser(username, password, callback) {
    const dn = `cn=${username},ou=users,dc=netsecurityass,dc=com`; // Định danh cho người dùng mới
    const entry = {
      cn: username,
      sn: 'pin2',
      uid: 'example',
      mail: 'example@example.org',
      objectClass: 'inetOrgPerson',
      userPassword: password,
    //   cardNumber: '123456789',
    //   pin: '1234'
    };
  
    client.add(dn, entry, (err) => {
      if (err) {
        console.error('Error creating user:', err);
        return callback(err);
      } else {
        console.log('User created successfully');
        return callback(null);
      }
    });
}

/*use this to delete user*/
function deleteUser(username) {
    client.del(`cn=${username},ou=users,dc=netsecurityass,dc=com`, function (err) {
        if (err) {
            console.log("err in delete new user " + err);
        } else {
            console.log("deleted user")
        }
    });
}

/*use this to add user to group*/
function addUserToGroup(groupname) {
    var change = new ldap.Change({
        operation: 'add',
        modification: {
            uniqueMember: 'cn=jill,ou=users,ou=system'
        }
    });

    client.modify(groupname, change, function (err) {
        if (err) {
            console.log("err in add user in a group " + err);
        } else {
            console.log("added user in a group")
        }
    });
}

/*use this to delete user from group*/
function deleteUserFromGroup(groupname) {
    var change = new ldap.Change({
        operation: 'delete',
        modification: {
            uniqueMember: 'cn=hiii,ou=users,ou=system'
        }
    });

    client.modify(groupname, change, function (err) {
        if (err) {
            console.log("err in delete  user in a group " + err);
        } else {
            console.log("deleted  user from a group")
        }
    });
}

/*use this to update user attributes*/
function updateUser(dn) {
    var change = new ldap.Change({
        // operation: 'add',  //use add to add new attribute
        operation: 'replace', // use replace to update the existing attribute
        modification: {
            'sn': '1263',
            // 'displayName': 'test123'
        }
    });

    client.modify(dn, change, function (err) {
        if (err) {
            console.log("err in update user " + err);
        } else {
            console.log("add update user");
        }
    });
}

/*use this to compare user is already existed or not*/
function compare(dn) {
    client.compare(dn, 'sn', '1263', function (err, matched) {
        if (err) {
            console.log("err in update user " + err);
        } else {
            console.log("result :" + matched);
        }
    });
}

/*use this to modify the dn of existing user*/
function modifyDN(dn) {

    client.modifyDN(dn, 'cn=ba4r', function (err) {
        if (err) {
            console.log("err in update user " + err);
        } else {
            console.log("result :");
        }
    });
}

/*create authentication*/
authenticateDN("cn=admin,dc=netsecurityass,dc=com", "1234")

searchUser();


// Export các hàm tương tác LDAP
// module.exports = {
//     authenticateDN,
//     searchUser,
//     addUser,
//     deleteUser,
//     addUserToGroup,
//     deleteUserFromGroup,
//     updateUser,
//     compare,
//     modifyDN
// };