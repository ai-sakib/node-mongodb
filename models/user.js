const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

const ObjectId = mongodb.ObjectId
class User {
    constructor(name, email, id, cart) {
        this._id = id ? new ObjectId(id) : null
        this.name = name
        this.email = email
        this.cart = cart
    }

    save() {
        const db = getDb()
        return db
            .collection('users')
            .insertOne(this)
            .then(result => {
                console.log('dbOp', result)
            })
            .catch(err => console.log(err))
    }

    addToCart(product) {
        console.log('addToCart', product)
        const updatedCart = { items: [{ productId: product._id, quantity: 1 }] }
        const db = getDb()
        return db
            .collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            )
    }

    static get() {
        const db = getDb()
        return db.collection('users').find().toArray()
    }

    static find(productId) {
        const db = getDb()
        return db
            .collection('users')
            .findOne({ _id: new ObjectId(productId) })
            .then(user => {
                console.log(user)
                return user
            })
            .catch(err => console.log(err))
    }

    static delete(productId) {
        const db = getDb()
        return db
            .collection('users')
            .deleteOne({ _id: new ObjectId(productId) })
            .then(() => {
                console.log('Deleted User !')
            })
            .catch(err => console.log(err))
    }
}

module.exports = User
