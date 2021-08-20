import React, { Component } from 'react';
import Taro, { Current } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import url from '../../config/api';
import './comicDetail.less'

class ComicDetail extends Component {
  state = {
    comicsList: []
  }

  componentDidShow() {
    let id = Current.router.params.id
    Taro.request({
      url: url + '/Comics/selectComicsById?id=' + id,
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        this.setState({
          comicsList: res.data.data
        })
      }
    )
  }

  render() {
    let { comicsList } = this.state
    return (
      <View className="page">
        <Image mode="widthFix" src={comicsList.comicsImages}></Image>
      </View>
    )

  }

}

export default ComicDetail
