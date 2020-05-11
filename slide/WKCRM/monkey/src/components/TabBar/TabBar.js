import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

import './index.less'

import monkey from '../../images/monkey.png'
import smallmonkey from '../../images/smallmonkey.png'

export default class TabBar extends Component {
    constructor(props, context) {
        super()
        this.state = {
            isShow: false
        }
    }
    changeShow = () => {
        this.setState({
            isShow : !this.state.isShow
        })
    }
    render() {
        return (<nav className="nav-bar">
            <div className="monkey">
                <img src={monkey} />
            </div>
            <NavLink to="/work">
                <i className="iconfont icon-xingqiu"></i>
                <span>办公</span>
            </NavLink>
            <NavLink to="/project">
                <i className="iconfont icon-react"></i>
                <span>客户管理</span>
            </NavLink>
            <NavLink to="/business">
                <i className="iconfont icon-xiaolian"></i>
                <span>商业智能</span>
            </NavLink>
            <NavLink to="/customer">
                <i className="iconfont icon-xiaolian"></i>
                <span>项目管理</span>
            </NavLink>
            <div className="userMan"
                 onClick={this.changeShow}>
                <img src={smallmonkey} />
                <div className="xia"></div>
            </div>
            {
                        this.state.isShow 
                        ? (<div className="userBox">
                        <Link to="/customer">
                            <i className="iconfont icon-xiaolian"></i>
                            <span>个人中心</span>
                        </Link>
                        <button className="outBtn">退出登录</button>
                        <div>版本号 V9.2.1 190809 </div>
                        <button className="inBtn">进入企业管理后台</button>
                    </div>) 
                        : null
                    }
            
        </nav>)
    }
}