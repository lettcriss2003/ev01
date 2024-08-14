
var express = require('express');
var path = require('path');
var cors = require('cors');

const morgan = require('morgan');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const multer = require('multer');


var app = express();

app.use(express.static(path.join(__dirname,'/')));
app.use(compression());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true }));


mongoose.set('strictQuery', true);

app.use(cors()) 
app.use(logger('dev'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, token"
  );
  next();
});

app.use('', require('./src/routes/index.routes'));
app.use(morgan(':method :url :status - :response-time ms'));
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    error:"RUTA NO ENCONTRADA" //err.message.toString(),
  });
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(500).json({
      error: err.message.toString(),
    });
  
  });


module.exports = app;