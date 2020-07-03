const { User, Counter, UserCounter } = require('../models/')
const bcrypt = require('bcrypt')
const QRCode = require("qrcode")
const estimateTime = require("../helpers/estimateTime.js")
// const nodemailer = require('nodemailer')
class UserController {
    static showCounters(req,response){
      Counter.findAll()
      .then((data)=>{
        const message = req.app.locals.message
        delete req.app.locals.message
        response.render("user-counter.ejs",{ data, message })
      })
      .catch((err)=>{
        response.render("error", {err})
      })
    }


    static login(req,response){
      const message = req.app.locals.message
      delete req.app.locals.message
      response.render("user-login.ejs",{message:message})
    }

    static loginPost(req,response){
      User.findOne({ where: { email: req.body.email } })
      .then((data)=>{
        console.log(data)
        if(data == undefined){
          req.app.locals.message = `Wrong email`
          response.redirect("/users/login")
        }
        else{
            console.log(req.body.password, data.password)
          if(bcrypt.compareSync(req.body.password, data.password)){
            req.session.email = req.body.email
            response.redirect("/users")
          }
          else{
            req.app.locals.message = `Wrong password`
            response.redirect("/users/login")
          }
        }
      })
      .catch((err)=>{
        response.render("error", {err})
      })
    }

    static register(req,response){
      response.render("user-register.ejs")
    }

    static registerPost(req,response){

      let { first_name, last_name, email, password, birthdate, gender, phone_number } =req.body
      User.create({
          firstname: first_name,
          lastname: last_name,
          email,
          password,
          birthdate,
          gender,
          phone_number
        })
        .then((data)=>{
          req.app.locals.message = `Successfully register as User`
          response.redirect("/users/login")
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
            response.redirect("/users/login")
          }
        })
      }

      static queue(req,response){
        let dataFull = []
        User.findOne({
          where:{
            email:req.session.email
          }
        })
        .then((data)=>{
          QRCode.toDataURL(`${data.id} ${data.email} ${data.password}`, function (err, string) {
            if (err) throw err
            dataFull.push(string)
          })
          return UserCounter.create({
            UserId: data.id,
            CounterId: +req.params.id
          })
        })
        .then((data)=>{
          return UserCounter.findAll({
            where:{
              CounterId: data.CounterId
            },
            include:[ Counter ]
          })
        })
        .then((data)=>{
          dataFull.push(data)
          response.render("qrcode-image.ejs",{ data: dataFull, estimateTime })
        })
      }
}

module.exports = UserController
