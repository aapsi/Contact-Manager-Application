const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please provide all fields");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt round
    const user = new User({
        username,
        email,
        password: hashedPassword // Fixed the key
    });
    console.log(user);
    await user.save();
    res.status(201).json(user);
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide all fields");
    }
    const user = await User.findOne({ email });
    // compare password
    if (user && await bcrypt.compare(password, user.password)) {
       const accessToken = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            id: user._id
        },
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1m'
       });
       res.status(200).json({ accessToken}); 
       console.log(accessToken);
    }
    else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
});

// @desc Get current user
// @route GET /api/users/current
// @access Private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({
        message: "User fetched successfully"
    });
});

module.exports = { registerUser, loginUser, getCurrentUser };