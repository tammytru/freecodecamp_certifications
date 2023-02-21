require('dotenv').config()
let bodyParser = require('body-parser');
let express = require('express');
let app = express();


//root-level request logger middleware
    // must be mounted before other uses if want to be applied for all of them
    //NOTE: not passing the check on freecodecamp for some reason although i did it right
app.use((req, res, next) => {
    var r = req.method + " " + req.path +  " - " + req.ip
    console.log(r)
    next();
});

//use body-parser to parse POST requests
app.use(bodyParser.urlencoded({extended: false}))


// meet the node console
// console.log("Hello World")


//start a working express servr
// app.get('/', (req, res) => {
//     res.send('Hello Express')
// })


//serve an HTML file
absolutePath = __dirname + '/views/index.html' //send needs absolute path
app.get('/', (req, res) => {
    res.sendFile(absolutePath) //guess not
})


//serve static assets
app.use('/public', express.static( __dirname + '/public')) //mount assets files from public folder


//serve JSON on a specific route
app.get('/json', (req, res) => {
    mes = "Hello json"
    if(process.env.MESSAGE_STYLE === "uppercase") {
       mes = mes.toUpperCase();
    }
    res.json({"message": mes}) 
})


//chain middleware to create a time server
app.get('/now', (req, res, next) => {
    req.time = new Date().toString()
    next()
}, (req, res) => {
    res.json({"time": req.time})
})


//get route parameter input from client
app.get('/:word/echo', (req, res) => {
    res.json({"echo": req.params.word})
})


//get query parameter input from client
app.route('/name')
    .get((req, res) => {
        var name = req.query.first + " " + req.query.last
        res.json({ "name": name })
    })
    .post((req, res) => {
        var name = req.body.first + " " + req.body.last
        res.json({"name": name})
    })




 module.exports = app;
