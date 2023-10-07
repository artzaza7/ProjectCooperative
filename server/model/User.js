const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    pwd: {type: String, required: true},
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