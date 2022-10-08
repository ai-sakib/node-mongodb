const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
})

module.exports = CartItem
