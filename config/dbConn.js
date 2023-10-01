const mongoose = require("mongoose")

const dbConn = async () =>{

    try {
            mongoose.connect("mongodb+srv://ahmeddouiri01:121200AD@cluster0.8gwkxsz.mongodb.net/personDB")
            console.log("connected to DB")

    }
    catch (error){
       console.log(error) 
    }
}

module.exports = dbConn