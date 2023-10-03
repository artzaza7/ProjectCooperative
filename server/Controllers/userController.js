const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


async function readUser (req,res){
    const user = await User.find()
    res.json({
        "massage": "All users are shown",
        "data": user,
        "status": res.statusCode
    })
}

async function getAllIncomeByUser(req,res){
    const user = await User.findOne({ "_id": req.params['id'] })
    res.json({
        "massage": "All income(s) are shown",
        "data": user.Income,
        "status": res.statusCode
    })
}

async function deleteIncome(req,res){
    const userId = req.query.userId
    const incomeId = req.query.incomeId
    //const inc = await User.findOne({ "_id": req.params['id'] },)
    const user = await User.updateOne({_id: userId},{$pull: { 'Income' : { _id: incomeId }}})

    res.json({"message" : "Income Deleted",
            "status": res.statusCode
        })
}
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

async function addIncome(req,res) {
        const { money,money_type } = req.body

        const d = new Date();
        let day = weekday[d.getDay()];
        const inc = {
            money: money,
            money_type: money_type,
            createDate: d,
            createDay: day
        }

        const income = await User.updateOne({ "_id": req.params['id']},{ $push: {"Income": inc}})
        res.json({"message" : "Income Added",
            "data": inc,
        "status": res.statusCode,})

}

async function updateIncome(req,res) {
    const { money,money_type } = req.body
    console.log(money)
    const userId = req.query.userId
    const incomeId = req.query.incomeId

    const income = await User.findOneAndUpdate({_id: userId},
        {$set: {"Income.$[income].money": money,
                "Income.$[income].money_type": money_type,
            }
            },
            { 
                arrayFilters: [{"income._id": incomeId}] })
    res.json({
        "message" : "Income Updated",
        "data": {
            "money": money,
            "money_type": money_type,
            "_id": incomeId
        },
        "status": res.statusCode,
    })
}

async function findById(req,res){
    const user = await User.findOne({ "_id": req.params['id'] })
    console.log(req.params['id'])
    res.json({
        "massage": "Show user by id",
        "data": user,
        "status": res.statusCode
    })
}

async function addExpense(req,res){
    const { money,money_type } = req.body
    const d = new Date();
    let day = weekday[d.getDay()];
    const exp = {
        money: money,
        money_type: money_type,
        createDate: new Date(),
        createDay: day
    }

    const expense = await User.updateOne({ "_id": req.params['id']},{ $push: {"Expense": exp}})
    res.json({"message" : "Expense Added",
            "data": exp,
        "status": res.statusCode,
    })
}
async function updateExpense(req,res){
    const { money,money_type } = req.body
    console.log(money)
    const userId = req.query.userId
    const expenseId = req.query.expenseId
    const expense = await User.findOneAndUpdate({ _id: userId},
        {
            $set: {
                "Expense.$[expense].money": money, 
                "Expense.$[expense].money_type": money_type

            }},{ arrayFilters: [{"expense._id": expenseId}] })
    res.json({
        "message" : "Expense Updated",
        "data": {
            "money": money,
            "money_type": money_type,
            "_id": expenseId
        },
        "status": res.statusCode,
    })
}

async function getAllExpenseByUser(req,res){
    const user = await User.findOne({ "_id": req.params['id'] })
    res.json({
        "massage": "All expense(s) are shown",
        "data": user.Expense,
        "status": res.statusCode
    })
}
async function deleteExpense(req,res){
    const userId = req.query.userId
    const expenseId = req.query.expenseId
    //const exp = await User.findOne({ "_id": req.params['id'] },{arrayFilters: [{"Expense._id": expenseId}]})
    const user = await User.updateOne({_id: userId},{$pull: { 'Expense' : { _id: expenseId }}})

    res.json({"message" : "Expense Deleted",
            "status": res.statusCode
        })
}


async function register (req,res) {
    try{
        const { first_name, last_name, email, pwd } = req.body

        //validate input
        if(!(email && pwd && first_name && last_name)){
            res.status(400).json({"message": "All input is required", "status": res.statusCode})
        }

        //Validate if user exist
        const oldUser = await User.findOne({ email })
        if(oldUser){
            return res.status(400).json({"message": "User already exist> Please login", "status": res.statusCode})
        }

        //Encrypt pwd
        encryptedPwd = await bcrypt.hash(pwd,10)

        //Create User
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            pwd: encryptedPwd
        })

        //Create token
        const token = jwt.sign(
            { user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        //save user token
        user.token = token
        user.user_createDate = new Date()
        res.status(201).json({
            "message": "User has been created",
            "data": user, 
            "status": res.statusCode
        })
    }catch(err){
        console.log(err)
    }
}

async function login (req,res) {
    try{
        const { email, pwd } = req.body
        if(!(email && pwd)){
            res.status(400).json({"message": "All input is required", "status": res.statusCode})
        }

        const user = await User.findOne({ email })
        if(user && (await bcrypt.compare(pwd, user.pwd))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )
            
            user.token = token

            res.status(200).json({
                "message": "Logged in",
                "data": user,
                "status": res.statusCode
            })
        }
        res.status(400).json({"message": "Invalid email or password", "status": res.statusCode})
    }catch(err){
        console.log(err)
    }
}


module.exports = { readUser,register,login,findById,addIncome,getAllIncomeByUser,deleteIncome,addExpense,getAllExpenseByUser,deleteExpense,updateIncome,updateExpense }