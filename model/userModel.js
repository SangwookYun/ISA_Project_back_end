const db = require('../db')

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        resolve(db.execute("SELECT * FROM user WHERE userid ='" + id + "'"))
    })
}

const addUser = (id, password) => {
    return db.execute('INSERT INTO user (userid, password) VALUES ("' +
        id + '","' + password + '")')
}


module.exports = {
    getUser: getUser,
    addUser: addUser
}