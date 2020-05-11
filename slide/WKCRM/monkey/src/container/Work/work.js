import React,{ Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import WorkBar from './WorkBar/workBar'
import Workbench from './Workbench/workbench'
import Schedule from './Schedule/schedule'
import Task from './Task/task'
import Notice from './Notice/notice'
import Journal from './Journal/journal'
import Approval from './Approval/approval'
import MailList from './MailList/mailList'

export default class Work extends Component{
    render () {
        return (<div className="mainBar">
            <WorkBar />
            <HashRouter>
                <div>
                    <Switch>
                    <Route path='/workbench' component={Workbench} />
                    <Route path='/schedule' component={Schedule} />
                    <Route path='/task' component={Task} />
                    <Route path='/notice' component={Notice} />
                    <Route path='/journal' component={Journal} />
                    <Route path='/approval' component={Approval} />
                    <Route path='/mailList' component={MailList} />
                    </Switch>
                </div>
            </HashRouter>
        </div>)
    }
}