import { createStore, combineReducers, applyMiddleware } from 'redux' 
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'

import workbench from './reducer/workbench'

let combineR = combineReducers({
    workbench
})
export default createStore(combineR,applyMiddleware(reduxLogger,reduxThunk,reduxPromise))