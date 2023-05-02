import React from 'react'
import { Popup, NavBar, Button } from 'antd-mobile'
import './VideoPupup.scss'
const VideoPopup = (props) => {
  const { videoVisible, setVideoVisible, initpoetry } = props
  let poetrycontent = initpoetry.content.split('。')

  return (
    <Popup
      showCloseButton
      visible={videoVisible}
      onMaskClick={() => {
        setVideoVisible(false)
      }}
      onClose={() => {
        setVideoVisible(false)
      }}
      bodyStyle={{
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        minHeight: '20vh',
      }}>
      <div>
        <NavBar backArrow={false}>
          <div className="title">
            <div>答案提示</div>
          </div>
        </NavBar>
        <div className="poetry-content">
          <div className="title5">{initpoetry.title}</div>
          <div className="author">
            {'[' + initpoetry.dynasty + ']' + initpoetry.author}
          </div>
          {poetrycontent.map((item, index) => (
            <div key={index} className="content">
              {item}
            </div>
          ))}
        </div>
      </div>
    </Popup>
  )
}
export default VideoPopup
