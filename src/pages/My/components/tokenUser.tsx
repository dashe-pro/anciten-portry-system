import React from 'react'
import './tokenUser.scss'
import { useStore } from '../../../store'
import { Avatar, Button, Card } from 'antd'
import { List, Switch, Toast } from 'antd-mobile'
import {
  UnorderedListOutline,
  PayCircleOutline,
  SetOutline,
} from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
const { Meta } = Card

const TokenUser = () => {
  const navigate = useNavigate()
  const { loginStore } = useStore()

  const logout = () => {
    loginStore.loginout()
    Toast.show({
      content: '退出成功',
      duration: 1000,
    })
    navigate('/poetry')
  }
  return (
    <div>
      <div className="cardtoken">
        <div className="glasstoken">
          <Meta
            className="usertoken"
            avatar={<Avatar src={window.localStorage.getItem('imgurl')} />}
            title={window.localStorage.getItem('username')}
          />
        </div>
        <div className="monkey" />
      </div>

      <List className="list">
        <List.Item
          prefix={<UnorderedListOutline />}
          onClick={() => {
            navigate('/mycollect')
          }}>
          我的收藏
        </List.Item>
        <List.Item
          prefix={<PayCircleOutline />}
          onClick={() => {
            navigate('/mycomments')
          }}>
          我的评论
        </List.Item>
        <List.Item
          prefix={<SetOutline />}
          onClick={() => {
            navigate('/aboutus')
          }}>
          关于我们
        </List.Item>
      </List>
      <Button className="logout" onClick={logout}>
        退出登录
      </Button>
    </div>
  )
}

export default TokenUser
