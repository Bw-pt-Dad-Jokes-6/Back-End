const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
    register,
    getUserById,
    getUserByUsername,
    returnAllusers
}

function register(user){
    return db("users").insert(user)
}

function getUserById(userId){
    return db("users").where({id: userId})
}

function getUserByUsername(un){
    return db("users").where({username: un})
}

function returnAllusers (){
    return db("users")
}
