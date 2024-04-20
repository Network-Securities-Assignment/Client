const express = require('express');
const passport = require('passport');

const app = express();

// Middleware cho xác thực
app.use(passport.initialize());
app.use(passport.session());

// Route cho trang đăng nhập
app.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login',
  failureFlash: true
}));

// Route cho trang quản trị
app.get('/admin', (req, res) => {
  // Kiểm tra xác thực
  if (req.isAuthenticated()) {
    res.send('Admin page');
  } else {
    res.redirect('/login');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
