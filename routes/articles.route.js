const router = require('express').Router()
const articleController = require('../controllers/article.controller')


router.get('/', articleController.getAllArticles)
router.get('/articles/:articleId', articleController.getArticleById)

module.exports = router

