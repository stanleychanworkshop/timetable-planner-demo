const express = require('express');
const router = express.Router();
const raw = require('../../Raw');

/**
 * @route GET api/raw
 * @desc Retrives raw data
 **/
router.get('/', (req, res) => {
    res.json(raw);
});

module.exports = router;