import React, { Component } from 'react'
import Taro from '@tarojs/taro'


class Topic extends Component {

  componentDidShow() {
    Taro.redirectTo({
      url: '/topicComponent/topic/topic'
    })
  }

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  }
  
  render() {
    return null
  }

}


export default Topic









