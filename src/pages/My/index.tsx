import React from 'react'
import { useStore } from '../../store'
import Apptabbar from '../../components/app-tabbar.tsx'
const My = () => {
  const { loginStore } = useStore()
  return (
    <div>
      my{loginStore.count}
      <Apptabbar />
    </div>
  )
}
export default My
