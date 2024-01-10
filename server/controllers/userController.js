// Need to import user model
const User = require('../models/user');

// More conveniently use async functions
const asyncHandler = require('express-async-handler');

// For generate unique ID
const uuid = require('uuid');

// For hashing user password
const bcrypt = require('bcrypt');
const saltRounds = 8;

// Default empty plan (Needed when creating a user account)
const defaultPlan = {
                        selected: [],
                        selectedCodes: [],
                        selectedCredits: 0,
                        creditLimit: 15,
                        timeslots: [[``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
                                    [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
                                    [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
                                    [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
                                    [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
                                    [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``]]
                    };

// For user to log in
exports.user_login = asyncHandler(async(req, res, next) => {
    
    // Not providing both email and password: give empty response and exit (Note: Better approach should be giving error code!)
    if (req.params.email.trim() == `` || req.body.password.trim() == ``) {
        res.json(``);
        return;
    }
    
    // Find the attempted user with email first
    const attemptedUser = await User.findOne({ email: req.params.email }).exec();

    if (!attemptedUser) {
        // No user with the email found, give empty response and exit (Note: Better approach should be giving error code!)
        res.json(``);
        return;
    }

    if (bcrypt.compareSync(req.body.password, attemptedUser.password)) {
        // Password also correct, return the valid user instance
        res.json(attemptedUser);

    } else {
        // Incorrect password, give empty response (Note: Better approach should be giving error code!)
        res.json(``);
    }
    
});

// For creating a new user account
exports.user_create = asyncHandler(async(req, res, next) => {
    
    // Check email address used or not
    const sameEmailUser = await User.findOne({ email: req.body.email }).exec();

    if (!sameEmailUser) {
        // Email not used, can proceed to create a new user instance
        const newUser = new User({
            id: uuid.v4(),
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, saltRounds),
            plan1: JSON.stringify(defaultPlan),
            plan2: JSON.stringify(defaultPlan),
            plan3: JSON.stringify(defaultPlan)
        });

        // Then, save the new user instance to DB, and return it (for client to behave correctly)
        await newUser.save();
        res.json(newUser);

    } else {
        // Email used already: Give empty string indicating email already used (Note: Better approach should be giving error code!)
        res.json(``);
    }
});

// For user to update a saved plan
exports.user_plan_update = asyncHandler(async(req, res, next) => {
    
    // Obtain details of the user
    const user = await User.findOne({ id: req.params.id }).exec();

    if (user) {
        // User found, update plan in DB (Ref: https://mongoosejs.com/docs/tutorials/findoneandupdate.html)
        const updatedUser = await User.findOneAndUpdate(
            { id: req.params.id },
            { [req.body.planToUpdate]: req.body.newPlan }, // Computed property names in ES6
            { new: true }
        );
        res.json(updatedUser);

    } else {
        // User not found: Give empty string (Note: Better approach should be giving error code!)
        res.json(``);
    }
});