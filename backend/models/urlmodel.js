const { dbConnect } = require("../config/configDb")

const insertUrl = async (data) => {
    const db = await dbConnect();

    const insertUrlQuery = await db.run(`
    INSERT INTO urldetails(shorturl,longurl,date) VALUES('${data.shortUrl}','${data.longUrl}','${data.date}')
    `)

    if(insertUrlQuery.changes == 0){
        return {
            error : "Something wrong, Try again after sometime!"
        };
    }

    const returnDataQuery = await db.get(`
    SELECT shorturl,longurl, date FROM urldetails WHERE id = '${insertUrlQuery.lastID}'
    `)

    if(returnDataQuery === undefined){
        return {
            error : "Something wrong, Try again after sometime!"
        };
    }else{
        return returnDataQuery;
    }
}

const findUrl = async (data) =>{
    const db = await dbConnect();

    const findUrlQuery = await db.get(`
    SELECT shorturl, date FROM urldetails WHERE longurl = '${data.longUrl}'
    `)

    console.log("findUrlQuery",findUrlQuery);
    if(findUrlQuery === undefined){
        return false;
    }else
    {
        return findUrlQuery;
    }
}

module.exports = {
    insertUrl,
    findUrl
}