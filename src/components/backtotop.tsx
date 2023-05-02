import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FloatButton } from 'antd'
import './backtotop.scss'

const Backtotop = () => {
  return (
    <div>
      <FloatButton.BackTop visibilityHeight={900} />
    </div>
  )
}
export default Backtotop
