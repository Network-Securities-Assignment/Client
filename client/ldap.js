const ldap = require('ldapjs');

// Thiết lập kết nối tới máy chủ LDAP
const client = ldap.createClient({
  url: 'ldap://localhost:389'
});

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
  
  // Hàm xóa người dùng từ LDAP
  function deleteUser(username, callback) {
    const dn = `cn=${username},ou=users,dc=example,dc=com`;
  
    client.del(dn, (err) => {
      if (err) {
        console.error('Error deleting user:', err);
        return callback(err);
      } else {
        console.log('User deleted successfully');
        return callback(null);
      }
    });
  }
  
  // Hàm tìm kiếm người dùng trong LDAP
  function searchUser(username, callback) {
    const opts = {
      filter: `(cn=${username})`,
      scope: 'sub'
    };
  
    client.search('ou=users,dc=netsecurityass,dc=com', opts, (err, res) => {
      if (err) {
        console.error('Error searching for user:', err);
        return callback(err, null);
      }
  
      res.on('searchEntry', (entry) => {
        console.log('User found:', JSON.stringify(entry.pojo));
        return callback(null, entry.object);
      });
  
      res.on('searchReference', (referral) => {
        console.log('Referral:', referral.uris.join());
      });
  
      res.on('error', (err) => {
        console.error('Search error:', err);
        return callback(err, null);
      });
  
      res.on('end', () => {
        console.log('Search finished');
      });
    });
  }
  



// Xác thực với máy chủ LDAP
client.bind('cn=admin,dc=netsecurityass,dc=com', '1234', (err) => {
  if (err) {
    console.error('LDAP bind failed:', err);
  } else {
    console.log('LDAP bind successful');
    // Tiến hành các thao tác khác với LDAP ở đây
  }
});


  // Sử dụng các hàm trên
  // createUser('user1', 'password123', (err) => {
  //   if (!err) {
  //     // Gọi các hàm tương tác LDAP khác tại đây (vd: deleteUser, searchUser)
  //     console.log('User created successfully');
  //   } else {
  //     console.error('Error creating user:', err);
  //   }
  // });


  searchUser('user2', (err, user) => {
    if (!err) {
      console.log('User found:', user);
    } else {
      console.error('Error searching for user:', err);
    }
  })
