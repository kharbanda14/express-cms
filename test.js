const news = require('./models/newsletter_model');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodecms');
news.subscribeUser('test@mail.com').then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});