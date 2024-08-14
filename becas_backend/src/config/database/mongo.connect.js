const config = require( './../enviroment' )
const mongoose =  require('mongoose')

console.log(`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`)

mongoose
    .connect(
        `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((res) => {
        console.log('La conexión MongoDB se estableció correctamente...');
    })
    .catch((err) => {
        console.log('Error al conectarse a mongoDB: ', err);
    });


module.exports = mongoose;