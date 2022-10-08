const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const OrderItem = sequelize.define('orderItem', {
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

module.exports = OrderItem
