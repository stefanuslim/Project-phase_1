const routes = require("express").Router()
const adminRoutes = require("./adminroutes.js")
const userRoutes = require("./userroutes.js")



routes.use("/admins",adminRoutes)

routes.use("/users",userRoutes)


module.exports = routes
