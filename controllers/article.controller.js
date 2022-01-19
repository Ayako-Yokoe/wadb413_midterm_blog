const Article = require('../models/article')


// clone ?
const getById = (articleId) => {
    return Article.findById(articleId, (err, data) => {
        if(err) console.log(err)
        return data
    }).clone()
}


// GET All Articles
exports.getAllArticles = (req,res,next) => {
    Article.find((err, articles) => {
        if(err) console.log(err)

        res.render('articles/article-lists', { articles: articles })
    })
}

//GET One Article
exports.getArticleById = async (req,res,next) => {
    // const { params: { articleId } } = req
    // const article = await getById(articleId);
    // res.render('articles/article-single', { article: article })

    // const article = await Article.findById(req.params.id)
    // res.render('articles/article-single', { article: article })

    const { id } = req.params
    const article = await Article.findOne({ _id: id})
    res.render('articles/article-single', { article: article })
}

// router.get('/:slug', async (req,res) => {
//     const article = await Article.findOne({ slug: req.params.slug })
//     if(article === null) res.redirect('/')
//     res.render('articles/show', { article: article })
// })


// router.put('/:id', async (req,res) => {
//     let article = await Article.findById(req.params.id)
//     try {
//         article = await article.save()
//         res.redirect(`/articles/${article.slug}`)
//     } catch(err) {
//         res.render('articles/edit', { article: article })
//     }
// })