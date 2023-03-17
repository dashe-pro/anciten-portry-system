import React from 'react'
import './tokenUser.scss'
import { Avatar, Card } from 'antd'
import { List, Switch } from 'antd-mobile'
import {
  UnorderedListOutline,
  PayCircleOutline,
  SetOutline,
} from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
const { Meta } = Card

const TokenUser = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Card className="card">
        <Meta
          className="user"
          avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
          title="云中诗"
          description={<div>已经登录</div>}
        />
      </Card>
      <List>
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
            navigate('/myplan')
          }}>
          我的计划
        </List.Item>
        <List.Item
          prefix={<SetOutline />}
          onClick={() => {
            navigate('/aboutus')
          }}>
          关于我们
        </List.Item>
      </List>
    </div>
  )
}

export default TokenUser
