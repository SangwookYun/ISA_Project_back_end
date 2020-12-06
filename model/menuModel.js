const db = require('../db')

function getMenu(id) {
    return db.execute("SELECT * FROM menu WHERE restaurantid ='" + id + "'")
}

function updateMenu(id, restid, item, amount, desc) {
    return new Promise((resolve, reject) => {
        resolve(db.execute('UPDATE menu SET restaurantid = ' + restid + ', items = "' + item + '", menudescription = "' +
            desc + '", menuprice = "' + amount + '" WHERE menuid = ' + id))
    })
}

function deleteMenu(menuid) {
    return new Promise((resolve, reject) => {
        resolve(db.execute('DELETE FROM menu WHERE menuid = ' + menuid))
    })
}

function countItems() {
    return new Promise((resolve, reject) => {
        resolve(db.execute("SELECT COUNT(*) FROM menu"))
    })
}

function addMenuItem(id, restid, item, amount, desc) {
    return new Promise((resolve, reject) => {
        resolve(db.execute('INSERT INTO menu (menuid, restaurantid, items, menudescription, menuprice) VALUES (' +
            id + "," + restid + ',"' + item + '","' + desc + '","' + amount + '")'))
    })
}

module.exports = {
    getMenu: getMenu,
    updateMenu: updateMenu,
    deleteMenu: deleteMenu,
    addMenuItem: addMenuItem,
    countItems: countItems
}