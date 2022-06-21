const route = require('express').Router()
const validurl = require('valid-url')
const shortid = require('shortid')
const {insertUrl,findUrl} = require('../models/urlmodel')

const baseUrl = "http://ShortBit/";

const createShortUrl = async (req,res) => {
    const { longUrl } = req.body;
    if(!validurl.isUri(longUrl)){
        return res.status(400).json({
            error : "Invalid URL"
        })
    }

    const checkIfAlreadyExist = await findUrl({longUrl});
    if(checkIfAlreadyExist){
       return res.status(200).json({
            message : "Url already Exist",
            data : {
                longUrl : longUrl,
                shortUrl : checkIfAlreadyExist.shorturl,
                createdOn : checkIfAlreadyExist.date
            }
        })
    }

    const shortUrl = baseUrl + shortid.generate();
    let date = new Date();

    const createUrl = await insertUrl({shortUrl,longUrl,date});

    return res.status(200).json({
        message : "URL Created Successfully",
        data : {
            longUrl : longUrl,
            shortUrl : createUrl.shorturl,
            createdOn : createUrl .date
        }
    })
}

route.post('/',createShortUrl);

module.exports = route;