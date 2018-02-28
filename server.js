const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});


app.set('view engine','hbs');

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/media'));

//middle ware custom
app.use((req ,res ,next)=> {
var now =new Date().toString();
var log = `${now} : ${req.method}; path:${req.url}`;
fs.appendFileSync('server.log',log+'\n');

var  pageMeta = {
    pageTitle : 'Maintainace Page',
    message : 'This Page is under maintaince'
  };

res.render('maint.hbs',pageMeta);
//next();
});


app.get('/',(req,res)=>{
    var pageMeta = {
        PageTitle:'Home' ,
        Content:'Hello',
        media: __dirname+'/media/movie.mp4'
    };
res.render('index.hbs',pageMeta);
});
app.get('/about',(req,res)=>{
  var  pageMeta = {
      pageTitle : 'About Page',
      message : 'La La La Lalalaalal..... Land'
    };
    res.render('about.hbs',pageMeta);
});

app.get('/bad',(req,res)=>{
    res.send('<h1>Opss  Baby hit me On more time :)</h1>');
});

app.get('/maint',(req, res)=>{
    var  pageMeta = {
        pageTitle : 'Maintainace Page',
        message : 'This Page is under maintaince'
      };

   res.render('maint.hbs',pageMeta);
});

const port = process.env.port || 3000;
   
app.listen(port,()=>{
    console.log(`Server is up and running on port ${port}!`);
});