
const Sequelize = require('sequelize')
const finale = require('finale-rest')
const database = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

var User = database.define('users', {
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.STRING,
});

const initializeDatabase = async (app) => {
    finale.initialize({ app, sequelize: database })

    finale.resource({
        model: User,
        endpoints: ['/api/users', '/api/users/:id'],
        search: [{
            param: 'onlyName',
            attributes: ['name']
        },
        {
            param: 'onlyAddress',
            attributes: ['address']
        }, {
            param: 'onlyPhone',
            attributes: ['phone']
        }]
    })

    await database.sync()
}

module.exports = initializeDatabase
