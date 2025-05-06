const express=require('express');
const app=express();
const hbs=require('hbs');
const session=require('express-session')
const nocache=require('nocache')
const authRoute=require('./routes/auth')

app.use(express.static('public'))
app.set('view engine','hbs');
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'anisha-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:1000 * 60 * 60 * 24
    }
  }));

app.use(nocache())

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

app.use('/',authRoute);





app.listen(3002,()=>("server is running"))