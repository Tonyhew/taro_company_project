import React, { Component } from 'react';
import { View, Navigator, Image } from '@tarojs/components';
import Taro, { getStorageSync } from '@tarojs/taro';
import url from '../../config/api';
import './comic.less'

class Comic extends Component {

  state = {
    comicsList: []
  }

  componentDidShow() {
    let openId = getStorageSync('openid')
    console.log(openId)
    Taro.request({
      url: url + '/Comics/selectComicsList',
      data: {
        status: 1
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        let comicsList = res.data.data
        this.setState({
          comicsList
        })
      }
    )
  }

  render() {
    let { comicsList } = this.state
    return (
      <View>
        {
          comicsList.length == 0 ?
            <View class="prompt">敬请期待</View> :
            <View class="pages">
              <View class="comicsList">
                {
                  comicsList.map((cList, index) => {
                    return (
                      <Navigator key={index} class="commodity" url={"./comicDetail?&id=" + cList.id}>
                        <View class="cover">
                          <Image src={cList.cover} mode="widthFix"></Image>
                        </View>
                      </Navigator>
                    )
                  })
                }
              </View>
            </View>
        }
      </View>
    )
  }
}

export default Comic