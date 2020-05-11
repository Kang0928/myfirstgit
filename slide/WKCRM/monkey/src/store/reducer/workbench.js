import * as TYPES from '../action-types'

let workbenchData = {
    curtomersData : []
}

export default function workbench(state = workbenchData,action){
    switch(action.type){
        case TYPES.SET_CURSTOMER : // 获取数据
            return {
                curtomersData: action.payload
            }
        case TYPES.ADD_CURSTOMER : // 添加数据
            return {
                curtomersData:[
                    ...state.curtomersData,
                    {
                        ...action.newdata,
                        id: state.list ? state.list[state.list.length-1].id + 1 : 1,
                    }
                ]
            }
        case TYPES.DEL_CURSTOMER : // 删除数据
            return {
                curtomersData:state.curtomersData.filter(item =>item.id !== action.id)
            }
    }
    return state
}