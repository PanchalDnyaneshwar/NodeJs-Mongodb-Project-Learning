const mongoose = require('mongoose');

 async function connectMangoDB(url){
    return mongoose.connect(url);
 }

 module.exports = {
    connectMangoDB,
 };