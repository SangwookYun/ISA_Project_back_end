const db = require('../db')

const getUser= (id) => {
    return new Promise((resolve, reject) => {
        console.log("SELECT * FROM user WHERE userid ='" + id + "'")
        resolve(db.execute("SELECT * FROM user WHERE userid ='" + id + "'"))
    })
}

const addUser= (id, password) => {
    return new Promise((resolve, reject) => {
        console.log('INSERT INTO user (userid, password) VALUES ("' +
        id + '","' + password + '")')
        resolve(db.execute('INSERT INTO user (userid, password) VALUES ("' +
        id + '","' + password + '")'))
    })
}


module.exports = {
    getUser: getUser,
    addUser:addUser
}