const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editMode: false,
    })
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description

    const product = new Product(title, price, description, imageUrl)
    product.save().then(() => {
        res.redirect('/')
    })
}

// exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit
//     if (!editMode) {
//         return res.redirect('/')
//     }

//     const productId = req.params.productId
//     Product.findByPk(productId)
//         .then(product => {
//             res.render('admin/edit-product', {
//                 pageTitle: 'Edit Product',
//                 path: '/admin/edit-product',
//                 editMode,
//                 product: product,
//             })
//         })
//         .catch(err => console.log(err))
// }

// exports.postEditProduct = (req, res, next) => {
//     const id = req.body.productId
//     const title = req.body.title
//     const imageUrl = req.body.imageUrl
//     const price = req.body.price
//     const description = req.body.description

//     Product.findByPk(id)
//         .then(product => {
//             product.title = title
//             product.imageUrl = imageUrl
//             product.price = price
//             product.description = description
//             return product.save()
//         })
//         .then(() => {
//             res.redirect('/admin/products')
//         })
//         .catch(err => console.log(err))
//     res.redirect('/admin/products')
// }

// exports.postDeleteProduct = (req, res, next) => {
//     const id = req.body.productId
//     Product.findByPk(id)
//         .then(product => {
//             return product.destroy()
//         })
//         .then(() => {
//             console.log('DESTROYED PRODUCT')
//             res.redirect('/admin/products')
//         })
//         .catch(err => console.log(err))
// }

// exports.getProducts = (req, res, next) => {
//     req.user
//         .getProducts()
//         .then(products => {
//             res.render('admin/products', {
//                 prods: products,
//                 pageTitle: 'Admin Products',
//                 path: '/admin/products',
//             })
//         })
//         .catch(err => console.log(err))
// }
