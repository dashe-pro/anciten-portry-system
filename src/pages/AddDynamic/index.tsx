import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { history, http } from '../../utils/index.js'
import { CloseOutline, CheckOutline } from 'antd-mobile-icons'
import '../../components/nav.scss'
import { Form, Switch, Input, Upload, Button } from 'antd'
import { PlusOutlined, LockOutlined } from '@ant-design/icons'
import './index.scss'
import { Toast } from 'antd-mobile'

const { TextArea } = Input

const AddDynamic = () => {
  const [check, setCheck] = useState(false)
  const navigator = useNavigate()

  const onFinish = async (value) => {
    const { content, privateFlag } = value
    const params = {
      userId: window.localStorage.getItem('id'),
      content: content,
      privateFlag: privateFlag,
      img: fileList[0].response.data.imageUrl || '',
    }

    const res = await http.post('/community/insertMoment', params)

    if (res.data.message == '发表成功') {
      Toast.show({
        icon: 'success',
        content: '发表成功',
      })
      navigator('/tea')
    }
  }
  const [fileList, setFileList] = useState([])
  // 上传成功回调
  const onUploadChange = ({ fileList }) => {
    setFileList(fileList)
  }
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      Toast.show({
        icon: 'fail',
        content: '不是jpeg或者png格式',
      })
    }
    const isLt2M = file.size / 1024 / 1024 < 4
    if (!isLt2M) {
      Toast.show({
        icon: 'fail',
        content: '图片大于4mb',
      })
    }
    return isJpgOrPng && isLt2M
  }

  return (
    <div>
      <NavBar
        className="nav"
        backArrow={<CloseOutline />}
        onBack={() => history.go(-1)}>
        发表动态
      </NavBar>
      <Form
        name="value"
        style={{
          maxWidth: '100%',
        }}
        autoComplete="off"
        onFinish={onFinish}>
        <Form.Item name="content">
          <TextArea className="text" placeholder="分享新鲜事...." rows={8} />
        </Form.Item>

        <Form.Item name="img">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true}
            action="http://localhost:8088/community/uploadImage"
            fileList={fileList}
            onChange={onUploadChange}
            beforeUpload={beforeUpload}
            maxCount={1}>
            <div style={{ marginTop: 8 }}>
              <PlusOutlined />
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          className="private"
          label={
            <div className="lock">
              <LockOutlined />
              设为私密
            </div>
          }
          name="privateFlag"
          valuePropName="checked"
          wrapperCol={{
            offset: 16,
            span: 20,
          }}>
          <Switch defaultChecked={true} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button className="buttom2" type="primary" htmlType="submit">
            发布动态
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AddDynamic
