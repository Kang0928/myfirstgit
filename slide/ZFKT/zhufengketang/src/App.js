import React, { Component } from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'

import Home from './container/Home/Home'
import Lesson from './container/Lesson/Lesson'
import Profile from './container/Profile/Profile'
import TabBar from './components/TabBar/TabBar';

export default class App extends Component {
    render () {
        return (<div>
            <HashRouter>
                <div>
                    <Switch>
                    <Route path='/home' component={Home} ></Route>
                    <Route path='/lesson' component={Lesson} ></Route>
                    <Route path='/profile' component={Profile} ></Route>
                    </Switch>
                    <TabBar/>
                </div>
            </HashRouter>
        </div>)
    }
}