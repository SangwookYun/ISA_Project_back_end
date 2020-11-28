const db = require('../db')

let getRestaurant = (id) => {
    return new Promise((resolve, reject) => {
        resolve(db.execute("SELECT * FROM restaurant WHERE restaurantid = '" + id + "'"));
    });
}


let getRestaurantByName = (name) => {
    return new Promise((resolve, reject) => {
        resolve(db.execute("SELECT * FROM restaurant WHERE restaurant_name ='" + name + "'"));
    });
}
let countRestaurant = () => {
    return new Promise((resolve, reject) => {
        resolve(db.execute("SELECT COUNT(*) FROM restaurant"))
    })
}

let addRestaurant = (id, name, phone, addr, desc) => {
    return new Promise((resolve, reject) => {
        resolve(db.execute('INSERT INTO restaurant (restaurantid, restaurant_name, \
            restaurant_phone, restaurant_addr, restaurant_desc) VALUES(' + id + ', \
            "' + name + '", "' + phone + '", "' + addr + '", "' + desc + '")'))
    })
}

function updateRestaurant() {
    return db.execute('UPDATE restaurant SET (restaurant_name, \
        restaurant_phone, restaurant_addr, restaurant_desc) VALUES(' + name + '", "' + phone + '", "' + addr + '", "' + desc +
        '") WHERE restaurantid = ' + id)
}

function deleteRestaurant(id) {
    return db.execute('DELETE FROM restaurant WHERE restaurantid = ' + id)
}


module.exports = {
    getRestaurant: getRestaurant,
    getRestaurantByName: getRestaurantByName,
    countRestaurant: countRestaurant,
    addRestaurant: addRestaurant,
    deleteRestaurant: deleteRestaurant,
    updateRestaurant: updateRestaurant
}