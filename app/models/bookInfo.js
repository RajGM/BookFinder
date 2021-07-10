//Schema definition for Book
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    publishedDate:{
        type:Date,
        require:true
    },
});

module.exports = BookInfo = mongoose.model("bookSchema",BookSchema);