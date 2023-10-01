const mongoose = require("mongoose")



const personSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    age: Number,
    favfood: [String]

})
module.exports = mongoose.model('person',personSchema,'persons');
