//import required modules and required helper funtions
const dotenv = require('dotenv');
dotenv.config();

async function getAllData(mongoClient) {
let dataArr;
try {
    const db = mongoClient.db('bookfinder').collection('bookdata');
    
    dataArr = await db.find({}, { projection: { "_id": 0 } })
        .toArray();
    
}
catch (err) {
    console.log(err);
}

return dataArr;

}

exports.getAllData = getAllData;
