const express = require('express');
const cors = require('cors');
const app = express();
const LDAP = require('./ldapfunction');

// Khởi tạo một đối tượng LDAP
const ldapClient = new LDAP('ldap://localhost:389');

// Middleware để xử lý JSON
app.use(express.json());
app.use(cors()); 

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

// Route để tìm kiếm người dùng trong LDAP
app.get('/searchUser', (req, res) => {
  // Gọi phương thức searchUser từ đối tượng ldapClient
  ldapClient.searchUsers((err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error searching user' });
    } else {
      res.status(200).json({ users: result });
    }
  });
});

// Route để tạo người dùng trong LDAP
app.post('/createUser', (req, res) => {
  const { username, password, email ,uid} = req.body;

  // Gọi phương thức createUser từ đối tượng ldapClient
  ldapClient.createUser(username, password, email, uid, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error creating user' });
    } else {
      res.status(200).json({ message: 'User created successfully' });
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

// Route để thêm người dùng vào nhóm trong LDAP
app.post('/addUserToGroup/:groupname', (req, res) => {
  const { groupname } = req.params;

  // Gọi phương thức addUserToGroup từ đối tượng ldapClient
  ldapClient.addUserToGroup(groupname, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error adding user to group' });
    } else {
      res.status(200).json({ message: 'User added to group successfully' });
    }
  });
});

// Route để xóa người dùng khỏi nhóm trong LDAP
app.delete('/deleteUserFromGroup/:groupname', (req, res) => {
  const { groupname } = req.params;

  // Gọi phương thức deleteUserFromGroup từ đối tượng ldapClient
  ldapClient.deleteUserFromGroup(groupname, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting user from group' });
    } else {
      res.status(200).json({ message: 'User deleted from group successfully' });
    }
  });
});

// Route để cập nhật thuộc tính của người dùng trong LDAP
app.put('/updateUser/:username', (req, res) => {
  const { username } = req.params;

  // Gọi phương thức updateUser từ đối tượng ldapClient
  ldapClient.updateUser(username, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error updating user' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  });
});

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
