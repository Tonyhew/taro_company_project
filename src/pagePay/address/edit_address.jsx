import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Input, Image } from '@tarojs/components';
import url from '../../config/api'
import map from '../../image/resource/map.png'
import './edit_address.less'



class EditAddress extends Component {

  state = {
    address: '',
    name   : '',
    mobile : '',
    content: '',
    submit : false,
    map    : {},
  }

  input = (e) => {
    console.log(e)
  }

  componentDidShow() {

  }

  render() {
    return (
      <View class="page">
        <View class="list">
          <View class="item">
            <View>联系人</View>
            <Input
              onInput={this.input.bind(this)}
              data-name={this.state.name}
              placeholder="名字"
              placeholderStyle="color:#d9d9db;"
              type="text"
              value={this.state.name}
            ></Input>
          </View>
          <View class="item">
            <View>手机号码</View>
            <Input
              onInput={this.input.bind(this)}
              data-name={this.state.mobile}
              placeholder="11位手机号"
              placeholderStyle="color:#d9d9db;"
              type="number"
              value={this.state.mobile}
            ></Input>
          </View>
          <View class="item" bindtap="map">
            <View>选择地区</View>
            <Input
              disabled="true"
              placeholder="点击定位（不可填写）"
              placeholderStyle="color:#333;"
              type="text"
              value={this.state.address}
            ></Input>
            <Image src={map}></Image>
          </View>
          <View class="item">
            <View>详细地址</View>
            <Input
              onInput={this.input.bind(this)}
              data-name="content"
              placeholder="街道门牌信息"
              placeholderStyle="color:#d9d9db;"
              type="text"
              value={this.state.content}
            ></Input>
          </View>
        </View>
        <View
          onClick="submit"
          class="btn btn1"
          style="background:#518eeb"
        >确定</View>
        <View
          onClick="wx_address"
          class="btn btn2"
        >使用微信地址</View>
      </View>
    )
  }


}


export default EditAddress;













