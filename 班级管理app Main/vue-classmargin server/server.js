let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

let sliders = require('./database/sliders'); // 导入轮播图的图片数据
let jdb = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
let newsHData = __dirname + '/database/newsHData.json';
let loginData = __dirname + '/database/loginData.json';
let teamData = __dirname + '/database/TeamData.json'; //团队资料库

let app = express();

// 使用中间件
app.use(express.static(__dirname + '/static')); // 静态资源服务
app.use(bodyParser.json()); // 使用bodyParser 处理post请求数据

//轮播图图片接口
app.get('/api/sliders',(req,res)=>{
  res.send(sliders);
});

//获取首页实时热点信息
app.get('/api/newsH',(req,res)=>{
  res.send(jdb(newsHData));
})

// 获取登录数据(校验权限)
app.get('/api/login', (req, res) => {
  let { query } = req;
  console.log(query)
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
    //如果没有该用户
      sendData.code = 1;
      sendData.msg = '用户名不存在!';
      console.log(sendData);
      res.send(sendData);
  }
});

// 注册新数据(校验权限)
app.get('/api/logindata', (req, res) => {
    let { query } = req;
    console.log(query)
    let sendData = {
      code: 0,
      data: null,
      msg: '注册成功'
    };
    //判断login数据中有没有该用户 
    let con = jdb(loginData);
    let isHava = con.find(item => item.name === query.userName);
    if(isHava){
        sendData.code = 1;
        sendData.msg = '该用户名已注册';
        console.log(sendData);
        res.send(sendData);
    }else{
      //如果没有该用户 添加新用户和密码
      let newUser = {
        id: +con[con.length - 1].id + 1,
        imageUrl:query.userImg,
        name:query.userName,
        password:query.userPassword,
        myTeam:[]   // 3/16加入 未验证
      }
      con.push(newUser);
      // 把新用户信息写到数据库中
      fs.writeFileSync(loginData,JSON.stringify(con),'utf8');
      sendData.data = newUser;
      sendData.msg = '新用户注册成功';
      console.log(sendData);
      res.send(sendData);
    }
  });

// 创建团队数据(判断昵称是否重复)
app.get('/api/ctdata', (req, res) => {
  let { query } = req;
  console.log(query)
  let sendData = {
    code: 0,
    data: null,
    msg: '创建成功'
  };
  //判断TeamData数据中有没有该昵称 
  let con = jdb(teamData);
  let isHava = con.find(item => item.teamName === query.teamName);
  if(isHava){
      sendData.code = 1;
      sendData.msg = '该昵称已注册';
      console.log(sendData);
      res.send(sendData);
  }else{
    //如果没有该昵称 添加新团队及资料
    let teamId = +con.length? +con[con.length - 1].teamId + 1:+1;
    let newTeam = {
      teamId: teamId,
      teamName:query.teamName,
      teamType:query.teamType,
      teamFounderId:+query.teamFounderId,
      teamMembersId:[+query.teamFounderId],
      notice:[]
    }
    con.push(newTeam);
    // 把新团队信息写到数据库中
    fs.writeFileSync(teamData,JSON.stringify(con),'utf8');
    sendData.data = newTeam;
    sendData.msg = '新建团队成功';
    console.log(sendData);
    //将新团队id写入创建人信息里myteam里面
    let con2 = jdb(loginData);
    let loginIndex = con2.findIndex(item => +item.id === +query.teamFounderId);
    con2[loginIndex].myTeam.push(teamId);
    fs.writeFileSync(loginData,JSON.stringify(con2),'utf8');
    res.send(sendData);
  }
});

// 通过teamid搜索团队(判断团队是否存在)
app.get('/api/scId', (req, res) => {
  let { query } = req;
  console.log(query)
  let sendData = {
    code: 0,
    data: null,
    msg: '搜索成功'
  };
  //判断TeamData数据中有没有该id,并找到这条数据对应的索引
  let con = jdb(teamData);
  let itemIndex = con.findIndex(item => +item.teamId == +query.searchId);
  if(itemIndex != -1){
    // 如果存在,返回该teamid对应的团队所有数据
      sendData.data = con[itemIndex];
      console.log(sendData);
      res.send(sendData);
  }else{
    //如果没有 则报错返回
      sendData.code = 1;
      sendData.msg = '您搜索的团队id不存在,请重新输入';
      console.log(sendData);
      res.send(sendData);
  }
});

// 加入团队
app.get('/api/jtdata', (req,res) => {
  let con1 = jdb(teamData);
  let con2 = jdb(loginData);
  let { query } = req;
  console.log(query)
  let sendData = {
    code:0,
    data1:null,
    data2:null,
    msg:'加入团队成功'
  }
  // 通过teamId找到指定团队 将userId加入
  let teamIndex = con1.findIndex(item => +item.teamId === +query.joinTeamId);
  if(teamIndex != -1){
      let isOnTeam = con1[teamIndex].teamMembersId.indexOf(query.userId);
      if(isOnTeam == -1){
        con1[teamIndex].teamMembersId.push(query.userId);
      fs.writeFileSync(teamData, JSON.stringify(con1), 'utf8');
      sendData.data1 = con1[teamIndex];
      }else{
      sendData.code = 1;
      sendData.msg = '您已在该团队!请勿重复操作!';
      console.log(sendData);
      res.send(sendData);
      return;
      }
  }else{
      sendData.code = 1;
      sendData.msg = '该团队1信息有误,加入失败';
      console.log(sendData);
      res.send(sendData);
      return;
  }
  // 通过userId找到指定团队 将teamId加入
  let userIndex = con2.findIndex(item => +item.id === +query.userId); 
  if(userIndex != -1){
    con2[userIndex].myTeam.push(query.joinTeamId);
    fs.writeFileSync(loginData, JSON.stringify(con2), 'utf8');
    sendData.data2 = con2[userIndex];
}else{
    sendData.code = 1;
    sendData.msg = '该团队2信息有误,加入失败';
    console.log(sendData);
    res.send(sendData);
    return;
}
  console.log(sendData);
  res.send(sendData);
})

// 通过用户id找所在团队
app.get('/api/getMyteamData', (req, res) => {
  let { query } = req;
  console.log(query)
  let sendData = {
    code: 0,
    data: [],
    msg: '查询成功'
  };
  //通过用户id找到该用户所在的团队id
  let con1 = jdb(loginData);
  let con2 = jdb(teamData);
  let isHava = con1.find(item => +item.id === +query.userId);
  let userTeamId = isHava.myTeam;
  console.log(userTeamId);
  if(userTeamId.length){
    //遍历团队id数组 通过团队id找到该团队
  userTeamId.forEach(function(a,index,teamId){
    let teamdata = con2.find(item => +item.teamId === +a);
    sendData.data[index] = teamdata;
  });
  console.log(sendData);
  res.send(sendData);
  }else{
    sendData.code = 1;
    sendData.msg = "没有加入团队";
    console.log(sendData);
    res.send(sendData);
  }
});
// 通过用户id找好友信息
app.get('/api/getMyFriendsData', (req, res) => {
  let { query } = req;
  console.log(query)
  let sendData = {
    code: 0,
    data: [],
    msg: '查询成功'
  };
  //通过用户id找到该用户好友的id
  let con = jdb(loginData);
  let isHava = con.find(item => +item.id === +query.userId);
  let userFrendsId = isHava.myFriends;
  console.log(userFrendsId);
  if(userFrendsId.length){
    //遍历好友id数组 通过好友id找到每一个好友
    userFrendsId.forEach(function(a,index,userFrendsId){
    let friendsdata = con.find(item => +item.id === +a);
    sendData.data[index] = friendsdata;
    });
    console.log(sendData);
    res.send(sendData);
  }else{
    sendData.code = 1;
    sendData.msg = "没有添加好友";
    console.log(sendData);
    res.send(sendData);
  }
});

// 发送通知(向团队数据中添加)
app.get('/api/getNewNotice', (req, res) => {
  let { query } = req;
  console.log(query)
  let sendData = {
    code: 0,
    data: null,
    msg: '发布成功'
  };
  let con = jdb(teamData);
  // 通过teamId找到指定团队 将新通知加入
  let teamIndex = con.findIndex(item => +item.teamId === +query.teamId);
  let noticeId = +con[teamIndex].notice.length?+con[teamIndex].notice[con[teamIndex].notice.length-1].noticeId+1:+1;
  let newNotice = {
    noticeId:noticeId,  
    textContent: query.textContent,
    thisTime: query.thisTime,
    sortTime: Date.parse(new Date()),
    deadLine: query.deadLine,
    isReceipt: query.isReceipt, 
    isReceived:false,
    notCompleted:[],
    completed:[],
    comment:[]
  }
  con[teamIndex].notice.push(newNotice);
  fs.writeFileSync(teamData, JSON.stringify(con), 'utf8');
  sendData.data = con[teamIndex].notice;
  console.log(sendData);
  res.send(sendData);
});

// 通过用户id找所在团队的通知
app.get('/api/getNoticeData', (req, res) => {
  let { query } = req;
  console.log(query)
  let sendData = {
    code: 0,
    data: [],
    msg: '查询通知成功'
  };
  //通过用户id找到该用户所在的团队id
  let con1 = jdb(loginData);
  let con2 = jdb(teamData);
  let isHava = con1.find(item => +item.id === +query.userId);
  let userTeamId = isHava.myTeam;
  if(userTeamId.length){
    //遍历团队id数组 通过团队id找到该团队
    userTeamId.forEach(function(a,index,teamId){
    let teamdata = con2.find(item => +item.teamId === +a);
    console.log(1);
    //判断该团队中是否有通知
    if(teamdata.notice.length){
      //该团队中有通知 *遍历存储每一个通知信息*
      teamdata.notice.forEach(function(noticeItem,noticeIndex,thisNotice){
        console.log(2);
        noticeItem.sortTime=noticeItem.sortTime;
        noticeItem.teamName=teamdata.teamName;
        noticeItem.teamId=teamdata.teamId;
        noticeItem.teamMembersId=teamdata.teamMembersId;
        sendData.data[sendData.data.length?sendData.data.length:0]=noticeItem;
      })
    }
  });
  if(sendData.data.length){
    console.log(sendData);
    res.send(sendData);
  }else{
    sendData.code = 1;
    sendData.msg = "暂无通知";
    console.log(sendData);
    res.send(sendData);
  }
  }else{
    sendData.code = 2;
    sendData.msg = "您还未加入团队";
    console.log(sendData);
    res.send(sendData);
  }
});

// 修改通知信息中isReceived和notCompleted状态 (通过团队id和通知id和userid)
app.get('/api/changeIsReceived', (req, res) => {
  let { query } = req;
  console.log(query)
  let sendData = {
    code: 0,
    data: null,
    msg: 'isReceived和notCompleted状态修改成功'
  };
  let con = jdb(teamData);
  // 通过teamId找到指定团队
  let teamIndex = con.findIndex(item => +item.teamId === +query.teamId);
  // 通过teamIndex找到指定团队的指定通知
  let noticeIndex = con[teamIndex].notice.findIndex(item => +item.noticeId === +query.noticeId);
  // 修改 isReceived→true 和 notCompleted→true 状态
  con[teamIndex].notice[noticeIndex].isReceived = true;
  con[teamIndex].notice[noticeIndex].notCompleted.push(+query.userId);
  fs.writeFileSync(teamData, JSON.stringify(con), 'utf8');
  sendData.data = {
    isReceived:con[teamIndex].notice[noticeIndex].isReceived,
    notCompleted:con[teamIndex].notice[noticeIndex].notCompleted
  };
  console.log(sendData);
  res.send(sendData);
});

// 添加评论
app.get('/api/changeComment', (req, res) => {
  let { query } = req;
  console.log(query)
  let sendData = {
    code: 0,
    data: null,
    msg: '新评论添加成功'
  };
  let con = jdb(teamData);
  // 通过teamId找到指定团队
  let teamIndex = con.findIndex(item => +item.teamId === +query.teamId);
  // 通过teamIndex找到指定团队的指定通知
  let noticeIndex = con[teamIndex].notice.findIndex(item => +item.noticeId === +query.noticeId);
  // 添加新评论
  let commentId = 1;
  if(con[teamIndex].notice[noticeIndex].comment.length){
    commentId = con[teamIndex].notice[noticeIndex].comment[con[teamIndex].notice[noticeIndex].comment.length-1].commentId+1;
  }
  let newComment = {
    commentId:commentId, // 评论id
    userId:+query.userId, // 评论人id
    userName:+query.userName, // 评论人昵称
    commentValue:query.commentValue //评论内容
  }
  con[teamIndex].notice[noticeIndex].comment.push(newComment);
  fs.writeFileSync(teamData, JSON.stringify(con), 'utf8');
  sendData.data = con[teamIndex].notice[noticeIndex].comment;
  console.log(sendData);
  res.send(sendData);
});

//ChangeNotCompeted
app.get('/api/ChangeNotCompeted', (req, res) => {
  let { query } = req;
  console.log(query)
  let sendData = {
    code: 0,
    data: null,
    msg: 'completed和notCompleted状态修改成功'
  };
  let con = jdb(teamData);
  // 通过teamId找到指定团队
  let teamIndex = con.findIndex(item => +item.teamId === +query.teamId);
  // 通过teamIndex找到指定团队的指定通知
  let noticeIndex = con[teamIndex].notice.findIndex(item => +item.noticeId === +query.noticeId);
  // 将未完成里的userId删除 向完成里添加userId
  let Inx = con[teamIndex].notice[noticeIndex].notCompleted.findIndex(item=>+item === +query.userId);
  con[teamIndex].notice[noticeIndex].notCompleted.splice(Inx,1);
  con[teamIndex].notice[noticeIndex].completed.push(+query.userId);
  fs.writeFileSync(teamData, JSON.stringify(con), 'utf8');
  sendData.data = {
    isReceived:con[teamIndex].notice[noticeIndex].notCompleted,
    notCompleted:con[teamIndex].notice[noticeIndex].completed
  };
  console.log(sendData);
  res.send(sendData);
});

app.listen(8001, () => console.log('班级管理app port 8001 is on'));