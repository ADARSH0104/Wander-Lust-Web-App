const express= require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const User=require("../modules/user.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js")
const userController=require("../controller/user.js")

//Signup 
router
.route("/signup")
.get(wrapAsync(userController.renderSignup))
.post(wrapAsync(userController.signup))

//Login
router
.route("/login")
.get(wrapAsync(userController.renderLogin))
.post(saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),
    wrapAsync(userController.login))

//Logout route
router.get("/logout",userController.logout)
module.exports=router;