var express = require('express');
var moment = require('moment');
var app = express();
var path = require('path');

function parseTime(query){
    var timeObj = {"unix":null, "natural":null};
    var ptn_unix = /^\d+$/;
    var thisMoment = ptn_unix.test(query) ? moment(query, "X") : moment(query);
    
    if(ptn_unix.test(query)){
        thisMoment = moment(query, "X");
        timeObj.unix = Number(query);
        timeObj.natural = thisMoment.utc().format("MMMM DD, YYYY");
    }else if(thisMoment.isValid()){
        timeObj.unix = Number(thisMoment.utc().format("X"));
        timeObj.natural = thisMoment.utc().format("MMMM DD, YYYY");
    
    }
    
    return JSON.stringify(timeObj);
}

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/:datestr', function(req, res){
    var query = req.params.datestr;
    res.end(parseTime(query))
});

/*
app.use(function(req, res){
   var query = req.path;
   res.end(parseTime(decodeURI(query.slice(1))));
});
*/

app.listen($PORT, function(){
    //console.log('Example app listening on port 8080');
})