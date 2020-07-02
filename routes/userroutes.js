const userRoutes = require('express').Router()
const UserController = require('../controllers/usercontroller')
const bcrypt = require('bcrypt')

function checkSession(req,res,next){
    if(req.session.email){
      next()
    }
    else{
      res.send("Unauthorized")
    }
  }
userRoutes.get("/login",UserController.login)

userRoutes.post("/login",UserController.loginPost)

userRoutes.get("/register",UserController.register)

userRoutes.post("/register",UserController.registerPost)

userRoutes.get("/logout",UserController.logout)


userRoutes.use(checkSession)

userRoutes.get("/",UserController.showCounters)

userRoutes.get("/queue/:id",UserController.queue)


module.exports = userRoutes
