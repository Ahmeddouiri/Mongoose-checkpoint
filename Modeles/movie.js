const mongoose = require("mongoose")



const moviesSchema = mongoose.Schema({

    id : String,
    Title : String,
    Year : Number,
    rate : String,
    description : String,
    posterURL : String



})
module.exports = mongoose.model('movie',moviesSchema,'Movie_Liste');
