let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

let userData = __dirname + '/database/userData.json';
let customerData = __dirname + '/database/customerData.json';
let loginData = __dirname + '/database/loginData.json';
let jdb = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

let app = express();

// 使用中间件
app.use(express.static(__dirname + '/static')); // 静态资源服务
app.use(bodyParser.json()); // 使用bodyParser 处理post请求数据

// 获取用户数据(使用的分页器)
app.get('/api/userdata', (req, res) => {
  let { query } = req;
  let pageNum = query.page * 10;
  let con = jdb(userData).slice(pageNum - 10,pageNum);
  res.send(con);
});

// 获取商户数据(使用的分页器)
app.get('/api/customerdata', (req, res) => {
  let { query } = req;
  let pageNum = query.page * 10;
  let con = jdb(customerData).slice(pageNum - 10,pageNum);
  res.send(con);
});

// 获取登录数据(校验权限)
app.get('/api/logindata', (req, res) => {
  let { query } = req;
  // console.log(query)
  let sendData = {
    code: 0,
    data: null,
    msg: '登录成功'
  };
  //判断login数据中有没有该用户 
  let con = jdb(loginData);
  let isHava = con.find(item => item.name === query.userName);
  if(isHava){
    //如果有就校验密码
    if(isHava.password === query.userPassword){
      //密码正确
      sendData.data = isHava;
      console.log(sendData);
      res.send(sendData);
    }else{
      //密码错误
      sendData.code = 1;
      sendData.msg = '密码错误!请重新输入';
      console.log(sendData);
      res.send(sendData);
    }
  }else{
    //如果没有该用户 添加新用户和密码
    let newUser = {
      id: +con[con.length - 1].id + 1,
      name:query.userName,
      password:query.userPassword,
      manage:false,
      date: "2019.8.30",
      type: "普通管理员"
    }
    con.push(newUser);
    // 把新用户信息写到数据库中
    fs.writeFileSync(loginData,JSON.stringify(con),'utf8');
    sendData.data = newUser;
    sendData.msg = '新用户登录成功';
    console.log(sendData);
    res.send(sendData);
  }
});

// 获取食品类别数据接口
app.get('/api/foodClassdata', (req,res) => {
  let con = jdb(__dirname + '/database/foodClass.json');
  res.send(con);
})

//向商户数据中修改新数据
app.post('/api/editdata', (req,res) => {
  let con = jdb(customerData);
  let d = {
    code:0,
    msg:'修改数据成功'
  }
  // 修改：把客户端指定id的那一条数据直接替换成客户端传递过来的；
  // 找到你要修改的那一条数据的索引
  let itemIndex = con.findIndex(item => +item.id === +req.body.id); 
  // 替换成客户端传过来的数据
  con[itemIndex].name = req.body.name;
  con[itemIndex].address = req.body.address;
  con[itemIndex].phone = req.body.phone;
  con[itemIndex].category = req.body.category;
  con[itemIndex].image_path = req.body.image_path;
  con[itemIndex].description = req.body.type;
  // 把修改完的数据写入数据库
  fs.writeFileSync(customerData, JSON.stringify(con), 'utf8');
  d.data = con;
  res.send(d);
})
//向商户数据中删除数据 /api/delcusdata
app.get('/api/delcusdata', (req,res) => {
  let con = jdb(customerData);
  let d = {
    code:0,
    data:null,
    msg:'删除数据成功'
  }
  // 删除：把客户端指定id的那一条数据删除
  // 找到你要修改的那一条数据的索引
  let itemIndex = con.findIndex(item => +item.id === +req.query.id); 
  // 删除这一项
  con.splice(itemIndex,1);
  // 把修改完的数据写入数据库
  fs.writeFileSync(customerData, JSON.stringify(con), 'utf8');
  d.data = con;
  res.send(d);
})


// 获取食品数据(使用的分页器)
app.get('/api/foodsdata', (req, res) => {
  let { query } = req;
  let pageNum = query.page * 10;
  let con = jdb(__dirname + '/database/foodsData.json').slice(pageNum - 10,pageNum);
  res.send(con);
});
// 提交修改的食品数据 
app.post('/api/editfooddata', (req,res) => {
  console.log(req.body)
  let con = jdb(__dirname + '/database/foodsData.json');
  let d = {
    code:0,
    msg:'修改食品数据成功'
  }
  // 修改：把客户端指定id的那一条数据直接替换成客户端传递过来的；
  // 找到你要修改的那一条数据的索引
  let itemIndex = con.findIndex(item => +item.item_id === +req.body.id); 
  // 替换成客户端传过来的数据
  con[itemIndex].name = req.body.name;
  con[itemIndex].description = req.body.description;
  con[itemIndex].imageUrl = req.body.imageUrl;
  con[itemIndex].specfoods[0].specs_name = req.body.specs_name;
  con[itemIndex].specfoods[0].original_price = req.body.original_price;
  con[itemIndex].specfoods[0].price = req.body.price;
  // 把修改完的数据写入数据库
  fs.writeFileSync(__dirname + '/database/foodsData.json', JSON.stringify(con), 'utf8');
  d.data = con;
  res.send(d);
})
// 食品数据删除接口 /api/delfooddata
app.get('/api/delfooddata', (req,res) => {
  let con = jdb(__dirname + '/database/foodsData.json');
  let d = {
    code:0,
    data:null,
    msg:'删除这项食品数据成功'
  }
  // 删除：把客户端指定id的那一条数据删除
  // 找到你要修改的那一条数据的索引
  let itemIndex = con.findIndex(item => +item.item_id === +req.query.id); 
  // 删除这一项
  con.splice(itemIndex,1);
  // 把修改完的数据写入数据库
  fs.writeFileSync(__dirname + '/database/foodsData.json', JSON.stringify(con), 'utf8');
  d.data = con;
  res.send(d);
})

// 获取订单数据(使用的分页器)
app.get('/api/orderdata', (req, res) => {
  let { query } = req;
  let pageNum = query.page * 10;
  let con = jdb(__dirname + '/database/orderData.json').slice(pageNum - 10,pageNum);
  res.send(con);
});

// 获取订单数据(使用的分页器)
app.get('/api/mandata', (req, res) => {
  let { query } = req;
  let pageNum = query.page * 10;
  let con = jdb(__dirname + '/database/manData.json').slice(pageNum - 10,pageNum);
  res.send(con);
});

// 请求商品添加中的食品种类接口
app.get('/api/foodTypedata', (req,res) => {
  let con = jdb(__dirname + '/database/foodType.json');
  console.log(con)
  res.send(con);
})

// 添加新商铺 /api/addshopdata
app.post('/api/addshopdata', (req,res) => {
  let con = jdb(customerData);
  let d = {
    code:0,
    msg:'添加商铺成功'
  }
  req.body.id = +con[con.length - 1].id + 1
  con.push(req.body);
  fs.writeFileSync(customerData, JSON.stringify(con), 'utf8');
  res.send(d);
})

app.listen(8000, () => console.log('port 8000 is on'));
