const route = require('express').Router()
const {findUrl} = require('../models/redirectmodel')

const redirectToOriginalUrl = async (req,res) => {
    const {shortUrl} = req.body;
    const redirectedUrl = await findUrl({shortUrl});
    if(redirectedUrl === false){
        return res.status(400).json({
            error : "Something wrong, Try again after sometime!"
        })
    }

    return res.status(200).json({
        message : "Success",
        data : {
            longUrl : redirectedUrl.longurl,
            shortUrl : shortUrl,
            createdOn : redirectedUrl.date
        }
    })
}

route.get('/',redirectToOriginalUrl);

module.exports = route;