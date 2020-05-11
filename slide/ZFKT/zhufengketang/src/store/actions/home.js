// 导出 actionCreator 对象
// actionCreator 返回一个 action 对象的函数
// action 是一个带有 type 字段的对象 它是由 dispatch 派发的, 告诉 reducer 如何修改状态, 并且携带修改状态时必要的参数
// 使用 redux-thunk 后可以允许 actionCreator 函数返回一个函数, 这个函数将会接收 两个参数: dispathch 和 getState; 相当于把 dispatch 和 getState 的使用权交给了这个函数

import * as Types from '../action-types'

import { getSliders } from '../../api/home'

let actions = {
    setSliders () {
        return (dispatch,getState) => {
            // 1. 修改轮播图的 loading 变为 true
            dispatch({
                type: Types.GET_SLIDERS,
            })
            // 2. 通过 ajax 请求轮播图的数据
            dispatch({
                type: Types.GET_SLIDERS_SUCCESS,
                payload: getSliders()
            })
        }
    }
}

export default actions