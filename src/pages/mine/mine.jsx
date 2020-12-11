import React, { Component } from 'react'
import Taro, { getApp, getStorageSync, setStorageSync } from '@tarojs/taro'
import { View, Image, Text, Button, Navigator } from '@tarojs/components'
import { set as setGlobalData, get as getGlobalData } from '../../config/global_data'
import url from '../../config/api'
import './mine.less'



var app = getApp()
export default class Mine extends Component {

  state = {
    userInfo: [],
    userMeta: [],
    list: [],
    authorize: false,
    hasUserInfo: false,
    canIUse: Taro.canIUse('button.open-type.getUserInfo'),
    number1: 0,
    number2: 0,
    number3: 0,
    number4: 0,
    cardRule: [],
  }


  getUserInfo = (e) => {
    Taro.getUserInfo({
      success: (res) => {
        console.log(res)
        if (res.errMsg == "getUserInfo:ok") {
          setGlobalData('userInfo', res.userInfo)
          setStorageSync('userInfo', res.userInfo)
          this.setState({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        } else if (res.errMsg == "getUserInfo:fail auth deny") {
          this.setState({
            userInfo: res.userInfo,
            hasUserInfo: false
          })
        }
      }
    })
  }

  componentDidShow() {
    Taro.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.setState({
            userInfo: getStorageSync('userInfo'),
            cardRule: getStorageSync('cardRule')
          })
          console.log(this.state.userInfo)
        }
      }
    })
    Taro.request({
      url: url + '/UserInfo/selectUserInfo?openid=' + getGlobalData('openid'),
      method: "GET",
      header: {//接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(res => {
      setStorageSync('userMeta', res.data.data)
      this.setState({
        userMeta: res.data.data
      })
    })
  }

  buttonIsShow = () => {
    return (
      <View class="button">
        <Button openType="getUserInfo" onClick={() => { this.getUserInfo() }} onGetUserInfo={() => { this.getUserInfo() }}>登录/注册 {">"}</Button>
        <View class="user">点击登录查看你的会员等级</View>
      </View>
    )
  }

  nickGrade = () => {
    return (
      <View class="nickName" >
        <View class="names" style="color:#FFFFFF;">{this.state.userInfo.nickName}</View>
        <View class="grade"><Text style="background-color: #DE1C2A;padding:0 4rpx;">Lv.number1</Text></View>
      </View>
    )
  }
  register = () =>{
    return (
      <Navigator class="open" url="../card/info?edit=1">
        注册会员
      </Navigator>
    )
  }

  render() {
    return (
      <View>
        <View class="top">
          <Image class="seouleaguer" src="https://applets.seouleaguer.com/images/2020/09/seouleaguer.png" mode="aspectFit" />
        </View>

        <View class="blueCard">
          <Navigator class="setUp" url={(!this.state.hasUserInfo && this.state.canIUse) ? '#' : '../card/card'}>
            {
              <Image src={(!this.state.hasUserInfo && this.state.canIUse) ?
                JSON.parse(getGlobalData('cardRule')[2].content).card_status1 :
                (this.state.hasUserInfo && this.state.userInfo.card != 1) ?
                  JSON.parse(getGlobalData('cardRule')[2].content).card_status2 :
                  JSON.parse(getGlobalData('cardRule')[2].content).card_status3} />
            }
            <View>Blue Card</View>
          </Navigator>
          <View class={(!this.state.hasUserInfo && this.state.canIUse) ? 'top_view2' : 'top_view'}>
            <Image class="avatar" src={this.state.userInfo.avatarUrl}></Image>
            <View class="nick">
              {
                (!this.state.hasUserInfo && this.state.canIUse) ? this.buttonIsShow() : null
              }
              
              {
                (!this.state.hasUserInfo && this.state.canIUse) ? null : this.nickGrade()
              }
            </View >
          </View >
          <View class="autograph">{this.state.userInfo.personalSignature}</View>
          <View>
            <View class="jifen" >
              <View >{this.state.userInfo.card == 1 ? this.state.userInfo.score : '--'}</View>
              <View>盐值积分</View>
            </View>
          </View>
          {
            (!this.state.hasUserInfo && this.state.canIUse) ? null : (this.state.userMeta.card != 1 && this.state.canIUse) ? this.register() : null
          }
        </View >

      </View >
    )
  }
}




