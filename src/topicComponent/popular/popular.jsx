import React, { Component } from 'react';
import { View, Text } from '@tarojs/components'
import Taro, { Current, getStorageSync } from '@tarojs/taro'
import api from '../../config/api'
import './popular.less'



class Popular extends Component {

  state = {
    popularList: []
  }

  componentDidShow() {
    Taro.request({
      url: api + '/Popular/selectPopular',
      data: {
        openid: getStorageSync('openid'),
        popularType: Current.router.params.popularType,
        status: 1,
        pageIndex: 0,
        pageSize: 100
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(res => {
      this.setState({
        popularList: res.data.data
      })
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
        <View class="honorpicture">
          {
            this.state.popularList.map((popularListItem, index) => {
              return (
                <View class="popular" key={index}>
                  <View class="title2">
                    <View class="ask">
                      <Text>问</Text>
                    </View>
                    <View class="titleName">{popularListItem.titleName}</View>
                  </View>
                  <View class="under">
                    <View class="answer">
                      <Text>答</Text>
                    </View>
                    <View class="titleAnswer">{popularListItem.titleAnswer}</View>
                  </View>
                </View>
              )
            })
          }
        </View>
        <View class="prompt ">此问答仅供参考，详情请来院咨询</View>
      </View>
    )
  }

}

export default Popular
















