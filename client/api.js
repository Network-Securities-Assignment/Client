const express = require('express');
const app = express();
var cors = require('cors')
const LDAP = require('./ldapfunction');

// Khởi tạo một đối tượng LDAP
const ldapClient = new LDAP('ldap://localhost:389');

// Middleware để xử lý JSON
app.use(express.json());

app.use(cors())

// Route để xác thực người dùng với LDAP
app.post('/authenticate', (req, res) => {
  const { username, password } = req.body;

  // Gọi phương thức authenticateDN từ đối tượng ldapClient
  ldapClient.authenticateDN(username, password, (err) => {
    if (err) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(200).json({ message: 'Authentication successful' });
    }
  });
});

// Route để tìm kiếm tất cả người dùng trong LDAP
app.get('/searchAllUsers', (req, res) => {
  // Gọi phương thức searchUser từ đối tượng ldapClient
  ldapClient.searchAllUsers((err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error searching all users' });
    } else {
      res.status(200).json({ users: result });
    }
  });
});

// Route để tìm kiếm tất cả group trong LDAP
app.get('/searchAllGroups', (req, res) => {
  // Gọi phương thức searchUser từ đối tượng ldapClient
  ldapClient.searchAllGroups((err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error searching all groups' });
    } else {
      res.status(200).json({ groups: result });
    }
  });
});


// // Route để tìm kiếm 1 người dùng trong LDAP
// app.get('/searchUser/:uid', (req, res) => {
//   const { uid} = req.params;
//   console.log(uid)
//   // Gọi phương thức searchUser từ đối tượng ldapClient
//   ldapClient.searchUser(uid, (err, result) => {
//     if (err) {
//       res.status(500).json({ error: 'Error searching user' });
//     } else {
//       res.status(200).json({ users: result });
//     }
//   });
// });

// Route để tạo người dùng trong LDAP
app.post('/createUser', (req, res) => {
  const {uidNumber, sn, givenName, gidNumber, mail, username, password} = req.body;
  console.log(uidNumber, sn, givenName, gidNumber, mail, username, password)
  // Gọi phương thức createUser từ đối tượng ldapClient
  ldapClient.createUser(uidNumber, sn, givenName, gidNumber, mail, username, password, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error creating user' });
    } else {
      res.status(200).json({ message: 'User created successfully' });
    }
  });
});

app.post('/createGroup', (req, res) => {
  const {groupname, gid} = req.body;
  ldapClient.createGroup(groupname, gid, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error creating group' });
    } else {
      res.status(200).json({ message: 'Group created successfully' });
    }
  });
});

// Route để xóa người dùng trong LDAP
app.delete('/deleteUser/:username', (req, res) => {
  const { username } = req.params;

  // Gọi phương thức deleteUser từ đối tượng ldapClient
  ldapClient.deleteUser(username, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting user' });
    } else {
      res.status(200).json({ message: 'User deleted successfully' });
    }
  });
});

app.post('/removeAllUserFromGroups', (req, res) => {
  const userDN = `cn=tuanba,ou=users,dc=netsecurityass,dc=com`
  ldapClient.removeAllUserFromGroups(userDN, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting user' });
    } else {
      res.status(200).json({ message: 'User deleted successfully' });
    }
  })
})

// Route để xóa người dùng trong LDAP
app.delete('/deleteGroup/:groupname', (req, res) => {
  const { groupname } = req.params;

  // Gọi phương thức deleteUser từ đối tượng ldapClient
  ldapClient.deleteGroup(groupname, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting group' });
    } else {
      res.status(200).json({ message: 'Group deleted successfully' });
    }
  });
});


// Route để thêm người dùng vào nhóm trong LDAP
app.post('/addUserToGroup', (req, res) => {
  const { username, groupname } = req.body;

  // Gọi phương thức addUserToGroup từ đối tượng ldapClient
  ldapClient.addUserToGroup(username, groupname, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error adding user to group' });
    } else {
      res.status(200).json({ message: 'User added to group successfully' });
    }
  });
});


app.get('/searchUser/:username', (req, res) => {
  const { username } = req.params;
  
  ldapClient.searchUser(username, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error getting user' });
    } else {
      res.status(200).json({user: result});
    }
  });
});

app.get('/searchGroup/:groupName', (req, res) => {
  const { groupName } = req.params;
  
  ldapClient.searchGroup(groupName, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error getting user' });
    } else {
      res.status(200).json({group: result});
    }
  });
});

// Route để thêm nhieu` người dùng vào nhóm trong LDAP
app.post('/addManyUserToGroup', (req, res) => {
  const { userList, groupName } = req.body;
  console.log(userList, groupName)

  // Gọi phương thức addUserToGroup từ đối tượng ldapClient
  ldapClient.addManyUserToGroup(userList, groupName, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error adding user to group' });
    } else {
      res.status(200).json({ message: 'User added to group successfully' });
    }
  });
});

// Route để xóa người dùng khỏi nhóm trong LDAP
app.delete('/removeUserFromGroup', (req, res) => {
  const { userCN, groupName } = req.body;
  console.log(userCN, groupName)
  // Gọi phương thức deleteUserFromGroup từ đối tượng ldapClient
  ldapClient.removeUserFromGroup(userCN, groupName, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting user from group' });
    } else {
      res.status(200).json({ message: 'User deleted from group successfully' });
    }
  });
});


app.put('/updateUser/:username', (req,res) => {
  const {username} = req.params
  const {userData} = req.body
  console.log(userData)
  
  ldapClient.updateUser(username, userData, (err) => {
    if (err) res.status(500).json({ error: 'Error updating user' });
    else 
      res.status(200).json({ message: 'User updated successfully' });
  })
})


// // Route để cập nhật thuộc tính của người dùng trong LDAP
// app.put('/updateUser/:username', (req, res) => {
//   const { username } = req.params;
//   const { newname, newpassword} = req.body;
//   // Gọi phương thức updateUser từ đối tượng ldapClient
//   ldapClient.updateUser(username, newname, newpassword,(err) => {
//     if (err) {
//       res.status(500).json({ error: 'Error updating user' });
//     } else {
//       res.status(200).json({ message: 'User updated successfully' });
//     }
//   });
// });

// Route để so sánh người dùng trong LDAP
app.get('/compareUser/:username', (req, res) => {
  const { dn } = req.params;

  // Gọi phương thức compare từ đối tượng ldapClient
  ldapClient.compare(username, (err, matched) => {
    if (err) {
      res.status(500).json({ error: 'Error comparing user' });
    } else {
      res.status(200).json({ matched });
    }
  });
});

// Route để thay đổi DN của người dùng trong LDAP
app.put('/modifyDN/:username', (req, res) => {
  const { username } = req.params;

  // Gọi phương thức modifyDN từ đối tượng ldapClient
  ldapClient.modifyDN(username, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error modifying user DN' });
    } else {
      res.status(200).json({ message: 'User DN modified successfully' });
    }
  });
});


// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
