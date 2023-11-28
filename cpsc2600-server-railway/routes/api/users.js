const express = require('express');
const router = express.Router();
const uuid = require('uuid');

// const users = require('../../Users');
/* For reading and writing JSON file: https://blog.logrocket.com/reading-writing-json-files-node-js-complete-tutorial/
Done in this way so as to test server-side code with DB updates locally
Need require.resolve() for the path: https://stackoverflow.com/a/70909792 */
const { readFileSync, writeFileSync } = require("fs");
const users = JSON.parse(readFileSync(require.resolve('../../Users.json'), 'utf8'));

// For hashing user password
const bcrypt = require('bcrypt');
const saltRounds = 8;

/**
 * @route GET api/users
 * @desc Retrives all users (removed for infomation security!)
 **/
// router.get('/', (req, res) => res.json(users));

/**
 * @route POST api/users/:email
 * @desc A user to log in
 **/
router.post('/:email', (req, res) => {
    // Response with the user filtered with (1) correct email and (2) password correctly compared with the hashed password
    res.json(
        users.filter(
            user => user.email === req.params.email && bcrypt.compareSync(req.body.password, user.password)
        )
    );
});

/**
 * @route POST api/users/
 * @desc Create new user account
 **/
router.post('/', (req, res) => {
    
    // Check email address used or not
    const sameEmailUser = users.filter(user => user.email === req.body.email);

    if (sameEmailUser.length === 0) {
        /* Hash password
        https://blog.logrocket.com/password-hashing-node-js-bcrypt/
        https://dev.to/documatic/what-is-bcrypt-how-to-use-it-to-hash-passwords-5c0g */
        const hashedPW = bcrypt.hashSync(req.body.password, saltRounds);
        
        // Create a new user account object
        const newUser = {
            id: uuid.v4(),
            email: req.body.email,
            password: hashedPW,
            plan1: {
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
            },
            plan2: {
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
            },
            plan3: {
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
            }
        };

        // Push new user to users array, and give response
        users.push(newUser);
        writeFileSync(require.resolve('../../Users.json'), JSON.stringify(users, null, 2), 'utf8');
        res.json(`Account created!`);

    } else {
        // Give empty string indicating email already used (Note: Should use status code 400 and let client-side catch the Error object?)
        res.json(``);
    }

});

/**
 * @route PUT api/users/:id
 * @desc Update user's saved plan
 **/
router.put('/:id', (req, res) => {
    const newUsers = users.map(user => {
        if (user.id === req.params.id) {
            /* Computed property names in ES6:
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names */
            return { ...user, [req.body.planToUpdate]: req.body.newPlan };
        } else {
            return { ...user };
        }
    });
    writeFileSync(require.resolve('../../Users.json'), JSON.stringify(newUsers, null, 2), 'utf8');
    res.json(newUsers.filter(user => user.id === req.params.id));
});


module.exports = router;