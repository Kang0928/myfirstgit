import React,{ Component } from 'react'

import { HashRouter, Route, Switch } from 'react-router-dom'
import Work from './container/Work/work'
import Project from './container/Project/project'
import Business from './container/Business/Business'
import Customer from './container/Customer/Customer'

import TabBar from './components/TabBar/TabBar'

export default class App extends Component{
    render () {
        return (<div>
            <HashRouter>
                <div>
                    <Switch>
                    <Route path='/work' component={Work} />
                    <Route path='/project' component={Project} />
                    <Route path='/business' component={Business} />
                    <Route path='/customer' component={Customer} />
                    <Route path='/' component={Work} />
                    </Switch>
                    <TabBar />
                </div>
            </HashRouter>
            
        </div>)
    }
}