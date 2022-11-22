const mongoose=require('mongoose')

//connection
mongoose.connect('mongodb://localhost:27017/CR-BANK',{
    useNewUrlParser:true
})

// collecion data creation
const Customer=mongoose.model('Customer',{
    AccountNumber:Number,
    CustomerName:String,
    Password:String,
    Balance:Number,
    Transaction:Array,
    CreditCardBalance:Number,
    PANno:String,
    UIDno:String

})

module.exports={Customer}