import React, { useEffect, useState } from 'react'

import { Popup, NavBar, Button, IndexBar, CheckList } from 'antd-mobile'
import { http } from '../../../utils'

const ClassifyPopup = (props) => {
  const { visible, setVisible } = props
  const [authorSelected, setAuthorSelected] = useState([])
  const [dynastySelected, setDynastySelected] = useState([])
  const [typeSelected, setTypeSelected] = useState([])

  const [dynastys, setDynastys] = useState([])
  const [author, setAuthor] = useState([])

  const getAllDynasty = async () => {
    const res = await http.get('/dynastys/AllDynastys')
    console.log(res, 'res')
    setDynastys(res.data.list)
  }
  const getHotAuthor = async () => {
    const res = await http.get('/author/someAuthor')
    console.log(res, 'res')
    setAuthor(res.data.list)
  }
  useEffect(() => {
    //请求返回所以有的诗人，朝代，类型
    getAllDynasty()
    getHotAuthor()
  }, [])
  const CheckListChange = (value, params) => {
    if (params == 'author') {
      setAuthorSelected(value)
      setDynastySelected([])
      setTypeSelected([])
    } else if (params == 'dynasty') {
      setDynastySelected(value)
      setAuthorSelected([])
      setTypeSelected([])
    } else {
      setTypeSelected(value)
      setAuthorSelected([])
      setDynastySelected([])
    }
  }

  //模拟数据
  const author1 = []
  const dynasty1 = []
  const type = ['诗', '词', '文', '曲', '赋']
  const left = (
    <Button color="primary" fill="outline">
      确定
    </Button>
  )
  return (
    <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false)
      }}
      onClose={() => {
        setVisible(false)
      }}
      showCloseButton
      bodyStyle={{
        height: '85vh',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}>
      <NavBar left={left} backArrow={false}>
        <div>
          <div>选择摘录范围</div>
          <div>支持多选</div>
        </div>
      </NavBar>
      <IndexBar>
        <IndexBar.Panel index="作者" title="作者" key="作者">
          <CheckList
            multiple
            value={authorSelected}
            onChange={(value) => {
              CheckListChange(value, 'author')
            }}>
            {author1.map((item) => (
              <CheckList.Item value={item}>{item}</CheckList.Item>
            ))}
          </CheckList>
        </IndexBar.Panel>
        <IndexBar.Panel index="朝代" title="朝代" key="朝代">
          <CheckList
            multiple
            value={dynastySelected}
            onChange={(value) => {
              CheckListChange(value, 'dynasty')
            }}>
            {dynasty1.map((item) => (
              <CheckList.Item value={item}>{item}</CheckList.Item>
            ))}
          </CheckList>
        </IndexBar.Panel>
        <IndexBar.Panel index="类型" title="类型" key="类型">
          <CheckList
            multiple
            value={typeSelected}
            onChange={(value) => {
              CheckListChange(value, 'type')
            }}>
            {type.map((item) => (
              <CheckList.Item value={item}>{item}</CheckList.Item>
            ))}
          </CheckList>
        </IndexBar.Panel>
      </IndexBar>
    </Popup>
  )
}
export default ClassifyPopup