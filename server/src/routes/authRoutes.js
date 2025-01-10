import express from 'express';
import passport from 'passport';
import config from '../config/env.js';
const router = express.Router();

const vmIp = config.vmIP || 'localhost';

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `http://${vmIp}:3000/login`,
    session: true 
  }),
  (req, res) => {
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.redirect(`http://${vmIp}:3000/login`);
      }
      console.log('Session after Google auth:', req.session);
      console.log('User after Google auth:', req.user);
      
      res.send(`
        <html>
          <script>
            window.location.href = 'http://${vmIp}:3000/mytrip';
          </script>
        </html>
      `);
    });
  }
);

router.post('/logout', (req, res) => {
  req.logout(err => {
      if (err) {
          console.error('Error logging out:', err);
          return res.status(500).json({ success: false, message: 'Logout failed' });
      }
      req.session.destroy(sessionErr => {
          if (sessionErr) {
              console.error('Error destroying session:', sessionErr);
              return res.status(500).json({ success: false, message: 'Failed to destroy session' });
          }
          res.clearCookie('connect.sid');
          return res.status(200).json({ success: true, message: 'Logged out successfully' });
      });
  });
});

router.get('/api/user', (req, res) => {
  console.log('User request received');
  console.log('Session:', req.session);
  console.log('User in request:', req.user);
  
  if (!req.user) {
    console.log('No user found in request');
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  const { googleId, email, ...userData } = req.user;
  res.json(userData);
});

export default router;
