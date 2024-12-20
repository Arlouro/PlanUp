import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { ObjectId } from 'mongodb';
import { getDB } from './config/db.js';
import config from './config/env.js';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  console.log('Deserializing ID:', id);
  try {
    const db = getDB();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    console.log('Deserialized user:', user);
    done(null, user);
  } catch (err) {
    console.error('Deserialize error:', err);
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: `${BASE_URL}/auth/google/callback`,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Google profile received:', profile.id);
      try {
        const db = getDB();
        const { id, displayName, emails, photos } = profile;

        let user = await db.collection('users').findOne({ googleId: id });

        if (!user) {
          const result = await db.collection('users').insertOne({
            googleId: id,
            name: displayName,
            email: emails?.[0]?.value,
            avatar: photos?.[0]?.value,
            createdAt: new Date(),
            trips: []
          });
          
          user = await db.collection('users').findOne({ _id: result.insertedId });
          console.log('New user created:', user);
        } else {
          console.log('Existing user found:', user);
        }

        done(null, user);
      } catch (err) {
        console.error('Google auth error:', err);
        done(err, null);
      }
    }
  )
);

export default passport;