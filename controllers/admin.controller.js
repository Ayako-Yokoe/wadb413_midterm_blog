const Article = require('../models/article')



// GET All Articles
exports.getAllArticles = (req,res,next) => {
    Article.find((err, articles) => {
        if(err) console.log(err)

        res.render('admin/articles', { articles: articles })
    })
}

// exports.getAddProduct = (req, res, next) => {
//     res.render('shop/add-edit-product', {
//       pageTitle: 'Add Product',
//       editing: false,
//     })
//   }


// POST A NEW Article
exports.postNewArticle = async (req,res,next) => {
    const newArticle = new Article(req.body)
    await newArticle.save()
    res.redirect('/')
  };

  // EDIT an article
exports.postEditArticle = async (req,res,next) => {
    const article = await Article.findById(req.params.id) 
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } 
        )
        res.redirect('/')
}


// DELETE an article
exports.deleteArticle = async (req,res,next) => {
    await Article.findByIdAndDelete(req.params.id)
    res.render('Article has been deleted') // need this?
    // res.redirect('/')
}