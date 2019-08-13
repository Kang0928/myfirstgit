import axios from './config'

// 请求轮播图片
export let getSliders = () => axios.get('/api/sliders')

// 请求热门图书
export let getHotBook = () => axios.get('/api/hot')

// 请求列表页所有图书
export let getListBook = () => axios.get('/api/listBooks')

// 删除指定图书
export let removeListBook = (bookid) => axios.get('/api/removeListBooks?bookid='+bookid)

// 收藏指定图书
export let collectbook = (collectbook) => axios.post('/api/collectbook',collectbook)

// 详情回填页面
export let xiangqingbook = (bookid) => axios.get('/api/xiangqingbook?bookid='+bookid)

// 编辑详情页信息
export let editbook = (bookdata) => axios.post('/api/editbook',bookdata)

// 请求收藏列表
export let  getcollectbooks = () => axios.get('/api/getcollectbooks')

// 删除收藏图书
export let delcollectbooks = (bookid) => axios.get('/api/delcollectBooks?bookid='+bookid)

// 新增图书信息
export let addnewBook = (newbookdata) => axios.post('/api/addbook',newbookdata)