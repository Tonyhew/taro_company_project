import React, { Component } from 'react';
import Taro from '@tarojs/taro'

class AddressPage extends Component {

  componentDidShow() {
    Taro.redirectTo({
      url: '/pagePay/address/address'
    })
  }

  render() {
    return null
  }

}


export default AddressPage




