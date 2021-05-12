import React, { Component } from 'react';
import Taro from '@tarojs/taro'

class Mall extends Component {

  componentDidShow() {
    Taro.switchTab({
      url: '/pages/scoreMall/scoreMall'
    })
  }


  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <></>
    )
  }

}


export default Mall




















