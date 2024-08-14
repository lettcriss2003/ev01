const multer = require('multer');


const configuracionBase = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    mongodb: {
        host: process.env.DB_MONGO_HOST ? process.env.DB_MONGO_HOST : 'dbecas',
        database: process.env.DB_MONGO_NAME ? process.env.DB_MONGO_NAME : 'becas_bd',
        port: process.env.DB_MONGO_PORT ? process.env.DB_MONGO_PORT: 27017,
    }
};


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file ,cb ) => {
      cb("",Date.now() + '-' + file.originalname )
    }
  })

const upload = multer({storage : storage});


module.exports={
    ...configuracionBase, upload
}