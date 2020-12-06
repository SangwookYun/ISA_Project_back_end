const db = require('../db');
const { get } = require('../routes/menu');

let getRestaurantAll = () => {
    return db.execute("SELECT * FROM restaurant")
}

let getRestaurant = (id) => {

    return db.execute("SELECT * FROM restaurant WHERE restaurantid = '" + id + "'");

}

let getRestaurant_top_3 = (id) => {
    return new Promise((resolve, reject) => {
        resolve(db.execute("SELECT * FROM restaurant WHERE restaurantid = " + id));
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

function updateRestaurant(id, name, phone, addr, desc) {
    return db.execute('UPDATE restaurant SET (restaurant_name, \
        restaurant_phone, restaurant_addr, restaurant_desc) VALUES(' + name + '", "' + phone + '", "' + addr + '", "' + desc +
        '") WHERE restaurantid = ' + id)
}

function deleteRestaurant(id) {
    return new Promise((resolve, reject) => {
        db.execute('DELETE FROM restaurant WHERE restaurantid = ' + id)
    })
}

function updateResPic(id, url) {
    return new Promise((resolve, reject) => {
        resolve(('UPDATE restaurant SET (restaurant_pic) VALUES(' + url + '") WHERE restaurantid = ' + id))
    })
}

function getResPic(id) {
    return new Promise((resolve, reject) => {
        resolve(("SELECT restaurant_pic FROM restaurant WHERE restaurantid = " + id))
    })
}



module.exports = {
    getRestaurantAll: getRestaurantAll,
    getRestaurant: getRestaurant,
    getRestaurant_top_3: getRestaurant_top_3,
    getRestaurantByName: getRestaurantByName,
    countRestaurant: countRestaurant,
    addRestaurant: addRestaurant,
    deleteRestaurant: deleteRestaurant,
    updateRestaurant: updateRestaurant,
    getResPic: getResPic,
    updateResPic: updateResPic
}