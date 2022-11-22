const mongodb = require('./MongoDB')
const jwt=require('jsonwebtoken')

const register = (acno, pswd, uname) => {
    return mongodb.Customer.findOne({ "AccountNumber":acno})
        .then(data => {
            if (data) {
                return {
                    statusCode: 400,
                    status: false,
                    message: 'Customer already registered'
                }
            }
            else {
                const newCustomer = new mongodb.Customer({
                    "AccountNumber": acno,
                    "CustomerName": uname,
                    "Password": pswd,
                    Balance: 0,
                    Transaction: [],
                    CreditCardBalance:0,
                    PANno:'',
                    UIDno:''
                })
                newCustomer.save()
                return{
                    statusCode:200,
                    status:true,
                    message:'Registration successfull'
                }
            }
        })
}

const login=(acno,pswd)=>{
    return mongodb.Customer.findOne({"AccountNumber":acno,"Password":pswd})
    .then(data=>{
        if(data){
            balance=data.Balance
            currentName=data.CustomerName
            CreditCardBalance=data.CreditCardBalance
            const token=jwt.sign({
                currentAccountnumber:acno,
                Password:pswd
            },'supersecretkey@123')
            return{
                statusCode:200,
                status:true,
                message:'Login Successful',
                token,
                currentName,
                acno,
                balance,
                CreditCardBalance
                
            }
        }
        else{
            return{
                statusCode:400,
                status:false,
                message:'Login failed. Please check your Account number and Password'
            }
        }
    })
}

module.exports={register,login}