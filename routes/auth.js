const express=require('express');
const user=express.Router();

const username="anishak"
const password="admin"

user.post('/verifyuser',(req,res)=>{
    
    if(req.body.username===username&&req.body.password===password){
        req.session.user=req.body.username
        res.redirect('/homepage')
    }else{
        req.session.wrongpassword=true
        res.redirect('/')
    }
})

user.get('/homepage',(req,res)=>{
    if(req.session.user){
        res.render('homepage')
    }else{
        res.redirect('/');
    }
})

user.get('/',(req,res)=>{
    if(req.session.user){
        res.redirect('/homepage')
    }else if(req.session.wrongpassword===true){
        req.session.wrongpassword=false;
        res.render('login',{msg:"Invalid Credentials"})
        

    }else{
        res.render('login');
    }
})

user.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})


module.exports=user