
let express = require('express')
let bodyParser = require('body-parser')

let fs = require('fs')

// 使用 session:
// 1. express-session 中间件
// 2. 配置 express-session 中间件

let app = express()

app.use(express.static(__dirname))

app.use(bodyParser.json())

let data = require('./database/curstomers.json')
app.get('/api/curstomersData',(req,res)=>{
    res.send(data)
})

app.listen(3001, () => console.log('port 3001 is on'))