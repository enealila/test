const express=require('express');
const hbs = require('hbs');
const fs = require('fs');
var app= express();
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(error)=>{
        if(error){
            console.log('unable to append to server.log');
        }
    });
  next();
});

// app.use((req,res,next)=>{
//     res.render('main.hbs');
// });
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage:'Welcome to my homepage!'
   })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});
app.get('/bad',(req,res)=>{
    res.send({
    Error: 'Can not handle request'
    });
});
app.get('/home',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage:'Welcome to my homepage!'
    });
}); 



app.listen(3000);
console.log('Server is on port 3000 ');