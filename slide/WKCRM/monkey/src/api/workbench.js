import axios from './config/index'

// 请求轮播图
export let getcurstomersData = () => axios.get('/api/curstomersData')