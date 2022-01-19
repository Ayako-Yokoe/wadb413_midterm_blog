require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const articleRoute = require('./routes/articles.route')
const adminRoute = require('./routes/admin.route')
const authRoute = require('./routes/auth.route')

// const Article = require('./models/article')
const User = require('./models/user')
const app = express()

const store = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: 'sessions'
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'himitsu',
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use((req,res,next) => {
    res.locals.isAuth = req.session.isLoggedIn
    next()
})


app.use('/admin', adminRoute)
app.use(articleRoute)
app.use(authRoute)

// app.use((req,res,next) => {
//     res.status(404).render('404', { pageTitle: 'Page Not Found'})
// })

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGODB_URL, () => {
    app.listen(PORT)
})
