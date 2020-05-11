import React,{ Component } from 'react'
import { Table, Divider, Tag } from 'antd'
import '../../../../node_modules/antd//dist/antd.css'

import { connect } from 'react-redux'
import actions from '../../../store/actions/workbench'

const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '客户名称',
      dataIndex: 'name',
    },
    {
      title: '客户来源',
      dataIndex: 'address',
    },
    {
      title: '负责人',
      dataIndex: 'person',
    },
    {
      title: '客户级别',
      dataIndex: 'top',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
    },
    {
      title: '操作',
      render: (text, record) => (
        <span>
          <button onClick={(text)=>{console.log(text)}}>删除</button>
        </span>
      )
    }
  ]
  
  // const data = [
  //   {
  //     id:1,
  //     name: "上海满意有限公司",
  //     address: "搜索引擎",
  //     person: "悟空",
  //     top: "B（普通客户）",
  //     remarks: "--"
  //   },
  //   {
  //     id:2,
  //     name: "纹艺医疗整形",
  //     address: "预约上门",
  //     person: "张倩倩",
  //     top: "B（普通客户）",
  //     remarks: "不想使用收费的"
  //   },
  //   {
  //     id:3,
  //     name: "四川特色火锅料理有限公司",
  //     address: "招商资源",
  //     person: "张倩倩",
  //     top: "A（重点客户）",
  //     remarks: "--"
  //   },
  //   {
  //     id:4,
  //     name: "安徽琥服商贸有限公司",
  //     address: "展会资源",
  //     person: "悟空",
  //     top: "B（普通客户）",
  //     remarks: "不想使用收费的"
  //   },
  //   {
  //     id:5,
  //     name: "重庆麻辣香锅餐饮有限公司",
  //     address: "预约上门",
  //     person: "悟空",
  //     top: "A（重点客户）",
  //     remarks: "使用人数较少，测试中"
  //   },
  // ]

class Workbench extends Component{
    componentDidMount(){
      this.props.setCurstomer()
    }

    render () {
        return (<div className="main-contain">
          <h1>客户管理</h1>
            <Table columns={columns} dataSource={this.props.curtomersData} />
        </div>)
    }
}

export default connect(state => ({...state.workbench}),actions)(Workbench)