const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { populateUser, handleValidationError } = require('./helper');

const renderUpdateProfile = (req, res) => {
  try {
    // Render the edit profile page
    if (!req.isAuthenticated() || req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Forbidden Access' });
    }

    res.render('updateProfile', { 
      loggedIn: req.isAuthenticated(), 
      title: 'Update Profile', 
      userId: req.params.id, 
      forumRules: res.forumRules, 
      userLoggedIn: req.user
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: err.message });
  }
}

const renderUser = (req, res) => {
  try {
    // Render the users page
    res.render('user', { loggedIn: req.isAuthenticated(), title: res.user.username, user: res.user, forumRules: res.forumRules, userLoggedIn: req.user });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: err.message });
  }
}

const getUserByUrl = async (req, res, next) => {
  try {
      const user = await User.findById(req.params.id);  

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      } else {
          res.user = await populateUser(user);
      }
  }
  catch (err) {
      console.log('Error fetching user:', err.message)
      res.status(500).json({ message: err.message });
  }
  next();
}

const createUser = async (req, res) => {
  try {
    // Get the username and password from the request body
    const { registerUsername, registerEmail, registerPassword } = req.body;

    if (registerPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters!'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerPassword, salt);

    const user = new User({ 
        _id: new mongoose.Types.ObjectId(),
        username: registerUsername, 
        password: hashedPassword,
        email: registerEmail,
        role: 'Novice Adventurer',
        createdAt: Date.now(),
        updatedAt: Date.now()
    });
    
    await user.save();

    req.login(user, (err) => {
      if (err) {
          return res.status(500).json({ message: 'Login failed after registration' });
      }
      return res.status(200).json({ message: 'User registered and logged in successfully' });
    });

  } catch (err) {
    console.error('Error creating user:', err);
    const { status, message } = handleValidationError(err);
    return res.status(status).json({ message });
  }
}

const updateUser = async (req, res) => {
  try {
    const { userId, email, age, description, newPassword } = req.body;

    if (!req.isAuthenticated() || req.user.id !== userId) {
      return res.status(403).json({ message: 'User not logged in!' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email) {
      user.email = email;
    }

    if (age) {
      user.age = age;
    }

    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters!'});
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
    }

    if (description) {
      user.description = description;
    }

    user.updatedAt = Date.now();

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  }
  catch (err) {
    console.error('Error:', err);
    const { status, message } = handleValidationError(err);
    return res.status(status).json({ message });
  }
}

module.exports = {
  renderUpdateProfile,
  renderUser,
  getUserByUrl,
  createUser,
  updateUser,
}
