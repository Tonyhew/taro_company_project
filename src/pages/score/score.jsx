import React, { Component } from 'react'
import Taro, { Current } from '@tarojs/taro'

class Score extends Component {

  componentDidShow() {
    console.log()
    Taro.redirectTo({
      url: '/topicComponent/score/score?curr=' + Current.router.params.curr
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

export default Score