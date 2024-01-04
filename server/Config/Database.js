const mongoose = require('mongoose');

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        // console.log('Database connection established');
    }).catch((error)=>{
        //    console.log( 'Error connecting ; ' + error)
    })
}

module.exports = dbConnection;