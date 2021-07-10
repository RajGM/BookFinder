//importing libraries
const express = require('express');
const router = new express.Router();

// @type    GET
//@route    /
// @desc    for sendig landing page
// @access  PUBLIC
router.get('/',function(req,res){
    res.json("Working");
})

// @type    GET
//@route    /
// @desc    for sendig landing page
// @access  PUBLIC
router.get('/index.html',function(req,res){
    res.json("Working");
})

//export router
module.exports = router;