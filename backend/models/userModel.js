const { connection } = require('../lib/db') // getting connection configuration of mysql from the db.js


const User = {
    UserLoginEmail: (email, callback) => {
        const query = `
            SELECT * FROM user WHERE email=?
        `
        connection.query(query, [email], callback)
    },

    UserLoginPassword: (userId, callback) => {
        const query = `
            SELECT password FROM user WHERE user_id=?
        `
        connection.query(query, [userId], callback)
    },

    UserRegister: (data, callback) => {
        const query = `
            INSERT INTO user (user_id, email, password, role) VALUES
            (?, ?, ?, ?)
        `
        const { email, password, role, userId } = data
        connection.query(query, [ userId, email, password, role ], callback)
    },

}

module.exports = {
    User
}