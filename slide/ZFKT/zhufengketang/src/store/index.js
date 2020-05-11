// 导出 store
import { createStore, applyMiddleware } from 'redux'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'

import reducer from './reducer/index'

export default createStore(reducer,applyMiddleware(reduxLogger,reduxThunk,reduxPromise))