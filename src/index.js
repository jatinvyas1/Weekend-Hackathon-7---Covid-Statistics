const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')

app.get("/totalRecovered",(req,res)=>{
    connection.aggregate([{$group: {_id:"total", recovered: {$sum:"$recovered"} } }]).then(result=>{
        console.log(typeof result)
        res.send({"data":result[0]});
    })
})




app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;