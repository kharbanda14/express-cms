var mongoose = require('mongoose');
var config = require('./config/db');
var hasher = require('./lib/hash');
var db = require('./install/db');

var admin = {
    username:'admin',
    password:'admin',
    first_name :'Aman',
    last_name :'Kharbanda',
    role:'admin',
    email:'amankharbanda34@gmail.com'
}

mongoose.connect(config.mongodb.url);

(async () => {
    console.log('creating admin account')
    try {
        var hashed = await hasher.hashAsync(admin.password);
        admin.password = hashed;
        await db.createAdmin(admin);
        console.log('created admin account successfully')
    } catch (e) {
        console.log(e.message);
    }
    mongoose.disconnect();
})()
