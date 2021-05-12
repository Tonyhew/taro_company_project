import React, { Component } from 'react'
import Taro from '@tarojs/taro'

class CouponNew extends Component {

  componentDidShow() {
    Taro.redirectTo({
      url: '/pagePay/coupon/couponNewPage'
    })
  }

  render () {
    return (
      <></>
    )
  }

}

export default CouponNew

