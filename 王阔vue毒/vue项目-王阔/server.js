let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let sliders = require('./database/sliders'); // 导入轮播图图片的数据'
let app = express();
// 使用中间件
app.use(express.static(__dirname)); // 静态资源服务
app.use(bodyParser.json()); // 使用bodyParser 处理post请求数据
// 轮播图图片接口
app.get('/api/sliders', (req, res) => {
    res.send(sliders);
  });
// 购买列表:
app.get('/api/getBuy',(req,res) => {
let jsonData = fs.readFileSync(__dirname + '/database/buy.json','utf8');
res.send(jsonData)
})
// 瀑布流图片
app.get('/api/getpull',(req,res) => {
  let jsonData = fs.readFileSync(__dirname + '/database/pull.json','utf8');
  res.send(jsonData)
  })
// 添加收藏：
app.get("/api/collectList",(req,res) => {
  let { id } = req.query;
  let jsonData = JSON.parse(fs.readFileSync(__dirname + '/database/buy.json','utf8')); 
  let jsonCollect = JSON.parse(fs.readFileSync(__dirname + '/database/collect.json','utf8'));
  let item = jsonData.find(item => +item.id === +id ); 
  jsonCollect.push(item)
  fs.writeFileSync(__dirname + '/database/collect.json',JSON.stringify(jsonCollect),'utf8')
  res.send({
    code:0,
    data:null,
    msg:'ok'
  })
})
// 渲染收藏列表
app.get('/api/getCollectList',(req,res) => {
  let jsonCollect = JSON.parse(fs.readFileSync(__dirname + '/database/collect.json','utf8'));
  res.send(jsonCollect);
})
// 登录校验
app.post('/api/getCheckM',(req,res) => {
  let { userName,pwd } = req.body //取出用户输入的信息
  let jsonData= JSON.parse(fs.readFileSync(__dirname + '/database/massage.json','utf8'));
  if(userName === jsonData[0].userName){
    console.log("ok")
    console.log
    if(pwd === jsonData[0].pwd){
      res.send({
        code:0
      })
    }
  }else{
    res.send({
      code:1
    })
  }
})
app.listen(8003, () => console.log('port 8003 is on'));