// 登录模块
import { makeAutoObservable } from "mobx"
import { http } from '../utils/index.js'
import { setToken, getToken, clearToken } from '../utils'

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  // 登录
  login = async ({ username, password }) => {
    const res = await http.post('/user/login', { username, password })
    console.log(res)
    this.token = res.data.data.token
    setToken(res.data.data.token)
  }
}
export default LoginStore