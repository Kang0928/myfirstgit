import axios from './config/index'

// 请求轮播图
export let getSliders = () => axios.get('/api/sliders')