const mongoose = require("mongoose") ;
const { DB_CONFIG } = require("../config/secrets");

mongoose
.connect(DB_CONFIG, {useNewUrlParser: true, useUnifiedTopology: true })
.then(function(obj){
    console.log("db connected!") ;
})
.catch(function(){console.log("error!")}) ;


module.exports.mongoose = mongoose;