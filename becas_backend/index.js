const config = require('./src/config/enviroment/index');
const app =  require('./app');
const inicial = require('./src/controllers/inicial');
var ip = require('ip');


async function main(){

    await require('./src/config/database/mongo.connect');

    await inicial.crear_admin();
    const server = await app.listen(config.PORT);
    console.log(`Server ticket en \x1b[36mhttp://${ip.address()}:${config.PORT}\x1b[0m`);
    console.log(`Server ticket en \x1b[36mhttp://${config.HOST}:${config.PORT}\x1b[0m`);
}
main();