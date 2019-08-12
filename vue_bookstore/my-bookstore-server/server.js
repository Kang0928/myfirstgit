let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

let bookData = __dirname + '/database/book.json';
let collectData = __dirname + '/database/collect.json';
let sliders = require('./database/sliders'); // 导入轮播图的图片数据
let jdb = (path) => JSON.parse(fs.readFileSync(path,'utf8'));

let app = express();
//使用中间件
app.use(express.static(__dirname + '/static')); // 静态资源服务
app.use(bodyParser.json()); // 使用bodyParser 处理post请求

//轮播图图片接口
app.get('/api/sliders',(req,res)=>{
    res.send(sliders);
});

//热门图书最后四本书接口
app.get('/api/hot',(req,res)=>{
    let con = jdb(bookData);
    let books = con.slice(-4); // 从数组中取出最后四条
    res.send(books);
})

app.listen(8090, () => console.log('port 8090 is on'));