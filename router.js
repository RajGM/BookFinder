//importing libraries
const express = require('express');
const router = new express.Router();
var path = require('path');
var databaseConnectionHelper = require('./app/serverSideJS/databaseConnectionHelper');
var getBookHelper = require('./app/serverSideJS/getBookHelper');

// @type    GET
//@route    /
// @desc    for sendig landing page
// @access  PUBLIC
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'index.html'));
})

// @type    GET
//@route    /
// @desc    for sendig landing page
// @access  PUBLIC
router.get('/index.html',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/'+'index.html'));
})

// @type    GET
//@route    /
// @desc    for sendig all information of books
// @access  PUBLIC
router.get('/getData',async (req,res) =>{
    let mongoClient = await databaseConnectionHelper.connectionToDB();
    let bookData = await getBookHelper.getAllData(mongoClient);
    mongoClient.close();
   
    res.status(200).json(bookData);
})

//export router
module.exports = router;