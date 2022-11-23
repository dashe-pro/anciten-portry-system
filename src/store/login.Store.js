// 登录模块
import { makeAutoObservable } from "mobx"
import { http } from '../utils/index.js'

class LoginStore {
  token = ''
  count = 0
  constructor() {
    makeAutoObservable(this)
  }
  // 登录
  login = async ({ mobile, code }) => {
    const res = await http.post('地址', {})
    this.token = res.data.token
  }
}
export default LoginStore