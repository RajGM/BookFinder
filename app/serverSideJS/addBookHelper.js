//import required modules and required helper funtions
const bookInfoSchema = require('../models/bookInfo');
const dotenv = require('dotenv');
dotenv.config();

async function checkIfBookExists(author, title, mongoClient) {
    //this function is not working as expected
    //fix this function later
    let dataArr;

    try {
        const db = mongoClient.db("bookfinder").collection("bookdata");

        dataArr = await db.find()
            .toArray();

    }
    catch (err) {
        console.log(err);
    }

    let existsFlag = false;

    for (let i = 0; i < dataArr.length; i++) {

        if (dataArr[i]["title"].toLowerCase() == title.toLowerCase() && dataArr[i]["author"].toLowerCase() == author.toLowerCase()) {
            console.log("Entity Found");
            existsFlag = true;
            break;
        }

    }

    if (existsFlag) {
        return "exists";
    } else {
        return "notExists";
    }

}

async function insertBook(title, author, date, mongoClient) {

    try {
        const db = mongoClient.db(process.env.mongoDBName).collection(process.env.mongodbCollection);

        const bookInfo = new bookInfoSchema({
            title: title,
            author: author,
            publishedDate: date
        });

        let dbInsert = await db.insertOne(bookInfo)
            .then(pro => {
                console.log("Book data inserted");
            })
            .catch(err => {
                console.log("Book data insertion problem", err);
            });

    }
    catch (err) {
        console.log(err);
    }

    return "bookInserted";

}

exports.checkIfBookExists = checkIfBookExists;
exports.insertBook = insertBook;
