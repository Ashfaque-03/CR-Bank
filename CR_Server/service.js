const MongoDB = require('./MongoDB')

const deposit = (acno, pswd, amount) => {
    amount = Number(amount)
    return MongoDB.Customer.findOne({ "AccountNumber": acno, "Password": pswd })
        .then(data => {
            if (data) {
                data.Balance += amount
                data.Transaction.push({
                    "Amount": amount,
                    "Type": "Deposit",
                    "Status": "Success"
                })
                data.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: `Rupees ${amount} successfuly credited to your account ${acno}, Your current account balance is ${data.Balance}`,
                    balance: data.Balance,
                    Transaction: data.Transaction
                }
            }
            else {
                return {
                    statusCode: 400,
                    status: false,
                    message: 'Deposit failed. Please check your password'
                }
            }
        })
}
const withdraw = (acno, pswd, amount) => {
    amount = Number(amount)
    return MongoDB.Customer.findOne({ "AccountNumber": acno, "Password": pswd })
        .then(data => {
            if (data) {
                if (data.Balance < amount) {
                    return {
                        statusCode: 400,
                        status: false,
                        message: 'Insufficient balance'
                    }
                } else {
                    data.Balance -= amount
                    data.Transaction.push({
                        "Amount": amount,
                        "Type": "Withdraw",
                        "Status": "Success"
                    })
                    data.save()
                    return {
                        statusCode: 200,
                        status: true,
                        message: `Rupees ${amount} successfuly withdrawled to your account ${acno}, Your current account balance is ${data.Balance}`,
                        balance: data.Balance,
                        Transaction: data.Transaction

                    }

                }
            } else {
                return {
                    statusCode: 400,
                    status: false,
                    message: 'Withdraw failed. Please check your password'
                }
            }
        })
}

const creditCardRegistration = (acno, pswd, UID, Pan) => {
    return MongoDB.Customer.findOne({"AccountNumber":acno,"Password":pswd })
        .then(data => {
            if (data){
                if (data.Balance > 50000) {
                    if (data.CreditCardBalance == 0) {
                        data.PANno = Pan
                        data.UIDno = UID
                        data.CreditCardBalance = 100000
                        data.save()
                        return {
                            statusCode: 200,
                            status: true,
                            message: 'Credit Card registration successful',
                            CreditCardBalance: data.CreditCardBalance
                        }
                    } else {
                        return {
                            statusCode: 400,
                            status: false,
                            message: 'You already registered'
                        }
                    }
                } else {
                    return {
                        statusCode: 400,
                        status: false,
                        message: 'Sorry you are not eligible for credit card money. Must have more than 50000 balance in your account.'
                    }
                }
            }else{
                return{
                    statuscode:400,
                    status:false.valueOf,
                    message:'Wrong password'
                }
            }
        })
}

const transaction=(acno)=>{
    return MongoDB.Customer.findOne({"AccountNumber":acno})
    .then(result=>{
        if(result){
            return{
                statusCode:200,
                status:true,
                message:'your history',
                Transaction:result.Transaction
            }
        }else{
            return{
                statusCode:400,
                status:false,
                message:'Account not found'
            }
        }
    })

}

module.exports = { deposit, withdraw, creditCardRegistration, transaction }