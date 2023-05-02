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
    window.localStorage.setItem('id', res.data.data.id)
    window.localStorage.setItem('username', res.data.data.username)
    window.localStorage.setItem('imgurl', res.data.data.imgUrl)
  }
  loginout = () => {

    this.token = ''
    clearToken()
    window.localStorage.clear('id')
    window.localStorage.clear('username')
    window.localStorage.clear('imgurl')
  }
}
export default LoginStore