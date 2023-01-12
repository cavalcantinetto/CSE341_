const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

//this function will connect to a database based on the url that will be provided.
async function connectDb(url) {
    const mongoDb = await mongoose.connect(url)
        .then((response) => {
            db = response;
            if (!db) {
                console.error(error)
            } else {
                console.log("Connected to data Base")
            }
        });
}


module.exports = {
    connectDb
};