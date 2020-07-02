const adminRoutes = require("express").Router()
const AdminController = require("../controller/admincontroller.js")
function checkSession(req,res,next){
  if(req.session.adminId){
    next()
  }
  else{
    res.send("Unauthorized")
  }
}


adminRoutes.get("/login",AdminController.login)

adminRoutes.post("/login",AdminController.loginPost)

adminRoutes.get("/register",AdminController.register)

adminRoutes.post("/register",AdminController.registerPost)

adminRoutes.get("/logout",AdminController.logout)


adminRoutes.use(checkSession)

adminRoutes.get("/",AdminController.showAdmins)

adminRoutes.get("/addCounter",AdminController.addCounter)

adminRoutes.post("/addCounter",AdminController.addPostCounter)

adminRoutes.get("/changeStatus/:id",AdminController.changeStatus)



module.exports = adminRoutes
