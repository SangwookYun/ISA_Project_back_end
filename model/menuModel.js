const db = require('../db')

function getMenu(id) {
    return new Promise((resolve, reject) => {
        resolve(db.execute("SELECT * FROM menu WHERE restaurantid ='" + id + "'"))
    })
}

function updateMenu(id, item) {
    return new Promise((resolve, reject) => {
        resolve(db.execute(
            'UPDATE menu (item) VALUES (' + item + '") WHERE menuid = ' + id))
    })
}

function deleteMenu(restid, menuid) {
    return new Promise((resolve, reject) => {
        resolve(db.execute('DELETE FROM menu WHERE restaurantid = ' + restid + 'AND menuid = ' + menuid))
    })
}

function countItems(id) {
    return new Promise((resolve, reject) => {
        resolve(db.execute("SELECT COUNT(*) FROM menu WHERE restaurantid = " + id))
    })
}

function addMenuItem(id, restid, item) {
    return new Promise((resolve, reject) => {
        resolve(db.execute('INSERT INTO menu (menuid, restaurantid, item) VALUES (' +
            id + '","' + restid + '","' + item + '")'))
    })
}

module.exports = {
    getMenu: getMenu,
    updateMenu: updateMenu,
    deleteMenu: deleteMenu,
    addMenuItem: addMenuItem,
    countItems: countItems
}