import React, { Component } from 'react';
import { View, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import url from '../../config/api';
import './reason.less'


class Reason extends Component {

  state = {
    reasonList: []
  }

  componentDidShow() {
    Taro.request({
      url: url + '/Reason/selectReasonList',
      data: {
        status: 1,
        pageSize: 0
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      }
    }).then(
      res => {
        this.setState({
          reasonList: res.data.data
        })
      }
    )
  }

  render() {
    return (
      <View class="body">
        <View class="top">
          <Image src="http://video.seouleaguer.com/handsome.jpg" mode="widthFix"></Image>
        </View>
        <View class="community">
          <ScrollView>
            {
              this.state.reasonList.map((item, index) => {
                return (
                  <View class="reason" key={index}>
                    <View class="content">{item.content}</View>
                    <View class="author">——{item.author}</View>
                  </View>
                )
              })

            }
          </ScrollView>
        </View>
      </View>
    )
  }

}

export default Reason;










