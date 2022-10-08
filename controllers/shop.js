const Product = require('../models/product')

exports.getIndex = (req, res, next) => {
    Product.get()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
            })
        })
        .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    Product.get()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
            })
        })
        .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId
    Product.find(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products',
            })
        })
        .catch(err => console.log(err))
}

exports.deleteProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        })
    })
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts()
        })
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products,
            })
        })
        .catch(err => console.log(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId

    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: prodId } })
        })
        .then(products => {
            const product = products[0]
            return product.cartItem.destroy()
        })
        .then(response => {
            console.log('CART ITEM DELETED')
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId

    Product.find(prodId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            console.log('postCart', result)
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
    // let fetchedCart
    // let newQty = 1

    // req.user
    //     .getCart()
    //     .then(cart => {
    //         fetchedCart = cart
    //         return cart.getProducts({ where: { id: prodId } })
    //     })
    //     .then(products => {
    //         let product
    //         if (products.length) {
    //             product = products[0]
    //         }

    //         if (product) {
    //             let oldQty = product.cartItem.quantity
    //             newQty = oldQty + 1
    //         }

    //         return Product.findByPk(prodId)
    //     })
    //     .then(product => {
    //         return fetchedCart.addProduct(product, {
    //             through: { quantity: newQty },
    //         })
    //     })
    //     .then(result => {
    //         res.redirect('/cart')
    //     })
    //     .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({ include: ['products'] })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders,
            })
        })
        .catch(error => console.log(error))
}

exports.postOrder = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts()
        })
        .then(products => {
            return req.user.createOrder().then(order => {
                return order.addProducts(
                    products.map(product => {
                        product.orderItem = {
                            quantity: product.cartItem.quantity,
                        }
                        return product
                    })
                )
            })
        })
        .then(result => {
            return req.user.getCart().then(cart => {
                return cart.setProducts(null)
            })
        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    })
}
