
import axios from './config' // ./config/index.js 中index.js 可以省略（只有叫index才能省）

// 请求首页轮播图片
export let getSliders = () => axios.get('/api/sliders')
// 请求首页实时热点信息
export let getnewsH = () => axios.get('/api/newsH')

// 请求登录数据
export let getLogin = login => axios.get(`/api/login?userName=${login.userName}&userPassword=${login.userPassword}`)

// 请求注册数据
export let getLoginData = login => axios.get(`/api/logindata?userName=${login.userName}&userPassword=${login.userPassword}&userImg=${login.userImg}`)

// 创建团队数据
export let getCTData = CTData => axios.get(`/api/ctdata?teamName=${CTData.teamName}&teamType=${CTData.teamType}&teamFounderId=${CTData.teamFounderId}`)

// 搜索团队(传送团队id 返回搜索结果)
export let searchTeam = StTeam => axios.get(`/api/scId?searchId=${StTeam.searchId}`)

// 加入团队
export let joinTeam = JTData => axios.get(`/api/jtdata?joinTeamId=${JTData.joinTeamId}&userId=${JTData.userId}`)

// 通过用户id找所在团队
export let getMyteamData = userId => axios.get(`/api/getMyteamData?userId=${userId}`)
// 通过用户id找好友信息
export let getMyFriendsData = userId => axios.get(`/api/getMyFriendsData?userId=${userId}`)

// 发送通知
export let getNewNotice = newNotice => axios.get(`/api/getNewNotice?teamId=${newNotice.teamId}&textContent=${newNotice.textContent}&thisTime=${newNotice.thisTime}&deadLine=${newNotice.deadLine}&isReceipt=${newNotice.isReceipt}`)

// 通过用户id找通知信息
export let getNoticeData = userId => axios.get(`/api/getNoticeData?userId=${userId}`)

// 修改通知信息中isReceived和notCompleted状态 (通过团队id和通知id)
export let changeIsReceived = IsReceivedData => axios.get(`/api/changeIsReceived?teamId=${IsReceivedData.teamId}&noticeId=${IsReceivedData.noticeId}&userId=${IsReceivedData.userId}`)

// 添加评论内容
export let changeComment = changeCommentData => axios.get(`/api/changeComment?teamId=${changeCommentData.teamId}&noticeId=${changeCommentData.noticeId}&userId=${changeCommentData.userId}&commentValue=${changeCommentData.commentValue}
&userName=${changeCommentData.userName}`)

// 修改通知信息中 notCompeted 和 competed状态 (通过团队id和通知id)
// 将未完成里的userId删除 向完成里添加userId
export let ChangeNotCompeted = Data => axios.get(`/api/ChangeNotCompeted?teamId=${Data.teamId}&noticeId=${Data.noticeId}&userId=${Data.userId}`)