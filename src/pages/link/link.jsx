import React, { Component } from 'react';
import Taro, { Current } from '@tarojs/taro'
import { View, Navigator, Image, WebView } from '@tarojs/components';
import url from '../../config/api';
import indexPng from '../../image/resource/index.png'
import '@tarojs/taro/html.css'
import './link.less'
class Link extends Component {

  state = {
    list: [],
    Ahtml: "",
    a_url: '',
  }

  componentDidShow(o) {
    const id = unescape(Current.router.params.id)
    if (!Number(id)) {
      this.setState({
        a_url: unescape(id),
      })
    } else {
      Taro.request({
        url: url + "/Article/selectArticleId?id=" + id,
        method: "POST",
        header: {//接口返回的数据类型，可以直接解析数据
          'Content-Type': 'application/json'
        },
      }).then(
        res => {
          let m = res.data.data
          this.setState({
            list: m,
            Ahtml: m.content
          })
        }
      )
    }

  }

  render() {
    let a = this.state;
    console.log(this.state)
    return (
      <View>
        <View>
          {
            this.state.list.uniacid == 2 ?
              a.Ahtml !== "" ?
                <View className="content" dangerouslySetInnerHTML={{ __html: a.Ahtml }}></View>
                : null
              : <WebView src={this.state.a_url}></WebView>

          }
        </View>
        <Navigator url="" openType="navigateBack">
          <Image class="to_index" src={indexPng}></Image>
        </Navigator>
      </View>
    )
  }

}

export default Link





