import { Component } from 'react';
import Taro, { getFileInfo, setStorageSync } from '@tarojs/taro';
import url from '../src/config/api'
import { set as setGlobalData, get as getGlobalData } from '../src/config/global_data'
import './app.less';

class App extends Component {

  componentDidMount() { }

  componentDidShow() {
    Taro.setTabBarStyle({
      color: '#858585',
      selectedColor: '#347be9',
      borderStyle: 'white'
    });

    setGlobalData('userInfo', null)

    Taro.login({
      success: (res) => {
        if (res.code) {
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

    if (getGlobalData('hasUserInfo')) {
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

    // 获取用户信息   
    Taro.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          Taro.getUserInfo({
            success: res => {
              //将用户名昵称和头像存入数据库
              var openidl = Taro.getStorageSync('openid');
              Taro.setStorageSync('userInfo', res.userInfo)
              var nickName = res.userInfo.nickName;
              var avatarUrl = res.userInfo.avatarUrl;
              Taro.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
              var gender = res.userInfo.gender;
              var country = res.userInfo.country;
              var province = res.userInfo.province;
              var city = res.userInfo.city;
              if ("" != avatarUrl && "" != nickName) {
                wx.request({
                  url: url + '/UserInfo/updateUserInfo',
                  data: {
                    openid: openidl,
                    nick: nickName,
                    avatar: avatarUrl,
                    gender: gender,
                    country: country,
                    province: province,
                    city: city
                  },
                  method: "POST",
                  header: {//接口返回的数据类型，可以直接解析数据
                    'Content-Type': 'application/json'
                  },
                  success: function (res) {
                    Taro.setStorageSync('userInfo', res.data.data)
                  },
                  error: function (res) {
                  }
                })
              }
            }
          })
        }
      }
    })

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

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
