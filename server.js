const express = require('express')
// body-parser? path?
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
// const methodOverride = require('method-override') add
const app = express()

dotenv.config()

// no need?
// {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }

mongoose.connect(process.env.MONGO_URL)
    .then(console.log('connected to MongoDB'))
    .catch(err => console.log(err))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
// app.use(methodOverride('_method'))


app.get('/', async (req,res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

// change to POST later
app.listen(8000)




// "dependencies": {
//     "dompurify": "^2.0.8",
//     "ejs": "^3.0.1",
//     "express": "^4.17.1",
//     "jsdom": "^16.2.1",
//     "marked": "^0.8.0",
//     "method-override": "^3.0.0",
//     "mongoose": "^5.9.4",
//     "slugify": "^1.4.0"