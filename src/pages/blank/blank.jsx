import React, { Component } from 'react'
import Taro from '@tarojs/taro'

class Blank extends Component {
  componentDidShow() {
    setTimeout(() => {
      Taro.switchTab({
        url: '/pages/mine/mine'
      })
    }, 1000)
  }

  render() {
    return (
      <></>
    )
  }
}

export default Blank
