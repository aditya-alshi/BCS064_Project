const { connection } = require('../lib/db')

const ADMIN = {
    adminEmailLogin : (data, callback) => {
        const query = `
            SELECT * FROM user WHERE email=?
        `
        const { email } = data;
        connection.query(query, [email], callback)
    }
}

module.exports = {
    ADMIN
}