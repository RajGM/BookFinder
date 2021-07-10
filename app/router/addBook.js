//importing modules
const express = require('express');
const router = new express.Router();
var path = require('path');

// @type    GET
//@route    /register
// @desc    for sending register page
// @access  PUBLIC
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './../views/' + 'addBook.html'));
});

// @type    POST
//@route    /addBook
// @desc    for adding book info to the database
// @access  PUBLIC
router.post('/', async (req, res) => {
    //post book info to database
    res.status(200).json("Request received");
});

module.exports = router;