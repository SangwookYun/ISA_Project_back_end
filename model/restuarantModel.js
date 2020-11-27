const db = require('../db')

function getRestaurant(id) {
    return db.execute("SELECT * FROM restaurant WHERE restaurantid = " + id)
}

function getRestaurnatByName(name) {
    return db.execute("SELECT * FROM restaurant WHERE restaurant_name =" + name)
}

function countRestaurant() {
    return db.execute("SELECT COUNT(*) FROM restaurant")
}

function addRestaurant(id, name, phone, addr, desc) {
    return db.execute('INSERT INTO restaurant (restaurantid, restaurant_name, \
        restaurant_phone, restaurant_addr, restaurant_desc) VALUES(' + id + ', \
        "' + name + '", "' + phone + '", "' + addr + '", "' + desc + '")')
}

function updateRestaurant() {

}

module.exports = {
    getRestaurant: getRestaurant,
    getRestaurnatByName: getRestaurnatByName,
    countRestaurant: countRestaurant,
    addRestaurant: addRestaurant
}