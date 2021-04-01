import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import url from '../../../config/api';
import { getDateInfo } from '../../../utils/activity';
import './aasets.less';


class AccountAssets extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sum: 0,
      billingList: [],
      userinfo: {}
    }
  }

  componentDidShow() {
    let openId = Taro.getStorageSync('openid');
    Taro.request({
      url: url + '/UserInfo/selectUserInfo?openid=' + openId,
      method: "GET",
      header: {//接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      }
    }).then(
      res => {
        let sum = res.data.data.money + res.data.data.giveMoney;
        this.setState({
          userinfo: res.data.data,
          sum: sum
        })
      }
    )

    Taro.request({
      url: url + '/OrderManagement/selectOrderList',
      data: {
        openId
      },
      method: "POST",
      header: {//接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      }
    }).then(
      res => {
        this.setState({
          billingList: res.data.data
        })
      }
    )
  }

  render() {

    return (
      <View class="over">
        <View class="assets">
          <View class="totalAssets">
            当前总资产(元)
            <Text>{this.state.sum}</Text>
            余额+赠送金
          </View>
          <View class="assetDetails">
            <View class="balance">
              <View>{this.state.userinfo.money}</View>
              <View>账户余额(元)</View>
            </View>
            <View class="line"></View>
            <View class="balance">
              <View>{this.state.userinfo.giveMoney}</View>
              <View>赠送金(元)</View>
            </View>
          </View>
          {/* <View bindtap="to_recharge" class="recharge" data-index="1">充值</View> */}
        </View>
        <View class="billingDetails">
          <View class="top">
            <View></View>
            <View> 账单明细</View>
          </View>
          {
            this.state.billingList.map((item, index) => {
              return (
                <View class="details" key={index}>
                  <View class="time">
                    <View>{getDateInfo('m-d', item.startTime)}</View>
                    <View>{getDateInfo('H:i', item.startTime)}</View>
                  </View>
                  <View class="content">
                    <View>{item.orderType == 3 ? "账户充值" : "余额支出"}</View>
                    <View style={{ color: item.orderType == 3 ? '#3B81E9' : '#E7455A' }}>{item.orderType == 3 ? " + " + item.oAmount : " - " + item.oAmount}</View>
                    <View>订单号：{item.outTradeNo}</View>
                  </View>
                  <View class="splitLine"></View>
                </View>
              )
            })
          }
        </View >
      </View>
    )

  }

}

export default AccountAssets;
















