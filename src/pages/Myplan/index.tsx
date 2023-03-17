import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Dialog, Toast, Form, Input } from 'antd-mobile'
import { AddOutline } from 'antd-mobile-icons'
import { Modal } from 'antd'
const Myplan = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [value, setValue] = useState('') //存放输入框内容
  const [isModalOpen, setIsModalOpen] = useState(false)
  const back = () => {
    navigate('/recitepoetry')
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
    const plan_name = form.getFieldValue('plan_name')
    console.log(plan_name, 'plan_name')
    form.resetFields()
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const right = (
    <div onClick={showModal} style={{ fontSize: 15 }}>
      <AddOutline /> 新建
    </div>
  )

  return (
    <div>
      <NavBar onBack={back} right={right}>
        我的背诗计划
      </NavBar>
      <Modal
        closable={false}
        okText="确认"
        cancelText="取消"
        title="新建背诗计划"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div>
          <Form form={form}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="plan_name">
              <Input
                placeholder="请输入计划名称"
                value={value}
                onChange={(val) => {
                  setValue(val)
                }}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}
export default Myplan
