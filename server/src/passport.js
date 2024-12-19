import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { getDB } from './config/db.js';
import config from './config/env.js';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = getDB();
    const user = await db.collection('users').findOne({ _id: id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = getDB();
        const { id, displayName, emails, photos } = profile;

        let user = await db.collection('users').findOne({ googleId: id });

        if (!user) {
          user = {
            googleId: id,
            name: displayName,
            email: emails && emails[0]?.value,
            avatar: photos && photos[0]?.value,
            createdAt: new Date(),
            trips: [],
          };

          const result = await db.collection('users').insertOne(user);
          user._id = result.insertedId;
        }

        done(null, user);
      } catch (err) {
        console.error('Error authenticating user:', err);
        done(err, null);
      }
    }
  )
);
