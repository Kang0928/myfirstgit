import React, { Component } from 'react'
import ReactDom from 'react-dom'
import './common/index.less'
import App from './App'

import store from './store'

// 通过 provider 把 store 引入组件树
import { Provider } from 'react-redux'

ReactDom.render(<Provider store={store}>
    <App/>
</Provider>,document.getElementById('root'))