const router = require('express').Router()
const adminController = require('../controllers/admin.controller')


router.get('/', adminController.getAllArticles)
router.post('/add-article', adminController.postNewArticle)
router.post('/edit-article', adminController.postEditArticle)
router.post('/delete-article', adminController.deleteArticle)

module.exports = router