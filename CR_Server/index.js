const express=require('express')
const reglog=require('./regAndlogin')
const cors=require('cors')
const jwt=require('jsonwebtoken')
const service=require('./service')


const app=express()
app.use(express.json())
app.use(cors({origin:'http://localhost:4200'}))

const appMiddleware=(req,res,next)=>{
    console.log("Application Specific Middleware")
    next()
}
app.use(appMiddleware)


app.post('/register',(req,res)=>{
    reglog.register(req.body.acno,req.body.pswd,req.body.uname)
    .then(user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})

app.post('/login',(req,res)=>{
    reglog.login(req.body.acno,req.body.pswd)
    .then(user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
    })
})

const jwttokenmiddleware=((req,res,next)=>{
    const token=req.headers["encrypted-token"]
    const data=jwt.verify(token,'supersecretkey@123')
    if(req.body.acno==data.currentAccountnumber){
        next()
    }
})

app.post('/deposit',jwttokenmiddleware,(req,res)=>{
    service.deposit(req.body.acno,req.body.pswd,req.body.amount)
    .then(user=>{
        res.status(user.statusCode).json(user)
    })
})

app.post('/withdraw',jwttokenmiddleware,(req,res)=>{
    service.withdraw(req.body.acno,req.body.pswd,req.body.amount)
    .then(user=>{
        res.status(user.statusCode).json(user)
    })
})

app.post('/creditCard',jwttokenmiddleware,(req,res)=>{
    service.creditCardRegistration(req.body.acno,req.body.pswd,req.body.UID,req.body.Pan)
    .then(user=>{
        res.status(user.statusCode).json(user)
    })
})

app.post('/transaction',(req,res)=>{
    service.transaction(req.body.acno)
    .then(user=>{
        res.status(user.statusCode).json(user)
    })
})


app.listen(3000,()=>{
    console.log("server listening to port number 3000")
})