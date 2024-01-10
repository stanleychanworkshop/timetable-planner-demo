const express = require('express');
const router = express.Router();

// Need the controller (callback functions)
const user_controller = require('../../controllers/userController');

/**
 * @route GET api/users
 * @desc Retrives all users (removed for infomation security!)
 **/
// router.get('/', (req, res) => res.json(users));

/**
 * @route POST api/users/:email
 * @desc A user to log in
 **/
router.post('/:email', user_controller.user_login);

/**
 * @route POST api/users/
 * @desc Create new user account
 **/
router.post('/', user_controller.user_create);

/**
 * @route PUT api/users/:id
 * @desc Update user's saved plan
 **/
router.put('/:id', user_controller.user_plan_update);


module.exports = router;