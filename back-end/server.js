// importing modules 
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();


// connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

// on connection
mongoose.connection.on('connected',()=>{
    console.log('connected to mongos database at 27017');
});

// on error 
mongoose.connection.on('error',(err)=>{
    if(err) {
        console.log('Error in database connection:'+ err);
          
    }
});

//port number
const port = 3000;

const route = require('./routes/routes');

//adding middleware cors
app.use(cors());

//adding parser
app.use(bodyparser.json())

//adding routes
app.use('/api', route);

//using static files
app.use(express.static(path.join(__dirname, 'public')));

//testing server
app.get('/',(req,res)=>{
    res.send('test content');
})

app.listen(port,()=> {
    console.log('Server started at port'+ port);
})
