const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
    getJokeById,
    getJokesByUserId,
    getAllJokes,
    getJokesByRange,
    createJoke,
    editJoke
}

function getJokeById(jokeId){
    return db("jokes").where({id: jokeId})
}

function getJokesByUserId(userId){
    return db("jokes").where({user: userId})
}

function getAllJokes (){
    return db("jokes")
}

function createJoke(joke){
    return db("jokes").insert(joke);
}

function editJoke(joke, jokeId){
    return db("jokes").where({ id: jokeId })
    .update({
        joke_body: joke.joke_body,
        punchline: joke.punchline,
        user: joke.user
    })
}

function getJokesByRange(min,max){
    return db("jokes").whereBetween('id', [min,max]);
}
