const express = require("express")
const session = require("express-session")
const morgan = require("morgan")
const cookie = require("cookie-parser")
const { port, sessionSecret } = require("./config")
const { connection } = require("./config/db")
const passport = require("passport")
const cors = require("cors")
require("dotenv").config({path: '.env'})


// Routes:
const auth = require("./routes/auth")
const users = require("./routes/users")
const products = require("./routes/products")
const cart = require("./routes/cart")
// const reviews = require("./routes/reviews")
const webhooks = require("./routes/webhooks")
const { useGoogleStrategy,useFacebookStrategy,useGitHubStrategy,useTwitterStrategy } = require("./middleware/authProvider")

const app = express()


connection()

// Cookies. Diferentes tipos de cookies. HTTP Only Cookie

// Utilizando middleware
app.use(morgan("dev"))
app.use("/api/webhooks/stripe",express.raw({type: 'application/json'}))
app.use(express.json())
app.use(cookie())
app.use(cors({
    origin:[process.env.URL_FRONTEND],
    credentials:true
}))

app.use(session({
    secret:sessionSecret,
    resave:false,
    saveUninitialized:false
}))//Redis
app.use(passport.initialize())

//usando strategys
passport.use(useGoogleStrategy())
passport.use(useFacebookStrategy())
passport.use(useTwitterStrategy())
passport.use(useGitHubStrategy())

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})

// Usando rutas:
auth(app)
users(app)
products(app)
cart(app)
// reviews(app)
webhooks(app)

app.get("/",(req,res)=>{
    return res.json({
        name:"Ecommerce"
    })
})


app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})