import admin from '../config/firebaseAdmin.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Verify Firebase ID Token
      const decodedToken = await admin.auth().verifyIdToken(token);
      const { uid, email, name, picture } = decodedToken;

      // Find or create user in MongoDB
      let user = await User.findOne({ email });

      if (!user) {
        // First time login - Sync with MongoDB
        user = await User.create({
          name: name || email.split('@')[0],
          email: email,
          password: 'FIREBASE_AUTH_USER', // Placeholder since password is not used
          role: 'user'
        });
      }

      user.firebaseUid = uid;
      req.user = user;
      next();
    } catch (error) {
      console.error('Firebase token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const adminCheck = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};
