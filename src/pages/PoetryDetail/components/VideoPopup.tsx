import React from 'react'
import { Popup, NavBar } from 'antd-mobile'
const VideoPopup = (props) => {
  const { videoVisible, setVideoVisible, name, audio_src } = props
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
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        minHeight: '20vh',
      }}>
      <div>
        <NavBar backArrow={false}>
          <div>
            <div>{name}</div>
            <div>音频资源</div>
          </div>
        </NavBar>
        <audio src={audio_src} controls></audio>
      </div>
    </Popup>
  )
}
export default VideoPopup
