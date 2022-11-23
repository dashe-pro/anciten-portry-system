import React from 'react'
import { Swiper } from 'antd-mobile'

const TopSwiper = () => {
  // interface imgType{{}
  //   key:Number,
  //   title:String,
  //   src:String

  // }
  const items = [
    {
      key: 1,
      title: '1',
      src: 'https://tse1-mm.cn.bing.net/th/id/OET.55ce12d34b974320b4d8415360de961d?w=272&h=135&c=7&rs=1&o=5&dpr=1.3&pid=1.9',
    },
    {
      key: 2,
      title: '2',
      src: 'https://tse1-mm.cn.bing.net/th/id/OET.dcd5e4f4fed24558a2eea02a217a2672?w=272&h=135&c=7&rs=1&o=5&dpr=1.3&pid=1.9',
    },
    {
      key: 3,
      title: '3',
      src: 'https://tse1-mm.cn.bing.net/th/id/OET.7dfe34ac5e97485fac73091e1666cc65?w=272&h=135&c=7&rs=1&o=5&dpr=1.3&pid=1.9',
    },
    {
      key: 4,
      title: '4',
      src: 'https://tse1-mm.cn.bing.net/th/id/OET.55ce12d34b974320b4d8415360de961d?w=272&h=135&c=7&rs=1&o=5&dpr=1.3&pid=1.9',
    },
  ]
  return (
    <div>
      <Swiper loop autoplay>
        {items.map((item) => (
          <Swiper.Item key={item.key}>
            <img style={{ width: '100%' }} src={item.src}></img>
          </Swiper.Item>
        ))}
      </Swiper>
    </div>
  )
}
export default TopSwiper
