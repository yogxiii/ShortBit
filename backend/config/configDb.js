const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const dbConnect = async () => {
    const db = await open({
        filename : './URL.db',
        driver : sqlite3.Database
    })

    await db.run(`CREATE TABLE IF NOT EXISTS urldetails(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        shorturl TEXT NOT NULL,
        longurl TEXT NOT NULL,
        date DATE NOT NULL
    )`, (err)=>{
        console.log(err);
    })

    return db;
}

module.exports = {
    dbConnect
}