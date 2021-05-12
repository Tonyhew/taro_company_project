import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Icon, } from '@tarojs/components';
import url from '../../config/api'
import './address.less'

class Address extends Component {

  state = {
    list: []
  }


  componentDidShow() {
    let openId = Taro.getStorageSync('openid')
    Taro.request({
      url: url + '/Address/selectAddress',
      data: {
        openid: openId,
        informationType: 1
      },
      method: "POST",
      header: {//接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        this.setState({
          list: res.data.data
        })
      }
    )
  }

  add_address = () => {
    Taro.navigateTo({
      url: 'edit_address'
    })
  }

  render() {
    return (
      <>
        <View class="page">
          {
            this.state.list.map((item, index) => {
              return (
                <View class="item" key={index}>
                  <View class="item_t">
                    <View>{item.name}</View>
                    <View>{item.mobile}</View>
                  </View>
                  <View class="address">{item.address ? item.address : ''}{item.content ? item.content : ''}</View>
                  <View class="item_b">
                    <View class="choose" bindtap="choose_add" data-status={item.status} data-id={item.id}>
                      <Icon
                        color={item.status == 1 ? theme.color : '#999'}
                        size="20"
                        type={item.status == 1 ? 'success' : 'circle'}
                      ></Icon>
                      <View>{item.status == 1 ? '默认地址' : '设为默认地址'}</View>
                    </View>
                    <View bindtap="address_edit" class="item_btn" data-index={index}>编辑</View>
                    <View bindtap="address_del" class="item_btn" data-index={index}>删除</View>
                  </View>
                </View>
              )
            })
          }
          <View onClick={this.add_address.bind(this)} class="btn" style="background:#518eeb;">增加地址</View>
        </View>
      </>
    )
  }

}

export default Address






