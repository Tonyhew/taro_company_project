import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Text, Button } from '@tarojs/components'
import url from '../../config/api'
import { Current } from '@tarojs/taro'
import './detail.less'



class Detail extends Component {

  state = {
    indicatorDots: true,
    autoplay: true,
    interval: 5e3,
    duration: 1e3,
    kind: -1,
    page: 1,
    total: 1,
    pagesize: 15,
    isbottom: !1,
    addressJson: {},
    current: 0,
    parameter_price: "",
    authorize: true,
    listTime: [],
    banner: [],
    beautyList: [],
    choiceList: [],
  }

  componentDidShow() {
    console.log(Current.router.params.id)
    Taro.request({
      method: 'GET',
      url: url + '/BeautyProject/selectBeautyProjectById?id=' + Current.router.params.id
    }).then((res) => {
      console.log(res)
      var t = res.data;
      var that = this
      if ("" != t.data) {
        var e, i, s, n;
        if (1 == t.data.flashStatus) {
          // 天
          e = parseInt(parseInt(t.data.fail) / (1000 * 60 * 60 * 24)),
            // 时
            i = parseInt((parseInt(t.data.fail) / (1000 * 60 * 60)) % 24),
            // 分
            s = parseInt((parseInt(t.data.fail) / (1000 * 60)) % 60),
            // 秒
            n = parseInt((parseInt(t.data.fail) / 1000) % 60),
            t.data.day = e, t.data.hour = i, t.data.min = s, t.data.second = n;
        }
        for (let i = 0; i < t.data.beautyProjectChoiceList.length; i++) {
          t.data.beautyProjectChoiceList[i].beautyPrice = JSON.parse(t.data.beautyProjectChoiceList[i].beautyPrice);
        }
        t.data.projectBanner = JSON.parse(t.data.projectBanner);
        if ("" != t.data.contentText && null != t.data.contentText) {
          var r = t.data.contentText;
          WxParse.wxParse("article", "html", r, that, 50);
        }
        this.setState({ beautyProjectId: t.data })
        1 == t.data.flashStatus;
        var that = this
        var dd = setInterval(function () {
          var a = that.state.beautyList;
          1 == a.flashStatus && (0 < a.second ? a.second = a.second - 1 : 0 < a.min ? (a.min = a.min - 1,
            a.second = 59) : 0 < a.hour ? (a.hour = a.hour - 1, a.min = 59, a.second = 59) : 0 < a.day ? (a.day = a.day - 1,
              a.hour = 23, a.min = 59, a.second = 59) : (a.is_flash = -1, clearInterval(dd)),
            that.setState({
              beautyList: a
            }));
        }, 1e3);
      }
      this.setState({
        banner: t.data.projectBanner,
        beautyList: t.data,
        choiceList: t.data.beautyProjectChoiceList[0],
      })
    }).catch((err) => {
      console.log(err)
    })

  }

  ms = () => {
    return (
      <View className="list">
        <View className="flash" >
          <View className="flash_l">限时秒杀进行中</View>
          <View className="flash_r">
            <View>剩余:</View>
            <View className="time_box">{this.state.beautyList.day}</View>
            <View>天</View>
            <View className="time_box">{this.state.beautyList.hour}</View>
            <View>:</View>
            <View className="time_box">{this.state.beautyList.min}</View>
            <View>:</View>
            <View className="time_box">{this.state.beautyList.second}</View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>

        <Swiper autoplay={this.state.autoplay} className="banner" duration={this.state.duration} indicatorColor="#ffffff" indicatorDots="true" interval={this.state.interval}>
          {
            this.state.banner.map((bannerItem, index) => {
              return (
                <SwiperItem key={index}>
                  <Image src={bannerItem.imageScr} mode="aspectFit" className="slide-image"></Image>
                </SwiperItem>
              )
            })
          }
        </Swiper>


        {
          this.state.beautyList.flashStatus == 1 ? this.ms() : null
        }

        <View className="list_t">

          <View className="top">
            <View class="price">
              {
                this.state.beautyList.groupStatus == 2 && this.state.beautyList.flashStatus == 2 ?
                  <Text>¥{this.state.beautyList.price}</Text> : null
              }

              {
                this.state.beautyList.groupStatus == 2 && this.state.beautyList.flashStatus == 1 ?
                  <Text>¥{this.state.choiceList.flashPrice}</Text> : null
              }

              {
                this.state.beautyList.price && this.state.beautyList.groupStatus == 2 && this.state.beautyList.flashStatus == 1 ?
                  <Text>¥{this.state.beautyList.price}</Text> : null
              }

              {
                this.state.beautyList.groupStatus == 1 && this.state.beautyList.flashStatus == 1 ?
                  <Text>¥{this.state.choiceList.groupPrice}</Text> : null
              }

              {
                this.state.beautyList.price && this.state.beautyList.groupStatus == 1 && this.state.beautyList.flashStatus == 2 ?
                  <Text>¥{this.state.beautyList.price}</Text> : null
              }


              {
                this.state.beautyList.groupStatus == 1 && this.state.beautyList.flashStatus == 1 ?
                  <Text>¥{this.state.choiceList.groupPrice}</Text> : null
              }

              {
                this.state.beautyList.price && this.state.beautyList.groupStatus == 1 && this.state.beautyList.flashStatus == 1 ?
                  <Text>¥{this.state.beautyList.price}</Text> : null
              }
              <View class="memberPrice">
                <Text class="name">会员专享价：</Text>
                <Text class="memberPrices">￥{this.state.beautyList.price}</Text>
              </View>
              <View class="card">V蓝卡</View>
            </View >
            <View class="title">{this.state.beautyList.name}</View>
            <Button class="share" openType="share">
              <Image src="/image/resource/theme3_27.png"></Image>
              <View>分享</View>
            </Button>
          </View>
        </View>

      </View>
    )
  }
}

export default Detail
