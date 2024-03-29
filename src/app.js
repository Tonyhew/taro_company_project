import { Component } from 'react';
import Taro, { getFileInfo, setStorageSync, getStorageSync } from '@tarojs/taro';
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
    setStorageSync('hasUserInfo', false)

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
            setStorageSync('openid', res.data.data.account.openId)
            setGlobalData('openid', res.data.data.account.openId)
          })
        } else {
          console.log('登录失败' + res.errMsg)
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

    Taro.request({
      url: 'https://pv.sohu.com/cityjson?ie=utf-8',
    }).then(
      res => {
        let aaa = res.data.split(' ');
        let bbb = aaa[4]
        let ccc = bbb.replace('"', '')
        let ddd = ccc.replace('"', '')
        let eee = ddd.replace(',', '')
        setStorageSync('userip', eee)
      }
    )
    let updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(() => {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: (res) => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(() => {
      // 新版本下载失败
    })

    Taro.request({
      url: url + '/HomeModule/selectHomeModule',
      data: {
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      }
    }).then(
      res => {
        Taro.setStorageSync('homeModuleList', res.data.data)
      }
    )

  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
