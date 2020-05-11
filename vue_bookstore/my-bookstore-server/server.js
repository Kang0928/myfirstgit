let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

let sliders = require('./database/sliders'); // 导入轮播图的图片数据

let bookData = __dirname + '/database/book.json';
let collectData = __dirname + '/database/collect.json';

let jdb = (path) => JSON.parse(fs.readFileSync(path,'utf8'));

let app = express();
//使用中间件
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());

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

//列表页所有图书
app.get('/api/listBooks',(req,res)=>{
    res.send(jdb(bookData));
})

// 删除指定图书 /api/removeListBooks
app.get('/api/removeListBooks',(req,res)=>{
    let con = jdb(bookData);
    let bookIndex = con.findIndex(item => +item.bookId === +req.query.bookid)
    con.splice(bookIndex,1);
    fs.writeFileSync(bookData,JSON.stringify(con),'utf8');
    res.send(jdb(bookData));
})

// 收藏指定图书 /api/collectbook
app.post('/api/collectbook', (req,res) => {
    let d = {
        code:0,
        msg:"添加收藏成功"
    }
    let con = jdb(collectData);
    let ishave = con.find(item => +item.bookId === +req.body.bookId)
    console.log(ishave)
    if(ishave){
        d.code = 1;
        d.msg = "您已收藏过该图书啦";
        res.send(d);
    }else{
        con.push(req.body)
        fs.writeFileSync(collectData, JSON.stringify(con), 'utf8');
        res.send(d);
    }
  })

// 详情页回填页面
app.get('/api/xiangqingbook',(req,res)=>{
    let con = jdb(bookData);
    let book = con.find(item => +item.bookId === +req.query.bookid);
    res.send(book);
})

// 详情页的编辑接口
app.post('/api/editbook',(req,res)=>{
    let con = jdb(bookData);
    let bookIndex = con.findIndex(item => +item.bookId === +req.body.bookId);
    con[bookIndex] = req.body;
    fs.writeFileSync(bookData, JSON.stringify(con), 'utf8');
    res.send();
})

// 收藏列表接口
app.get('/api/getcollectbooks',(req,res)=>{
    res.send(jdb(collectData));
})

// 删除指定收藏图书 /api/delcollectBooks
app.get('/api/delcollectBooks',(req,res)=>{
    let con = jdb(collectData);
    let bookIndex = con.findIndex(item => +item.bookId === +req.query.bookid)
    con.splice(bookIndex,1);
    fs.writeFileSync(collectData,JSON.stringify(con),'utf8');
    res.send(jdb(collectData));
})

// /api/addbook
app.post('/api/addbook',(req,res)=>{
    let con = jdb(bookData);
    req.body.bookId = con[con.length - 1].bookId + 1 ;
    con.push(req.body);
    fs.writeFileSync(bookData, JSON.stringify(con), 'utf8');
})

app.listen(8090, () => console.log('port 8090 is on'));