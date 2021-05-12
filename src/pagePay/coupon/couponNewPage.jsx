import React, { Component } from 'react';
import Taro, { getStorageSync } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames'
import url from '../../config/api'
import './couponNew.less'

class CouponNewPage extends Component {

  state = {
    curr: "1",
    number: 1,
    page: 1,
    couponList: []
  }

  // 选项卡点击切换
  tab = (e) => {
    let openId = getStorageSync('openid')
    let t = e.currentTarget.dataset.index

    this.setState({
      curr: t
    })
    let queryType,
      status;
    if (t == 1) {
      queryType = 1,
        status = -1
    } else if (t == 2) {
      queryType = 2,
        status = 1
    } else if (t == 3) {
      queryType = 3,
        status = 3
    }

    // 索引与选项卡无法对应，重新获取数据
    Taro.request({
      url: url + '/CouponNew/selectUsage',
      data: {
        openid: openId,
        status: status,
        queryType: queryType
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        console.log(res)
        this.setState({
          couponList: res.data.data
        })
      }
    )
  }

  refresh = () => {
    let openId = getStorageSync('openid');
    Taro.request({
      url: url + '/CouponNew/selectUsage',
      data: {
        openid: openId,
        status: -1,
        queryType: 1
      },
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        this.setState({
          couponList: res.data.data
        })
      }
    )
  }

  submit = (e) => {
    let coupon = e.currentTarget.dataset.item
    let openId = getStorageSync('openid');
    Taro.showModal({
      title: "提示",
      content: "确定使用优惠券吗？",
      success: (res) => {
        if (res.confirm) {
          let userCoupon = {
            openid: openId,
            cid: coupon.id,
            status: 1
          }

          // 用户点击优惠券修改状态
          Taro.request({
            url: url + '/UserCoupon/couponUse',
            data: userCoupon,
            method: "POST",
            header: { //接口返回的数据类型，可以直接解析数据
              'Content-Type': 'application/json'
            },
          }).then(
            res => {
              if (res.data.errCode == 0) {
                Taro.showToast({
                  title: "使用成功",
                  icon: "success",
                  duration: 2e3
                })
                this.refresh()
              } else {
                Taro.showToast({
                  title: res.data.errMsg,
                  icon: "none",
                  duration: 2e3
                })
              }
            }
          )

        }
      }
    })

  }

  componentDidShow() {
    let openId = getStorageSync('openid')
    // 进入页面获取数据
    Taro.request({
      url: url + '/CouponNew/selectUsage',
      data: {
        openid: openId,
        status: -1,
        queryType: 1
      },
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        this.setState({
          couponList: res.data.data
        })
      }
    )
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <View>

        <View className="nav">
          <View onClick={this.tab.bind(this)} data-index="1" className={classNames("tabs", this.state.curr == 1 ? 'a' : '')}> 未使用</View>
          <View onClick={this.tab.bind(this)} data-index="2" className={classNames("tabs", this.state.curr == 2 ? 'a' : '')}> 已使用</View>
          <View onClick={this.tab.bind(this)} data-index="3" className={classNames("tabs", this.state.curr == 3 ? 'a' : '')}> 已过期</View>
        </View>

        <View class="coupon_list">

          {
            this.state.curr == 1 ?
              this.state.couponList.map((item, index) => {
                return (
                  <View
                    key={index}
                    class="itme"
                    onClick={item.couponUseStatus == 1 ? this.submit.bind(this) : null}
                    data-item={item}
                  >
                    <View class="white">
                      <View class="name">{item.couponTypeName}</View>
                      <View class="day">{item.expirationCountdown}天后过期</View>
                      <View class="condition">
                        {item.couponUsageConditions ? '消费金额满' + item.couponUsageConditions + '使用' : item.couponPrompt != null ? item.couponPrompt : '无使用条件'}
                      </View>
                      <View class="period">有效期：{item.startingTime}至{item.failtime}</View>
                    </View>
                    <View class="blue">
                      <View style={item.couponPrice > 999 ? 'padding: 30rpx 20rpx;' : ''}>
                        {item.couponPrice}
                        <Text style="font-size: 20rpx;">元</Text>
                      </View>
                    </View>
                  </View>
                )

              }) : null
          }

          {
            this.state.curr == 2 ?
              this.state.couponList.map((item, index) => {
                return (
                  <View class="itme" key={index}>
                    <View class={classNames("white", this.state.curr == 2 ? 'useImages' : '')}>
                      <View class="name" style="color:#9B9B9B">{item.couponTypeName}</View>
                      <View class="condition" style="color:#9B9B9B">
                        {item.couponUsageConditions ? '消费金额满' + item.couponUsageConditions + '使用' : item.couponPrompt != null ? item.couponPrompt : '无使用条件'}</View>
                      <View class="period">有效期：{item.startingTime}至{item.failtime}</View>
                    </View>
                    <View class="gray">
                      <View style={item.couponPrice > 999 ? 'padding: 30rpx 20rpx;' : ''}>{item.couponPrice}
                        <Text style="font-size: 20rpx;">元</Text></View>
                    </View>
                  </View>
                )
              }) : null
          }

          {
            this.state.curr == 3 ?
              this.state.couponList.map((item, index) => {
                return (
                  <View class="itme" key={index}>
                    <View class={classNames("white", this.state.curr == 3 ? 'expiredImages' : '')}>
                      <View
                        class="name"
                        style="color:#9B9B9B"
                      >{item.couponTypeName}</View>
                      <View
                        class="condition"
                        style="color:#9B9B9B"
                      >
                        {item.couponUsageConditions ? '消费金额满' + item.couponUsageConditions + '使用' : item.couponPrompt != null ? item.couponPrompt : '无使用条件'}
                      </View>
                      <View class="period">有效期：{item.startingTime}至{item.failtime}</View>
                    </View>
                    <View class="gray">
                      <View
                        style={item.couponPrice > 999 ? 'padding: 30rpx 20rpx;' : ''}
                      >
                        {item.couponPrice}
                        <Text style="font-size: 20rpx;">元</Text>
                      </View>
                    </View>
                  </View>
                )
              }) : null
          }

        </View>

      </View>
    )
  }

}

export default CouponNewPage;
