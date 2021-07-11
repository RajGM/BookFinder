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
    const bookInfo = { title: "", author: "" };

    if (req.body.title != "" && req.body.author != "" && req.body.publishedDate != "" ) {
        bookInfo.title = req.body.title;
        bookInfo.author = req.body.author;
        bookInfo.date = req.body.publishedDate;
    }else{
        res.status(200).json("Input Error");
    }

    let mongoClient = await databaseConnectionHelper.connectionToDB();
    let bookStatus = await addBookHelper.checkIfBookExists(bookInfo.author,bookInfo.title,mongoClient);
    console.log("bookStatus:"+bookStatus);

    if(bookStatus=="exists"){
        mongoClient.close();
        res.status(200).json("Books exists already");
    }else{
        await addBookHelper.insertBook(bookInfo.title,bookInfo.author,bookInfo.date,mongoClient);
        mongoClient.close();
        res.status(200).json("Book information inserted to database successfully");
    }

});

module.exports = router;