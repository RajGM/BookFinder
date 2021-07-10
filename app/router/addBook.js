//importing modules
const express = require('express');
const router = new express.Router();
var path = require('path');

const addBookHelper = require('./../serverSideJs/addBookHelper');
const databaseConnectionHelper = require('./../serverSideJs/databaseConnectionHelper');

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
    const bookInfo = { title: "", author: "" , date:""};

    if (req.body.username != "" && req.body.password != "" && req.body.email != "") {
        bookInfo.title = req.body.title;
        bookInfo.author = req.body.author;
        bookInfo.date = req.body.date;
    }else{
        res.status(200).json("Input Error");
    }

    let mongoClient = await databaseConnectionHelper.connectionToDB();
    let bookStatus = await addBookHelper.checkIfBookExists(bookInfo.title,bookInfo.author,mongoClient);

    if(bookStatus=="exists"){
        mongoClient.close();
        res.status(200).json("Book exists already");
    }else{
        await addBookHelper.insertBook(profileValues.username,profileValues.password,profileValues.email,mongoClient);
        mongoClient.close();
        res.status(200).json("Book information inserted to database successfully");
    }

    res.status(200).json("Request received");
});

module.exports = router;