import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components'
import url from '../../config/api';
import './activity.less'


class Activity extends Component {

  state = {
    Activity_Type: []
  }

  componentDidShow() {
    // 获取数据
    Taro.request({
      url: url + '/Recharge/selectRecharge',
      data: {
        xkey: "activityType"
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      }
    }).then(
      res => {
        res.data.data[0].content = JSON.parse(res.data.data[0].content)
        this.setState({
          Activity_Type: res.data.data[0].content
        })
      }
    )
  }

  render() {
    return (
      <>
        {
          this.state.Activity_Type.status ?
            <View class="page2">
              <View class="page404">
                <Image src={this.state.Activity_Type.image}></Image>
                <View class="title1">{this.state.Activity_Type.title1}</View>
                <View class="title1">{this.state.Activity_Type.title2}</View>
                <View class="title2">{this.state.Activity_Type.title3}</View>
              </View>
            </View> : null
        }
      </>
    )
  }

}

export default Activity