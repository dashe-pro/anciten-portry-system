import React from 'react'
import './index.scss'
import { useStore } from '../../store'
import Apptabbar from '../../components/app-tabbar.tsx'
import { getToken, setToken } from '../../utils/index.js'
import { useNavigate } from 'react-router-dom'
import { Avatar, Card } from 'antd'
import TokenUser from './components/tokenUser.tsx'
import { List, Switch } from 'antd-mobile'
import {
  UnorderedListOutline,
  PayCircleOutline,
  SetOutline,
} from 'antd-mobile-icons'
const { Meta } = Card

const My = () => {
  const { loginStore } = useStore()
  const isToken = getToken()
  const navigate = useNavigate()
  const gotoLoginPage = () => {
    navigate('/login')
  }
  return (
    <div>
      {isToken ? (
        <div>
          <TokenUser />
        </div>
      ) : (
        <div>
          <Card className="card">
            <Meta
              className="user"
              avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
              title="云中诗"
              description={<div onClick={gotoLoginPage}>点击登录</div>}
            />
          </Card>
          <List>
            <List.Item
              prefix={<SetOutline />}
              onClick={() => {
                navigate('/aboutus')
              }}>
              关于我们
            </List.Item>
          </List>
        </div>
      )}

      <Apptabbar />
    </div>
  )
}
export default My
