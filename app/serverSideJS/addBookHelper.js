//import required modules and required helper funtions
const bookInfoSchema = require('../models/bookInfo');
const dotenv = require('dotenv');
dotenv.config();

async function checkIfBookExists(author, title, mongoClient) {
    //this function is not working as expected
    //fix this function later
    let dataArr;
    let dataArr2;

    console.log("checkIfBookExists Values::");
    console.log("author:"+author+"   "+"title:"+title);

    try {
        const db = mongoClient.db("bookfinder").collection("bookdata");
        
        dataArr = await db.find( title )
            .toArray();
            //{ title }, { projection: { "_id": 0 }
        dataArr2 = await db.find( author )
            .toArray();
    }
    catch (err) {
        console.log(err);
    }

    console.log("dataArr:",dataArr);
    console.log("dataArr2:",dataArr2);

    if (Object.keys(dataArr).length === 0 && Object.keys(dataArr2).length === 0) {
        return "notExists"
    } else {
        return "exists";
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
