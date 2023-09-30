const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


async function readUser (req,res){
    const user = await User.find()
    res.json(user)
}

async function getAllIncomeByUser(req,res){
    const user = await User.findOne({ "_id": req.params['id'] })
    res.json(user.Income)
}

async function deleteIncome(req,res){
    const userId = req.query.userId
    const incomeId = req.query.incomeId
    const user = await User.updateOne({_id: userId},{$pull: { 'Income' : { _id: incomeId }}})

    res.json(user)
}

async function addIncome(req,res) {
        const { money } = req.body

        const inc = {
            money: money,
            createDate: new Date()
        }

        const income = await User.updateOne({ "_id": req.params['id']},{ $push: {"Income": inc}})
        res.json(income)
}

async function updateIncome(req,res) {
    const { money } = req.body
    console.log(money)
    const userId = req.query.userId
    const incomeId = req.query.incomeId
    const income = await User.updateOne({ _id: userId},{$set: {Income: { money: money }}},{ arrayFilters: [{"Income._id": incomeId}] })
    res.json(income)
}

async function findById(req,res){
    const user = await User.findOne({ "_id": req.params['id'] })
    console.log(req.params['id'])
    res.json(user)
}

async function addExpense(req,res){
    const { money,exp_type } = req.body

    const exp = {
        money: money,
        exp_type: exp_type,
        createDate: new Date()
    }

    const expense = await User.updateOne({ "_id": req.params['id']},{ $push: {"Expense": exp}})
    res.json(expense)
}
async function updateExpense(req,res){
    const { money,exp_type } = req.body
    console.log(money)
    const userId = req.query.userId
    const expenseId = req.query.expenseId
    const expense = await User.updateOne({ _id: userId},{$set: {Expense: { money: money,exp_type: exp_type }}},{ arrayFilters: [{"Expense._id": expenseId}] })
    res.json(expense)
}

async function getAllExpenseByUser(req,res){
    const user = await User.findOne({ "_id": req.params['id'] })
    res.json(user.Expense)
}
async function deleteExpense(req,res){
    const userId = req.query.userId
    const expenseId = req.query.expenseId
    const user = await User.updateOne({_id: userId},{$pull: { 'Expense' : { _id: expenseId }}})

    res.json(user)
}


async function register (req,res) {
    try{
        const { first_name, last_name, email, pwd } = req.body

        //validate input
        if(!(email && pwd && first_name && last_name)){
            res.status(400).send("All input is required")
        }

        //Validate if user exist
        const oldUser = await User.findOne({ email })
        if(oldUser){
            return res.status(400).send("User already exist> Please login")
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
        res.status(201).json(user)
    }catch(err){
        console.log(err)
    }
}

async function login (req,res) {
    try{
        const { email, pwd } = req.body
        if(!(email && pwd)){
            res.status(400).send("All input is required")
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

            res.status(200).json(user)
        }
        res.status(400).send("Invalid email or password")
    }catch(err){
        console.log(err)
    }
}


module.exports = { readUser,register,login,findById,addIncome,getAllIncomeByUser,deleteIncome,addExpense,getAllExpenseByUser,deleteExpense,updateIncome,updateExpense }