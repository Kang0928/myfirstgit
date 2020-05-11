import * as TYPES from '../action-types'

let initHomeState = {
    currentLesson: '1', // 用于筛选标识符
    sliders: {
        loading: false,
        list: []
    }
}

export default function home(state = initHomeState,action){
    switch (action.type) {
        case TYPES.SET_CURRENT_LESSON:
            return {
                ...state,
                currentLesson: action.lesson
            }
        case TYPES.GET_SLIDERS:
            return {
                ...state,
                sliders: {
                    ...state.sliders,
                    loading: true
                }
            }
        case TYPES.GET_SLIDERS_SUCCESS:
            return {
                ...state,
                sliders: {
                    loading: false,
                    list: action.payload
                }
            }
    }
    return state
}