import { Card } from 'antd'
import { Form, Input, Button, Checkbox } from 'antd'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { NavBar, Toast } from 'antd-mobile'
import { history, http } from '../../utils/index.js'
const Register = () => {
  const navigate = useNavigate()
  const back = () => {
    history.go(-1)
  }
  const onFinish = async (values) => {
    console.log(values)
    const { username, password } = values
    async function Register() {
      //注册操作
      const res = await http.post('/user/register', { username, password })
    }
    try {
      Register()
      Toast.show({
        content: '注册成功',
      })
      navigate('/login')
    } catch (e) {
      Toast.show({
        content: e.response?.data?.message || '注册失败',
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
              validateStatus="success"
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
              validateStatus="success"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}>
              <Input size="large" placeholder="请输入密码" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                注册
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Register
