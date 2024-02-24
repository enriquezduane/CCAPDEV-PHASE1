const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/userModel');

const initializePassport = (passport) => {
    const authenticateUser = async (username, password, done) => {
        console.log('\nAuthenticating user:', username);
        
        try {
            const user = await User.findOne({ username: username });
            console.log('\nUser found:', user ? user.username : 'Not found');
            
            if (!user) {
                console.log('\nNo user found with username:', username);
                return done(null, false, { message: 'No user with that username' });
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (passwordMatch) {
                console.log('\nUser authenticated successfully');
                return done(null, user);
            } else {
                console.log('\nIncorrect password for user:', username);
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
            return done(error);
        }
    };
    

    passport.use(new LocalStrategy(authenticateUser));

    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

module.exports = initializePassport;