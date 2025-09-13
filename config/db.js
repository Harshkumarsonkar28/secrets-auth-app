const mongoose = require('mongoose')

async function Dbconnection() {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        await mongoose.connect(MONGO_URI,{
           useNewUrlParser:true,
           useUnifiedTopology:true
        })
        console.log('MongoDb Connected Successfully');
    } catch (error) {
         console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
}

module.exports = Dbconnection;