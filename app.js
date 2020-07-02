const express = require("express")
const app = express()
const port = 3000
const routes = require("./routes")
const session = require("express-session")

app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))

app.use(session({
  secret: 'project_antrian',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(routes)


app.listen(port,()=>{
  console.log(`App listening to port ${port}`)
})
