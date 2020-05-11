import * as TYPES from '../action-types'

import { getcurstomersData } from '../../api/workbench'

let actions = {
    setCurstomer(){
        return (dispatch,getState) => {
            dispatch({
                type: TYPES.SET_CURSTOMER,
                payload: getcurstomersData()
            })
        }
    },
    addCurstomer(newdata){
        return {
            type: TYPES.ADD_CURSTOMER,
            newdata
        }
    },
    delCurstomer(id){
        return {
            type: TYPES.DEL_CURSTOMER,
            id
        }
    }
}

export default actions