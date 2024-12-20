import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `http://localhost:3000/login`,
    session: true 
  }),
  (request, response) => {
    response.send(`
      <html>
        <script>
          window.location.href = 'http://localhost:3000/mytrip';
        </script>
      </html>
    `);
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
    }
    res.redirect('/');
  });
});

export default router;
