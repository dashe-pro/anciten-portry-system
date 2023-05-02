import React from 'react'
import './index.scss'
import { useStore } from '../../store'
import Apptabbar from '../../components/app-tabbar.tsx'
import { getToken, setToken } from '../../utils/index.js'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Card } from 'antd'
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
          <div className="card">
            <div className="glass">
              <Meta
                className="user"
                avatar={
                  <Avatar src="https://s1.ax1x.com/2023/04/13/ppv8JsO.png" />
                }
                description={
                  <Button onClick={gotoLoginPage} className="login">
                    点击登录
                  </Button>
                }
              />
            </div>
          </div>

          <List className="list">
            <List.Item
              prefix={<SetOutline />}
              onClick={() => {
                navigate('/aboutus')
              }}>
              关于我们
            </List.Item>
          </List>

          <div className="huoshan"></div>
          <div className="shuzhi"></div>
        </div>
      )}

      <Apptabbar />
    </div>
  )
}
export default My
