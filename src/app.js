import { Component } from 'react';
import Taro, { getFileInfo, setStorageSync } from '@tarojs/taro';
import url from '../src/config/api'
import { set as setGlobalData, get as getGlobalData } from '../src/config/global_data'
import './app.less';

class App extends Component {

  componentDidMount () {}

  componentDidShow () {
    Taro.setTabBarStyle({
      color: '#858585',
      selectedColor: '#347be9',
      borderStyle: 'white'
    });

    setGlobalData('userInfo', null)

    Taro.login({
      success: (res) => {
        if(res.code) {
          Taro.request({
            method: 'GET',
            url: url + '/wechat/user/login',
            data: {
              code: res.code,
              activityId: 'mining'
            },
            header: {//接口返回的数据类型，可以直接解析数据
              'Content-Type': 'application/json'
            },
          }).then(res => {
            console.log(res)
            setStorageSync('openid', res.data.data.account.openId)
            setGlobalData('openid', res.data.data.account.openId)
          })
        } else {
          console.log('登录失败' + res.errMsg)
        }
      }
    })

    if(getGlobalData('hasUserInfo')) {
      Taro.getUserInfo({
        success: (res) => {
          console.log(res)
          if (res.errMsg == "getUserInfo:ok") {
            setGlobalData('userInfo', res.userInfo)
            setStorageSync('userInfo', res.userInfo)
          }
        }
      })
    }
    
    Taro.request({
      url: url + '/Recharge/selectRecharge',
      data: {
        xkey: "card"
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(res => {
      Taro.setStorageSync('cardRule', res.data.data)
      setGlobalData('cardRule', res.data.data)
      this.setState({
        cardRule: res.data.data
      })
    })

  }

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
