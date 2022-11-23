import React, { useEffect, useState } from 'react'

import {
  Popup,
  NavBar,
  Button,
  SearchBar,
  IndexBar,
  CheckList,
} from 'antd-mobile'
const ClassifyPopup = (props) => {
  const { visible, setVisible } = props
  const [authorSelected, setAuthorSelected] = useState([''])
  const [dynastySelected, setDynastySelected] = useState([''])
  const [typeSelected, setTypeSelected] = useState([''])

  useEffect(() => {
    //请求返回所以有的诗人，朝代，类型
  })
  //模拟数据
  const author = ['李白', '杜甫', '白居易']
  const dynasty = ['汗', '唐', '宋']
  const type = ['写景', '抒情']
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
              setAuthorSelected(value)
            }}>
            {author.map((item) => (
              <CheckList.Item value={item}>{item}</CheckList.Item>
            ))}
          </CheckList>
        </IndexBar.Panel>
        <IndexBar.Panel index="朝代" title="朝代" key="朝代">
          <CheckList
            multiple
            onChange={(value) => {
              setDynastySelected(value)
            }}>
            {dynasty.map((item) => (
              <CheckList.Item value={item}>{item}</CheckList.Item>
            ))}
          </CheckList>
        </IndexBar.Panel>
        <IndexBar.Panel index="类型" title="类型" key="类型">
          <CheckList
            multiple
            onChange={(value) => {
              setTypeSelected(value)
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
