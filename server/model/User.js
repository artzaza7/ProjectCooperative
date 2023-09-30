const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {type: String, default: null},
    last_name: {type: String, default: null},
    email: {type: String, unique: true},
    pwd: {type: String},
    token: {type: String},
    Expense: [
        {
            money: {type: Number},
            exp_type: String,
            createDate: {type: Date}
        }
    ],
    Income: [
        {
            money: {type: Number},
            createDate: {type: Date}
        }
    ],
    user_createDate: {type: Date}
})

module.exports = mongoose.model('user',userSchema)