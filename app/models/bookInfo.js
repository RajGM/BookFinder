//Schema definition for Book

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    Title:{
        type:String,
        require:true
    },
    Author:{
        type:[{type:String}],
        require:true
    },
    PublishedDate:{
        type:Date,
        require:true
    },
});

module.exports = bookInfo = mongoose.model("BookSchema",BookSchema);