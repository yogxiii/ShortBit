const express = require('express');
const urlRoute = require('./routes/url')
const redirectRoute = require('./routes/redirect')
const app = express();

app.use(express.json())

app.use('/shortener',urlRoute)
app.use('/redirect',redirectRoute)

app.listen(3000,()=>{
    console.log("App is listening on server 3000");
})