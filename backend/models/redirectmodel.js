const { dbConnect } = require("../config/configDb")

const findUrl = async (data) => {
    const db = await dbConnect();

    const findUrlQuery = await db.get(`
    SELECT longurl,date FROM urldetails WHERE shorturl = '${data.shortUrl}'
    `)

    console.log("findUrlQuery=",findUrlQuery);
    if(findUrlQuery === undefined){
        return false;
    }else{
        return findUrlQuery;
    }
}

module.exports = {
    findUrl
}