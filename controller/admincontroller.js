const { Admin, Counter, User, UserCounter } = require("../models")
const { Op } = require("sequelize");
const bcrypt = require("bcrypt")

class AdminController {
  static showAdmins(req,response){
    Counter.findAll({
      include: [ User ],
      order: [["id","ASC"]]
    })
    .then(data=>{
      response.render("adminPage.ejs",{ data })
    })
    .catch(err=>{
      response.render("error", {err})
      // response.render("error",{error:err})
    })
  }

  static login(req,response){
    const message = req.app.locals.message
    delete req.app.locals.message
    response.render("loginAdmin.ejs",{message:message})
  }

  static loginPost(req,response){
    Admin.findOne({ where: { username: req.body.username } })
    .then((data)=>{
      if(data == undefined){
        req.app.locals.message = `Wrong email`
        response.redirect("/admins/login")
      }
      else{
        if(bcrypt.compareSync(req.body.password,data.password)){
          console.log(req.session)
          req.session.adminId = req.body.username
          response.redirect("/admins")
        }
        else{
          req.app.locals.message = `Wrong Password`
        response.redirect("/admins/login")
        }
      }
    })
    .catch((err)=>{
      console.log("asdas")
      response.render("error", {err})
    })
  }

  static register(req,response){
    response.render("registerAdmin.ejs")
  }

  static registerPost(req,response){
    let { first_name, last_name, username, password, email, birthdate, gender } =req.body
    Admin.create({
      first_name,
      last_name,
      username,
      password,
      email,
      birthdate,
      gender
    })
    .then((data)=>{
      req.app.locals.message = `Successfully register as Admin`
      response.redirect("/admins/login")
    })
    .catch((err)=>{
      response.render("error", {err})
    })
  }

  static logout(req,response){
    req.session.destroy(function(err){
      if(err){
        response.render("error", {err})
      }
      else{
        response.redirect("/admins/login")
      }
    })
  }

  static addCounter(req,response){
    response.render("addCounter.ejs")
  }

  static addPostCounter(req,response){
    Admin.findOne({
      where:{
        username: req.session.adminId
      }
    })
    .then((data)=>{
      return Counter.create({
        name: req.body.name,
        AdminId: data.id
      })
    })
    .then((data)=>{
      response.redirect("/admins")
    })
    .catch((err)=>{
      response.render("error", {err})
    })
  }

  static changeStatus(req,response){
    Counter.findByPk(+req.params.id)
    .then((data)=>{
      if(data.status === "Tutup"){
        return Counter.update({status:"Buka"},{where: {id:+req.params.id}})
      }
      else{
        return Counter.update({status:"Tutup"},{where: {id:+req.params.id}})
      }
    })
    .then((data)=>{
      response.redirect("/admins")
    })
    .catch(err=>{
      response.render("error", {err})
    })
  }

  static deleteCounter(req,response){
    Counter.destroy({
      where:{
        id: +req.params.id
      }
    })
    .then((data)=>{
      response.redirect("/admins")
    })
    .catch((err)=>{
      response.render("error", {err})
    })
  }
}

module.exports = AdminController
