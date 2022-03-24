const bcrypt = require('bcrypt');
const createError = require('http-errors');
const jwt = require('jsonwebtoken')
const User = require('../models/People')
// get login page
function getLogin(req, res, next) {
    res.render("index");
  }

  // Login user
  async function login(req,res,next){
    try{
      // Find user from DB
      const user = await User.findOne({
        or:[{email:req.body.username},{mobile:req.body.username}]
      })
      if(user && user._id){
        const isValidPassword = await bcrypt.compare(
          // Normal password from user
          req.body.password,
          // Password from DB
          user.password
        )
        if(isValidPassword){
          // Prepare the user object to generate JWT(Token)
          const userObject = {
            username:user.name,
            mobile:user.mobile,
            email:user.email,
            role:'user'
          }
          // Generate JWT(Token)
          const token = jwt.sign(userObject,process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRY,
        })
        // SET COOKIE
        res.cookie(process.env.COOKIE_NAME,token,{
          maxAge:process.env.JWT_EXPIRY,
          httpOnly:true,
          signed:true,
        });
        // Set logged in user locals {to show client site and Tamplate Ejs}
        res.locals.loggedInUser = userObject
        // Rendering or redirect to Inbox page
        res.render('inbox')


      }else{
        throw createError('Login faild,Please try again')
      }
    }else{
        throw createError('Login faild,Please try again')
    }

    }catch(err){
      res.render('index',{
        data:{
          username:req.body.username,
        },
        errors:{
          common:{
            msg:err.message
          }
        }
      })
    }
  };

// Logout
function logout(req,res,next){
  res.clearCookie(process.env.COOKIE_NAME);
  res.send('logout')
}
  
  module.exports = {
    getLogin,
    login,
    logout
  };