import React, { useEffect, useState } from 'react'
import { Col, Row, Tabs, Input } from 'antd'

import { Select, Form, Button } from 'antd'
import './commenttool.scss'
import { http } from '../utils/index.js'
import { Toast } from 'antd-mobile'

const Commenttool = (props) => {
  const { objectId, type } = props
  const onFinish = async (values) => {
    console.log(values)

    const params = {
      userId: window.localStorage.getItem('id'),
      objectId: parseInt(objectId),
      type: type,
      content: values.comment,
    }
    console.log(params)

    const res = await http.post('/comment/insertComment', params)

    //刷新页面
    window.location.reload()
    // if (res.data.message == '成功') {
    //   Toast.show({
    //     icon: 'success',
    //     content: '发表成功',
    //   })
    // }
  }
  return (
    <div className="commenttool">
      <Form name="value" autoComplete="off" onFinish={onFinish}>
        <Row>
          <Col span={18}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: '请输入内容',
                },
              ]}
              name="comment">
              <Input
                className="input"
                placeholder="说点什么吧。。。。"
                bordered={false}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item>
              <Button className="buttom" htmlType="submit">
                发送
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
export default Commenttool
