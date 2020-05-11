import React,{ Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './index.less'

export default class WorkBar extends Component{
    render () {
        return (<div>
            <nav className="nav-main">
            <div className="nav-top">
                <div className="kscj">快速创建&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&gt;</div>
            </div>
            <NavLink to="/workbench">
                <i className="iconfont icon-xingqiu"></i>
                <span>工作台</span>
            </NavLink>
            <NavLink to="/schedule">
                <i className="iconfont icon-react"></i>
                <span>日程</span>
            </NavLink>
            <NavLink to="/task">
                <i className="iconfont icon-xiaolian"></i>
                <span>任务</span>
            </NavLink>
            <NavLink to="/notice">
                <i className="iconfont icon-xiaolian"></i>
                <span>公告</span>
            </NavLink>
            <NavLink to="/journal">
                <i className="iconfont icon-react"></i>
                <span>日志</span>
            </NavLink>
            <NavLink to="/approval">
                <i className="iconfont icon-xiaolian"></i>
                <span>审批</span>
            </NavLink>
            <NavLink to="/mailList">
                <i className="iconfont icon-xiaolian"></i>
                <span>通讯录</span>
            </NavLink>
            </nav>
        </div>)
    }
}