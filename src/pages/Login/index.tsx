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
    <div className="all">
      <NavBar onBack={back}></NavBar>
      <div className="login">
        <div className="lunarmid1">
          <svg
            className="cloud1"
            width="51"
            height="17"
            viewBox="0 0 51 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.06085 16.4139C0.403807 15.7292 0 14.7997 0 13.7759C0 11.6715 1.70595 9.96553 3.81034 9.96553C3.91536 9.96553 4.01938 9.96979 4.12225 9.97812C4.10977 9.78012 4.10344 9.58046 4.10344 9.37931C4.10344 4.19926 8.3027 0 13.4827 0C17.4568 0 20.8535 2.47152 22.2198 5.96133C22.8408 6.95766 23.9464 7.6207 25.2069 7.6207C25.247 7.6207 25.2869 7.62002 25.3267 7.61869C26.1877 7.24291 27.1385 7.03447 28.1379 7.03447C29.504 7.03447 30.7791 7.42387 31.8584 8.09774C32.9575 7.07439 34.4315 6.44837 36.0517 6.44837C38.7331 6.44837 41.014 8.16288 41.8579 10.5554C43.3447 10.6009 44.7243 11.0722 45.8788 11.8515C46.2043 11.7684 46.5453 11.7243 46.8966 11.7243C49.1628 11.7243 51 13.5614 51 15.8277C51 16.0267 50.9859 16.2224 50.9585 16.4139H1.06085Z"
              fill="#753A32"
            />
            <path
              d="M31.6552 3.2241C31.6552 4.03348 30.999 4.68961 30.1897 4.68961C29.3803 4.68961 28.7241 4.03348 28.7241 3.2241C28.7241 2.41471 29.3803 1.75858 30.1897 1.75858C30.999 1.75858 31.6552 2.41471 31.6552 3.2241Z"
              fill="#753A32"
            />
          </svg>
        </div>
        <div className="bird1" />
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
              <a className="login-checkbox-label" onClick={gotoRegisterPage}>
                还没有账号？前往注册
              </a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Login
