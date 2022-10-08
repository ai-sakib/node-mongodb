const Sequelize = require('sequelize')

const sequelize = new Sequelize('node_start', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
})

module.exports = sequelize
