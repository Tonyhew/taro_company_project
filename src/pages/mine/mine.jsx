import React, { Component } from 'react'
import Taro, { clearStorageSync, getApp, getStorageSync, requirePlugin, setStorageSync } from '@tarojs/taro'
import { View, Image, Text, Button, Navigator } from '@tarojs/components'
import { set as setGlobalData, get as getGlobalData } from '../../config/global_data'
import url from '../../config/api'
import toBePaid from '../../Images/icon/toBePaid.png'
import paid from '../../Images/icon/paid.png'
import evaluate from '../../Images/icon/evaluate.png'
import aftermarket from '../../Images/icon/aftermarket.png'
import wallet from '../../Images/icon/wallet.png'
import integral from '../../Images/icon/integral.png'
import cardTicket from '../../Images/icon/cardTicket.png'
import customerService from '../../Images/icon/customerService.png'
import address from '../../Images/icon/address.png'
import task from '../../Images/icon/task.png'
import proposal from '../../Images/icon/proposal.png'
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
    console.log(this.state.userInfo)

    setGlobalData('hasUserInfo', this.state.hasUserInfo)
    Taro.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting) {
          Taro.getUserInfo({
            success: (res) => {
              console.log(res)
              this.setState({
                userInfo: res.userInfo,
                cardRule: getStorageSync('cardRule'),
                hasUserInfo: true
              })
              setStorageSync('userInfo', res.userInfo)
            }
          })

          console.log(this.state.userInfo)
        }
      },
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

  ButtonIsShow = () => {
    return (
      <View class="Button">
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
  register = () => {
    return (
      <Navigator class="open" url="../card/info?edit=1">
        注册会员
      </Navigator>
    )
  }

  dataButton = () => {
    return (
      <View class="Button2">
        <View>--</View>
      </View>
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
            {
              this.state.userMeta.card == 1 ? <View>Blue Card</View> : null
            }
          </Navigator>
          <View class={(!this.state.hasUserInfo && this.state.canIUse) ? 'top_View2' : 'top_View'}>
            <Image class="avatar" src={this.state.userInfo.avatarUrl}></Image>
            <View class="nick">
              {
                (!this.state.hasUserInfo && this.state.canIUse) ? this.ButtonIsShow() : null
              }

              {
                (!this.state.hasUserInfo && this.state.canIUse) ? null : this.nickGrade()
              }
            </View >
          </View >
          <View class="autograph">{this.state.userInfo.personalSignature}</View>
          <View>
            <View class="jifen" >
              <View >{this.state.userMeta.card == 1 ? this.state.userInfo.score : '--'}</View>
              <View>盐值积分</View>
            </View>
          </View>
          {
            (!this.state.hasUserInfo && this.state.canIUse) ? null : (this.state.userMeta.card != 1 && this.state.canIUse) ? this.register() : null
          }
        </View >

        <View class="shuju">
          <View class="" style="flex: 1;text-align: center;font-size:3vw;">
            {
              !this.state.hasUserInfo && this.state.canIUse ? this.dataButton() : <View><View>{this.state.number1}</View></View>
            }
            <View>关注数</View>
          </View>
          <View style="width:3.5rpx;height:60rpx;background-color:#E2E2E2"></View>
          <View class="" style="flex: 1;text-align: center;font-size: 3vw;">
            {
              !this.state.hasUserInfo && this.state.canIUse ? this.dataButton() : <View><View>{this.state.number2}</View></View>
            }
            <View>我喜欢</View>
          </View>
          <View style="width:3.5rpx;height:60rpx;background-color:#E2E2E2"></View>
          <View style="flex: 1;text-align: center;font-size: 3vw;">
            {
              !this.state.hasUserInfo && this.state.canIUse ? this.dataButton() : <View><View>{this.state.number3}</View></View>
            }
            <View>我收藏</View>
          </View>
          <View style="width:3.5rpx;height:60rpx;background-color:#E2E2E2"></View>
          <View style="flex: 1;text-align: center;font-size: 3vw;">
            {
              !this.state.hasUserInfo && this.state.canIUse ? this.dataButton() : <View><View>{this.state.number4}</View></View>
            }
            <View>我参与</View>
          </View>
        </View>

        <View class="list">
          <View class="list_content">
            <Navigator class="item" url="../order/order?orderStatus=1">
              <Image src={toBePaid}></Image>
              <View>待付款</View>
            </Navigator>
            <Navigator class="item" url="../order/order?orderStatus=2">
              <Image src={paid}></Image>
              <View>已付款</View>
            </Navigator>
            <Navigator class="item" url="../order/order?orderStatus=3">
              <Image src={evaluate}></Image>
              <View>待评价</View>
            </Navigator>
            <Navigator class="item" url="../order/order?orderStatus=4">
              <Image src={aftermarket}></Image>
              <View>退售后</View>
            </Navigator>
          </View>
        </View>

        <View class="list2">
          <View class="list_content">
            <Navigator class="item" url="../over/over">
              <Image src={wallet}></Image>
              <View>盐值钱包</View>
            </Navigator>
            <Navigator class="item" url="../score/score">
              <Image src={integral}></Image>
              <View>盐值积分</View>
            </Navigator>
            <Navigator class="item" url="../coupon/coupon">
              <Image src={cardTicket}></Image>
              <View>盐值卡券</View>
            </Navigator>
            <View class="item">
              <Button class="customer_service" open-type="contact" session-from="weapp">
                <Image src={customerService}></Image>
              </Button>
              <View style="height:10rpx"></View>
              <View>客服中心</View>
            </View>
          </View>
          <View class="list_content">
            <Navigator class="item" url="../address/address">
              <Image src={address}></Image>
              <View>地址管理</View>
            </Navigator>
            <Navigator class="item" url="#">
              <Image src={evaluate}></Image>
              <View>服务评价</View>
            </Navigator>
            <Navigator class="item" url="../calendar/calendar">
              <Image src={task}></Image>
              <View>每日签到</View>
            </Navigator>
            <Navigator class="item" url="#">
              <Image src={proposal}></Image>
              <View>反馈建议</View>
            </Navigator>
          </View>
        </View>

      </View>
    )
  }
}


