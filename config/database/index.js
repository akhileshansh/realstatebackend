const mongoose = require("mongoose");
const env = require("dotenv").config();
const URL = process.env.MONGO_URL;

const database = async () => {
    try {
        await mongoose.connect(URL);
        console.log(`Server Connected Successfully`);
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
    }
};

module.exports=database
