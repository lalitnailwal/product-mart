const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
async function insert(user) {
   
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;

    // make a mogoose db call to save user in db
    console.log(`saving user to db`, user)

    return await new User(user).save();

}

module.exports = {
    insert
};