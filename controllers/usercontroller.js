const { User, Counter, UserCounter } = require('../models/')
const bcrypt = require('bcrypt')

class UserController {
    static showCounters(req,response){
      Counter.findAll()
      .then((data)=>{
        const message = req.app.locals.message
        delete req.app.locals.message
        // response.send(data)
        // response.render("user-counter.ejs",{ data, message })
        Counter.findAll()
      })
      .then(result => {
        response.send(result)
      })
      .catch((data)=>{
        response.render("error",{error:err})
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
        if(data === undefined){
          console.log('OK1')
          response.render("error",{err: `email not found`})
        }
        else{
            console.log(req.body.password, data.password)
          if(bcrypt.compareSync(req.body.password, data.password)){
            console.log(req.session)
            req.session.email = req.body.email
            response.redirect("/users")
          }
          else{
            response.render("error",{err: `password doesn't match`})
          }
        }
      })
      .catch((err)=>{
        console.log("asdas")
        response.render("error",{error:err})
      })
    }

    static register(req,response){
      response.render("user-register.ejs")
    }

    static registerPost(req,response){
        console.log(req.body);

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
          response.render("error",{error:err})
        })
      }

      static logout(req,response){
        req.session.destroy(function(err){
          if(err){
            response.render("error",{error:err})
          }
          else{
            response.redirect("/users/login")
          }
        })
      }

      static queue(req,response){
        User.findOne({
          where:{
            email:req.session.email
          }
        })
        .then((data)=>{
          return UserCounter.create({
            UserId: data.id,
            CounterId: +req.params.id
          })
        })
        .then((data)=>{
          req.app.locals.message = `Succesfully queue the Counter`
          response.redirect("/users")
        })
      }
}

module.exports = UserController
