import React, { Component } from 'react'
import Taro, { getStorageSync } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import rechargeExclusive from '../../Images/card/rechargeExclusive.png'
import exchange from '../../Images/card/exchange.png'
import upgrade from '../../Images/card/upgrade.png'
import discount from '../../Images/card/discount.png'
import exclusiveService from '../../Images/card/exclusiveService.png'
import anniversary from '../../Images/card/anniversary.png'
import close from '../../Images/card/close.png'
import url from '../../config/api'
import './card.less'

class Card extends Component {

  state = {
    userInfo: [],
    coupon: [],
    authorize: true,
    prizeType: 0,
    flag: true,
    admissionTicket: true,
    couponType: false,
    sign: false,
  }

  componentDidShow() {
    Taro.request({
      url: url + '/UserInfo/selectUserInfo?openid=' + getStorageSync('openid'),
      method: "GET",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
      success: (res) => {
        console.log(res)
        var signs = false,
            couponType = false;
        if (res.data.data.card === 1 && res.data.data.prize === -1) {
          signs = true;
        }
        if (!signs) {
          couponType = true;
        }
        this.setState({
          userInfo: res.data.data,
          sign: signs,
          couponType: couponType
        })
      }
    })
  }

  to_edit = (a) => {
    var t = a.currentTarget.dataset.index;
    console.log(t)
    if (this.state.authorize) {
      1 == t ? Taro.navigateTo({
        url: "/pages/card/info?edit=1"
      }) : 2 == t && wx.navigateTo({
        url: "/pages/card/info?edit=2"
      });
    } else {
      Taro.showToast({
        title: "请前往‘我的’进行登陆",
        icon: "none",
        duration: 5000
      })
    }
  }

  close = () => {
    this.setState({
      sign: false,
      couponType: true
    })
  }

  giftPackage = () => {
    if (getStorageSync('userInfo').card === 1) {
      if (getStorageSync('userInfo').prize === -1) {
        this.setState({
          sign: true
        })
      } else {
        Taro.showToast({
          title: "您已领取奖励",
          icon: "none",
          duration: 3000
        })
      }
    } else {
      Taro.showToast({
        title: "请注册会员",
        icon: "none",
        duration: 3000
      })
    }
  }

  takePrize = () => {
    return (
      // 会员提交信息后弹出
      <View>
        <View class="shadow"></View>
        <View class="giftPackage">
          <Image class="switch" src={close} onClick={this.close}></Image>
          <Image class="baseMap" src="https://applets.seouleaguer.com/images/2020/09/giftPackageBackground.png" mode="widthFix"></Image>
          <View class="title">新人专享积分礼</View>
          <View class="number">
            1000
				    <Text>积分</Text>
          </View>
          <View class="button" bindtap="receive">立即领取</View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>
        <View class="top">
          <Image class="seouleaguerImage" src="https://applets.seouleaguer.com/images/2020/09/seouleaguer.png" mode="aspectFit"></Image>
          <View class="card">
            <Image class="back" src={getStorageSync('userMeta').card != 1 ? JSON.parse(getStorageSync('cardRule')[2].content).card_status2 : JSON.parse(getStorageSync('cardRule')[2].content).card_status3} mode="widthFix"></Image>
            {
              getStorageSync('userMeta').card == 1 ? <View className='blueCard'>Blue Card</View> : null
            }
            <View class={getStorageSync('userMeta').card == 1 ? 'userinfo' : 'userinfo2'}>
              <Image src={getStorageSync('userMeta').avatar}></Image>
              <View style="color: #fff">{getStorageSync('userMeta').nick}</View>
            </View>
          </View>
        </View>

        {
          getStorageSync('userMeta').card != 1 ? <View onClick={this.to_edit} class="btn" data-index="1" style="background:#E7455A;">立即开通</View> : <View onClick={this.to_edit} class="btn" data-index="2" style="background:#E7455A;">查看信息</View>
        }

        <View class="info">
          <View class="title">开通会员，即可享受以下专属权益</View>
        </View>
        <View class="rule">
          <View class="title">
            <View style="background:#D12A46;"></View>
            <View class="name">会员卡使用须知</View>
          </View>
          <View class="exclusive">
            <Image src={rechargeExclusive}></Image>
            <Text class="titles">{JSON.parse(getStorageSync('cardRule')[1].content).cardRule[0].name}</Text>
            <Text class="subtitle">{JSON.parse(getStorageSync('cardRule')[1].content).cardRule[0].description}</Text>
          </View>
          <View style="width:4rpx;height:140rpx;background-color:#E2E2E2;"></View>
          <View style="width:94%;height:2rpx;background-color:#E2E2E2;position: absolute;top:164rpx;"></View>
          <View class="exclusive2" bindtap="admissionTicket">
            <Image src={exchange}></Image>
            <Text class="titles">{JSON.parse(getStorageSync('cardRule')[1].content).cardRule[1].name}</Text>
            <Text class="subtitle">{JSON.parse(getStorageSync('cardRule')[1].content).cardRule[1].description}</Text>
          </View>
          <View class="exclusive">
            <Image src={upgrade} style="height: 60rpx;width:60rpx;"></Image>
            <Text class="titles">{JSON.parse(getStorageSync('cardRule')[1].content).cardRule[2].name}</Text>
            <Text class="subtitle">{JSON.parse(getStorageSync('cardRule')[1].content).cardRule[2].description}</Text>
          </View>
          <View style="width:4rpx;height:120rpx;background-color:#E2E2E2;"></View>
          <View style="width:94%;height:2rpx;background-color:#E2E2E2;position: absolute;top:304rpx"></View>
          <View class="exclusive2" onClick={this.giftPackage}>
            <Image src={discount}></Image>
            <Text class="titles">{JSON.parse(getStorageSync('cardRule')[1].content).cardRule[3].name}</Text>
            <Text class="prompt">点击领取</Text>
            <Text class="subtitle">{JSON.parse(getStorageSync('cardRule')[1].content).cardRule[3].description}</Text>
          </View>
          <View class="exclusive">
            <Image src={exclusiveService}></Image>
            <Text class="titles">{JSON.parse(getStorageSync('cardRule')[1].content).cardRule[4].name}</Text>
            <Text class="subtitle">{JSON.parse(getStorageSync('cardRule')[1].content).cardRule[4].description}</Text>
          </View>
          <View style="width:4rpx;height:120rpx;background-color:#E2E2E2;"></View>
          <View class="exclusive2" bindtap="activity">
            <Image src={anniversary}></Image>
            <Text class="titles">{JSON.parse(getStorageSync('cardRule')[1].content).cardRule[5].name}</Text>
            <Text class="subtitle">{JSON.parse(getStorageSync('cardRule')[1].content).cardRule[5].description}</Text>
          </View>
        </View>
        <View class="end">
          <View class="illustration">
            <Image src="https://applets.seouleaguer.com/images/2020/09/illustration.png" style="width:100%;height:100%;" mode="aspectFit"></Image>
          </View>
          <View class="logo">
            <Image src="https://applets.seouleaguer.com/images/2020/09/logo.png" style="width:102rpx;height:58rpx; display: block" mode="aspectFit"></Image>
            <Text style="color:#9B9B9B;font-size:2vw;">本会员权益由首尔丽格提供，如有疑问，可联系首尔丽格客服</Text>
          </View>
          <View style="height:420rpx;"></View>
        </View>


        {
          this.state.sign && this.state.prizeType === 0 ? this.takePrize() : null
        }
      </View>
    )
  }

}

export default Card















