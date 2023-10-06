const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {type: String, default: null},
    last_name: {type: String, default: null},
    email: {type: String, unique: true},
    pwd: {type: String},
    Expense: [
        {
            money: {type: Number},
            money_type: String,
            createDate: {type: Date},
            createDay: {type: String}
        }
    ],
    Income: [
        {
            money: {type: Number},
            money_type: String,
            createDate: {type: Date},
            createDay: {type: String}
        }
    ],
    user_createDate: {type: Date}
})

module.exports = mongoose.model('user',userSchema)