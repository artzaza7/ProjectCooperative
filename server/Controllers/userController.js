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
            
            res.status(200).json({
                "message": "Logged in",
                "data": token,
                "status": res.statusCode
            })
        }
        res.status(400).json({"message": "Invalid email or password", "status": res.statusCode})
    }catch(err){
        console.log(err)
    }
}

async function getAllByUser(req,res){
    const user = await User.findOne({ "_id": req.params['id'] })
    res.json({
        "massage": "process complete",
        "data": [
            {
                income: user.Income
            },
            {
                expense: user.Expense
            }
        ],
        "status": res.statusCode
    })
}

async function incomeYearSum(req,res){
    const user = await User.findOne({ "_id": req.query['id'] })
    const income = user.Income
    let sumMonth = [0,0,0,0,0,0,0,0,0,0,0,0]
    console.log(income[0].createDate.getMonth())
    for(let i=0;i<income.length;i++){
        for(let j=0;j<12;j++){
            if(income[i].createDate.getMonth()==j){
                sumMonth[j] = sumMonth[j] + income[i].money
            }
        }
    }
    let sum = 0
    for(let i=0;i<sumMonth.length;i++){
        sum += sumMonth[i]
    }
    console.log(sumMonth)
    console.log(typeof(income[0].money))
    res.json({
        "message": "process complete",
        "data": [{
            sumMonth: sumMonth,
            summary: sum
        }],
        "status": res.statusCode
    })

}
async function expenseYearSum(req,res){
    const user = await User.findOne({ "_id": req.query['id'] })
    const expense = user.Expense
    let sumMonth = [0,0,0,0,0,0,0,0,0,0,0,0]
    console.log(expense[0].createDate.getMonth())
    for(let i=0;i<expense.length;i++){
        for(let j=0;j<12;j++){
            if(expense[i].createDate.getMonth()==j){
                sumMonth[j] = sumMonth[j] + expense[i].money
            }
        }
    }
    let sum = 0
    for(let i=0;i<sumMonth.length;i++){
        sum += sumMonth[i]
    }
    res.json({
        "message": "process complete",
        "data": [{
            sumMonth: sumMonth,
            summary: sum
        }],
        "status": res.statusCode
    })

}
async function incomeMonthSum(req,res){
    const money_type = ["เงินเดือน","งานพิเศษ","โบนัส"]
    const user = await User.findOne({ "_id": req.query['id'] })
    let m = req.params['month']
    let month = parseInt(m)
    month -= 1
    let sum = [0,0,0]
    const income = user.Income
    for(let i=0;i<income.length;i++){
        if(income[i].createDate.getMonth()==month){
            for(let j=0;j<money_type.length;j++){
                if(!income[i].money_type.localeCompare(money_type[j])){
                    sum[j] += income[i].money
                }
            }
            
            // if(!income[i].money_type.localeCompare("เงินเดือน")){
            //     sum[0] += income[i].money
            // }
            // else if(!income[i].money_type.localeCompare("เงินพิเศษ")){
            //     sum[1] += income[i].money
            // }
            // else if(!income[i].money_type.localeCompare("โบนัส")){
            //     sum[2] += income[i].money
            // }


        }
    }
    let summary = 0
    for(let i=0;i<sum.length;i++){
        summary += sum[i]
    }
    //console.log(income[0].createDate.getMonth())
    //console.log(typeof(month))
    //console.log(sum)
    res.json({
        "message": "process complete",
        "data": {
            sumType: sum,
            summary: summary
        },
        "status": res.statusCode
    })
}
async function expenseMonthSum(req,res){
    const money_type = ["ค่าอาหาร","ค่าเดินทาง","ค่าที่พัก","หนี้","ความสุข","ค่าของใช้"]
    const user = await User.findOne({ "_id": req.query['id'] })
    let m = req.params['month']
    let month = parseInt(m)
    month -= 1
    let sum = [0,0,0,0,0,0]
    const expense = user.Expense
    for(let i=0;i<expense.length;i++){
        if(expense[i].createDate.getMonth()==month){
            for(let j=0;j<money_type.length;j++){
                if(!expense[i].money_type.localeCompare(money_type[j])){
                    sum[j] += expense[i].money
                }
            }


        }
    }
    let summary = 0
    for(let i=0;i<sum.length;i++){
        summary += sum[i]
    }
    //console.log(income[0].createDate.getMonth())
    //console.log(typeof(month))
    //console.log(sum)
    res.json({
        "message": "process complete",
        "data": {
            sumType: sum,
            summary: summary
        },
        "status": res.statusCode
    })
}

async function getIncAndExpByMonth(req,res){
    const inc_type = ["เงินเดือน","เงินพิเศษ","โบนัส"]
    const exp_type = ["ค่าอาหาร","ค่าเดินทาง","ค่าที่พัก","หนี้","ความสุข","ค่าของใช้"]
    const user = await User.findOne({ "_id": req.query['id'] })
    let m = req.params['month']
    let month = parseInt(m)
    month -= 1
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    let inc = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
    //Income
    const income = user.Income
    for(let i=0;i<income.length;i++){
        if(income[i].createDate.getMonth()==month){
            for(let j=0;j<inc.length;j++){
                if(income[i].createDate.getDay()==j){
                    for(let k=0;k<inc_type.length;k++){
                        if(!income[i].money_type.localeCompare(inc_type[k])){
                            inc[j][k] += income[i].money
                        }
                    }
                }
            }
        }
    }
    let exp = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
    const expense = user.Expense
    for(let i=0;i<expense.length;i++){
        if(expense[i].createDate.getMonth()==month){
            for(let j=0;j<exp.length;j++){
                if(expense[i].createDate.getDay()==j){
                    for(let k=0;k<exp_type.length;k++){
                        if(!expense[i].money_type.localeCompare(exp_type[k])){
                            exp[j][k] += expense[i].money
                        }
                    }
                }
            }
        }
    }
    //console.log(inc)
    res.json({
        "message": "process complete",
        "data":{
            month: months[month],
            sunday: {
                Income: inc[0],
                Expense: exp[0]
            },
            monday: {
                Income: inc[1],
                Expense: exp[1]
            },
            tuesday: {
                Income: inc[2],
                Expense: exp[2]
            },
            wednesday: {
                Income: inc[3],
                Expense: exp[3]
            },
            thursday: {
                Income: inc[4],
                Expense: exp[4]
            },
            friday: {
                Income: inc[5],
                Expense: exp[5]
            },
            saturday: {
                Income: inc[6],
                Expense: exp[6]
            },
        },
        "status": res.statusCode
    })
}
async function getByUserAndInc(req,res){
    try {
        const userId = req.query['userId']
        const incomeId = req.query['incomeId']

        const user = await User.findOne({_id: userId})
        let income = user.Income
        let inc
        console.log(income[0]._id.toString())
        console.log(incomeId)
        for(let i=0;i<user.Income.length;i++){
            if(!income[i]._id.toString().localeCompare(incomeId)){
                inc = income[i]
            }
        }
        res.json({
            "message": "process complete",
            "data": inc,
            "status": res.statusCode
        })
    } catch (error) {
        console.log(error)
    }
}
async function getByUserAndExp(req,res){
    try {
        const userId = req.query['userId']
        const expenseId = req.query['expenseId']

        const user = await User.findOne({_id: userId})
        let expense = user.Expense
        let exp
        // console.log(expense[0]._id.toString())
        // console.log(expenseId)
        for(let i=0;i<user.Income.length;i++){
            if(!expense[i]._id.toString().localeCompare(expenseId)){
                exp = expense[i]
            }
        }
        res.json({
            "message": "process complete",
            "data": exp,
            "status": res.statusCode
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { 
    readUser,
    register,
    login,
    findById,
    addIncome,
    getAllIncomeByUser,
    deleteIncome,
    addExpense,
    getAllExpenseByUser,
    deleteExpense,
    updateIncome,
    updateExpense,
    getAllByUser,
    incomeYearSum,
    expenseYearSum,
    incomeMonthSum,
    expenseMonthSum,
    getIncAndExpByMonth,
    getByUserAndInc,
    getByUserAndExp
 }