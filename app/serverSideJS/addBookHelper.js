//import required modules and required helper funtions
const bookInfoSchema = require('../models/bookInfo');
const dotenv = require('dotenv');
dotenv.config();

async function checkIfBookExists(author, title, mongoClient) {
    let dataArr;
    let dataArr2;

    try {
        const db = mongoClient.db(process.env.mongoDBName).collection(process.env.mongodbCollection);

        dataArr = await db.find({ author }, { projection: { "_id": 0 } })
            .toArray();

        dataArr2 = await db.find({ title }, { projection: { "_id": 0 } })
            .toArray();
    }
    catch (err) {
        console.log(err);
    }

    if (Object.keys(dataArr).length === 0 || Object.keys(dataArr2).length === 0) {
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

        console.log("bookInfo data::::"+bookInfo);

        let dbInsert = await db.insertOne(bookInfo)
            .then(pro => {
                console.log("Book data inserted");
            })
            .catch(err => {
                console.log("Profile creation problem", err);
            });

    }
    catch (err) {
        console.log(err);
    }

    return "bookInserted";

}


exports.checkIfBookExists = checkIfBookExists;
exports.insertBook = insertBook;
