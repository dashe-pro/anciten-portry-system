import { Card } from 'antd'
import { useStore } from '../../store'
import { Form, Input, Button, Checkbox } from 'antd'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { NavBar, Toast } from 'antd-mobile'
import { history } from '../../utils/index.js'
const Login = () => {
  const navigate = useNavigate()
  const { loginStore } = useStore()
  const gotoRegisterPage = () => {
    navigate('/register')
  }
  const back = () => {
    navigate('/my')
  }
  const onFinish = async (values) => {
    console.log(values)
    const { username, password } = values
    try {
      await loginStore.login({ username, password })
      Toast.show({
        content: '登录成功',
      })
      navigate('/')
    } catch (e) {
      Toast.show({
        content: e.response?.data?.message || '登录失败',
        duration: 1000,
      })
    }
  }

  return (
    <div>
      <NavBar onBack={back}></NavBar>
      <div className="login">
        <Card className="login-container">
          <Form onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}>
              <Input size="large" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}>
              <Input size="large" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox className="login-checkbox-label">
                我已阅读并同意「用户协议」和「隐私条款」
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                登录
              </Button>
            </Form.Item>
            <Form.Item>
              <a onClick={gotoRegisterPage}>还没有账号？前往注册</a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Login
