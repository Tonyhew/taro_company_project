import React, { Component } from 'react';
import Taro, { getApp, getStorageSync, setStorageSync, eventCenter, getCurrentInstance } from '@tarojs/taro';
import { View, Image, Text, Button, Navigator } from '@tarojs/components';
import { set as setGlobalData, get as getGlobalData } from '../../config/global_data';
import url from '../../config/api';
import toBePaid from '../../image/icon/toBePaid.png';
import paid from '../../image/icon/paid.png';
import evaluate from '../../image/icon/evaluate.png';
import aftermarket from '../../image/icon/aftermarket.png';
import wallet from '../../image/icon/wallet.png';
import integral from '../../image/icon/integral.png';
import cardTicket from '../../image/icon/cardTicket.png';
import customerService from '../../image/icon/customerService.png';
import address from '../../image/icon/address.png';
import task from '../../image/icon/task.png';
import proposal from '../../image/icon/proposal.png';
import Skeleton from './mine_skeleton'
import './mine.less'

var app = getApp()
export default class Mine extends Component {

  state = {
    loading: true,
    count: 1,
    userInfo: [],
    userMeta: [],
    list: [],
    authorize: false,
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    canIUse: Taro.canIUse('button.open-type.getUserInfo'),
    number1: 0,
    number2: 0,
    number3: 0,
    number4: 0,
    cardRule: [],
    superMember: [],
    superMemberHeight: 0,
    navigation_icon1: [],
    navigation_icon2: [],
  }

  // 我的页面骨架屏
  $instance = getCurrentInstance()
  UNSAFE_componentWillMount() {
    const onReadyEventId = this.$instance.router.onReady
    eventCenter.once(onReadyEventId, () => {
      // onReady 触发后才能获取小程序渲染层的节点
      Taro.createSelectorQuery().select('.index')
        .boundingClientRect()
        .exec(res => {
          this.setState({
            loading: false
          })
        })
    })
  }


  getUserProfile = (e) => {

    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        let that = this
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

        //将用户名昵称和头像存入数据库
        let openidl = Taro.getStorageSync('openid');
        let nickName = res.userInfo.nickName;
        let avatarUrl = res.userInfo.avatarUrl;
        Taro.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
        let gender = res.userInfo.gender;
        let country = res.userInfo.country;
        let province = res.userInfo.province;
        let city = res.userInfo.city;
        if ("" != avatarUrl && "" != nickName && this.state.count == 1) {
          Taro.request({
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
          }).then(
            res => {
              this.setState({
                count: 2,
              })
              Taro.setStorageSync('hasUserInfo', true)
              Taro.setStorageSync('userInfo', res.data.data)
              console.log(res)
              that.setState({
                userInfo: res.data.data,
                cardRule: getStorageSync('cardRule'),
                hasUserInfo: true,
              })
            }
          )
        }
      }
    })

  }


  getUserInfo = (e) => {
    Taro.getUserInfo({
      success: (res) => {
        console.log(res)
        if (res.errMsg == "getUserInfo:ok") {
          this.setState({
            userInfo: getStorageSync('userInfo'),
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

    if (getStorageSync('userInfo') != '') {
      Taro.getUserInfo({
        success: (res) => {
          console.log(res)
          if (res.errMsg == "getUserInfo:ok") {
            Taro.setStorageSync('hasUserInfo', true)
            this.setState({
              userInfo: getStorageSync('userMeta'),
              cardRule: getStorageSync('cardRule'),
              hasUserInfo: true,
            })
          }
        }
      })
    }

    this.setState({
      hasUserInfo: getStorageSync('hasUserInfo')
    })

    if (wx.getUserProfile) {
      this.setState({
        canIUseGetUserProfile: true
      })
    }

    setGlobalData('hasUserInfo', this.state.hasUserInfo)
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

    // 首页图片获取
    Taro.request({
      method: 'POST',
      url: url + '/PictureManage/selectPictureManage',
      data: {
        status: 1,
        pageIndex: 0,
        pageSize: 3
      },
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      var superMember = res.data.data.superMember;
      var num = superMember.length;
      var superMemberHeight = num * 284 + 10
      this.setState({
        superMember: res.data.data.superMember,
        superMemberHeight: superMemberHeight
      })
    })

    // 获取我的页面导航
    Taro.request({
      url: url + '/Recharge/selectRecharge',
      data: {
        xkey: "navigationIcon"
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        res.data.data[0].content = JSON.parse(res.data.data[0].content);
        this.setState({
          navigation_icon1: res.data.data[0].content.navigation_icon1,
          navigation_icon2: res.data.data[0].content.navigation_icon2
        })

      }
    )

  }

  getPhoneNumber = (e) => {
    console.log(e)
  }


  ButtonIsShow = () => {
    console.log(this.state.canIUseGetUserProfile)
    return (
      <>
        {

          this.state.canIUseGetUserProfile ? <View class="Button">
            <Button onClick={() => { this.getUserProfile() }}>登录/注册 {">"}</Button>
            <View class="user">点击登录查看你的会员等级</View>
          </View> : <View class="Button">
            <Button openType="getUserInfo" onClick={() => { this.getUserInfo() }} onGetUserInfo={this.getUserInfo()}>登录/注册 {">"}</Button>
            <View class="user">点击登录查看你的会员等级</View>
          </View>
        }
      </>
    )
  }

  nickGrade = () => {
    return (
      <View class="nickName" >
        <View class="names" style="color:#FFFFFF;">{getStorageSync('userInfo').nick}</View>
        <View class="grade"><Text style="background-color: #DE1C2A;padding:0 4rpx;">Lv.number1</Text></View>
      </View>
    )
  }
  register = () => {
    return (
      <Button class="open" openType="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber.bind(this)}>
        注册会员
      </Button>
      // <Navigator class="open" url="/topicComponent/card/info?edit=1">
      //   注册会员
      // </Navigator>
    )
  }

  dataButton = () => {
    return (
      <View class="Button2">
        <View>--</View>
      </View>
    )
  }

  superMemberRender = () => {
    return (
      <View class="superMember">
        <View class="title">
          <View class="name">超级会员日</View>
          <View class="button">换一换</View>
        </View>
        <View class='content' style="height:{{superMemberHeight}}rpx;">
          <View class="picture" style="height:284rpx;padding: 0rpx 29rpx 0rpx;box-shadow: 2px 2px 8px #D2D2D2;margin: 30rpx;">
            <Navigator style="height:100%;width:100%" hover-class="none" url="#">
              <Image src="{{item.pictureUrl}}" mode="aspectFit" style="height:100%;width:100%;"></Image>
            </Navigator>
          </View>
        </View>
      </View>
    )
  }

  ske = () => {
    return (
      <Skeleton />
    )
  }

  componentDidUpdate() {

    Taro.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          var that = this
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserProfile({

            success: res => {
              //将用户名昵称和头像存入数据库
              let openidl = Taro.getStorageSync('openid');
              let nickName = res.userInfo.nickName;
              let avatarUrl = res.userInfo.avatarUrl;
              Taro.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
              let gender = res.userInfo.gender;
              let country = res.userInfo.country;
              let province = res.userInfo.province;
              let city = res.userInfo.city;
              if ("" != avatarUrl && "" != nickName && this.state.count == 1) {
                Taro.request({
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
                }).then(
                  res => {
                    this.setState({
                      count: 2,
                    })
                    Taro.setStorageSync('userInfo', res.data.data)
                    that.setState({
                      userInfo: res.data.data,
                      cardRule: getStorageSync('cardRule'),
                      hasUserInfo: true,
                    })
                  }
                )
              }
            }
          })
        }
      },
    })
  }


  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <View>
        {
          this.state.loading ? this.ske()
            :
            <View>
              <View class="top">
                <Image class="seouleaguer" src="https://applets.seouleaguer.com/images/2020/09/seouleaguer.png" mode="aspectFit" />
              </View>
              {/* V蓝卡 START */}
              <View class="blueCard">
                <Navigator class="setUp" url={(!this.state.hasUserInfo && this.state.canIUse) ? '#' : '/topicComponent/card/card'}>
                  {
                    <Image src={(!this.state.hasUserInfo && this.state.canIUse) ?
                      JSON.parse(getStorageSync('cardRule')[2].content).card_status1 :
                      (this.state.hasUserInfo && getStorageSync('userInfo').card != 1) ?
                        JSON.parse(getStorageSync('cardRule')[2].content).card_status2 :
                        JSON.parse(getStorageSync('cardRule')[2].content).card_status3} />
                  }
                  {
                    this.state.userMeta.card == 1 ? <View>Blue Card</View> : null
                  }
                </Navigator>
                <View class={(!getStorageSync('hasUserInfo') && this.state.canIUse) ? 'top_View2' : 'top_View'}>
                  <Image class="avatar" src={getStorageSync('userInfo').avatar}></Image>
                  <View class="nick">
                    {
                      (!getStorageSync('hasUserInfo') && this.state.canIUse) ? this.ButtonIsShow() : null
                    }

                    {
                      (!getStorageSync('hasUserInfo') && this.state.canIUse) ? null : this.nickGrade()
                    }
                  </View >
                </View >
                <View class="autograph">{this.state.userInfo.personalSignature}</View>
                <View>
                  <View class="jifen" >
                    <View >{getStorageSync('userInfo').card == 1 ? getStorageSync('userInfo').score : '--'}</View>
                    <View>盐值积分</View>
                  </View>
                </View>
                {
                  (!this.state.hasUserInfo && this.state.canIUse) ? null : (this.state.userMeta.card != 1 && this.state.canIUse) ? this.register() : null
                }
              </View >
              {/* V蓝卡 END */}

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

              {/* 订单 START */}
              <View class="list">
                <View class="list_content">
                  <Navigator class="item" url="/pagePay/order/order?orderStatus=1">
                    <Image src={toBePaid}></Image>
                    <View>待付款</View>
                  </Navigator>
                  <Navigator class="item" url="/pagePay/order/order?orderStatus=2">
                    <Image src={paid}></Image>
                    <View>已付款</View>
                  </Navigator>
                  <Navigator class="item" url="/pagePay/order/order?orderStatus=3">
                    <Image src={evaluate}></Image>
                    <View>待评价</View>
                  </Navigator>
                  <Navigator class="item" url="/pagePay/order/order?orderStatus=4">
                    <Image src={aftermarket}></Image>
                    <View>退售后</View>
                  </Navigator>
                </View>
              </View>
              {/* 订单 END */}

              {/* 快速链接 START */}
              <View class="list2">
                {
                  this.state.navigation_icon1.map((item, index) => {

                    return (
                      <View class="list_content" key={index}>
                        <Navigator class="item" url={item.navigationUrl}>
                          <Image src={item.iconUrl}></Image>
                          <View>{item.navigation}</View>
                        </Navigator>
                      </View>
                    )
                  })
                }

                {
                  this.state.navigation_icon2.map((item, index) => {
                    return (
                      <View class="list_content" key={index}>
                        <Navigator class="item" url={item.navigationUrl}>
                          <Image src={item.iconUrl}></Image>
                          <View>{item.navigation}</View>
                        </Navigator>
                      </View>
                    )
                  })
                }

                <View class="item" style={{ width: '25%' }}>
                  <Button class="customer_service" open-type="contact" session-from="weapp">
                    <Image src={customerService}></Image>
                  </Button>
                  <View style="height:10rpx"></View>
                  <View>客服中心</View>
                </View>
                。
              </View>
              {/* 快速链接 END */}

              {/* 超级会员日 START */}
              {
                this.state.superMember.length == 0 ? null : this.superMemberRender()
              }

              {/* 超级会员日 END */}
            </View>
        }
      </View>
    )
  }
}


