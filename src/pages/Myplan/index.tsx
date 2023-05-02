import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { NavBar, Dialog, Toast, Space, Input, TextArea } from 'antd-mobile'
import { AddOutline } from 'antd-mobile-icons'
import { Modal, Button, Form, Alert } from 'antd'
import { AlertOutlined } from '@ant-design/icons'
import './index.scss'
import '../../components/nav.scss'
import { http } from '../../utils'
import VideoPopup from './components/VideoPopup.tsx'
import Marquee from 'react-fast-marquee'
const Myplan = () => {
  const navigate = useNavigate()

  //拿到路由id
  const [params] = useSearchParams()
  const id = params.get('id')
  const authorid = params.get('authorid')
  let nowcount = params.get('nowcount')
  const [videoVisible, setVideoVisible] = useState(false)

  const [Nowcount, setNowcount] = useState(parseInt(nowcount) + 1)
  const [count, setCount] = useState(0)
  let [contentarry, setContentArry] = useState([])

  const [initpoetry, setInitPoetry] = useState({
    id: null,
    title: '',
    author: '',
    content: '',
    dynasty: '',
    annotation: '',
    intro: '',
    translation: '',
  })
  useEffect(() => {
    const getpoetryinfo = async () => {
      const res = await http.get(`/poetry/getPoetryById?id=${id}`)
      console.log(res, 'res')
      setInitPoetry(res.data.data.poetry)
      //数据处理
      let poetrycontent = res.data.data.poetry.content
        .replace(/\r\n/g, '')
        .split('。')
      poetrycontent.pop(poetrycontent.length)
      setContentArry(poetrycontent)
    }
    getpoetryinfo()
  }, [id])

  const [form] = Form.useForm()

  const endtime = async () => {
    const endtime = Date.now()
    const time = (endtime - window.localStorage.getItem('time')) / 1000
    //发请求
    const params = {
      userId: window.localStorage.getItem('id'),
      authorId: authorid,
      preCount: nowcount,
      addCount: count,
      spendTime: time,
    }
    await http.post(`/recite/addCount`, params)
    window.localStorage.removeItem('time')
    navigate('/recitepoetry')
  }

  const right = (
    <Space style={{ '--gap': '16px' }}>
      <div onClick={() => setVideoVisible(true)} style={{ fontSize: 15 }}>
        <AlertOutlined />
      </div>
      <div onClick={endtime} style={{ fontSize: 15 }}>
        结束
      </div>
    </Space>
  )

  const onFinish = (values: any) => {
    console.log(values)
    console.log(contentarry)
    //判断是否正确
    const contentcheck = () => {
      for (let index in values) {
        if (values[index] !== contentarry[index]) {
          return false
        }
      }
      return true
    }
    const getrightcheck = async () => {
      setNowcount(Nowcount + 1)
      const res = await http.get(
        `/recite/nextPoetry?authorId=${authorid}&count=${Nowcount}`
      )

      setInitPoetry(res.data.data.poetry)
      let poetrycontent = res.data.data.poetry.content
        .replace(/\r\n/g, '')
        .split('。')
      poetrycontent.pop(poetrycontent.length)
      setContentArry(poetrycontent)
      setCount(count + 1)
      //清空input里的数据
      form.resetFields()
    }
    if (contentcheck()) {
      //正确
      Toast.show({
        icon: 'success',
        content: '恭喜你答对了',
      })
      getrightcheck()
    } else {
      Toast.show({
        icon: 'fail',
        content: '回答错了，再试一次',
      })
    }
  }
  return (
    <div>
      <NavBar className="nav" back={null} right={right}>
        背诗测试
      </NavBar>
      <Alert
        className="alert"
        message="在下方的输入框中输入诗句并提交检查，答案和退出按钮在右上角哦，注意句子间的逗号"
        type="warning"
        showIcon
        closable
      />

      <div className="poetry-content">
        <div className="title5">{initpoetry.title}</div>
        <div className="author">
          {'[' + initpoetry.dynasty + ']' + initpoetry.author}
        </div>
        <Form name="form" onFinish={onFinish} form={form}>
          {contentarry.map((item, index) => {
            if (index % 2 == 0) {
              return (
                <div key={index} className="content">
                  {item}
                  <Form.Item
                    name={index + 1}
                    rules={[{ required: true, message: '请输入诗句' }]}>
                    <TextArea
                      className="content-input"
                      autoSize={{ minRows: 1, maxRows: 3 }}
                    />
                  </Form.Item>
                </div>
              )
            } else {
              return null
            }
          })}
          <Form.Item>
            <Button className="end-bottom" type="primary" htmlType="submit">
              检查
            </Button>
          </Form.Item>
        </Form>
      </div>

      <VideoPopup
        videoVisible={videoVisible}
        setVideoVisible={setVideoVisible}
        initpoetry={initpoetry}
      />
    </div>
  )
}
export default Myplan
