import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Text, Button, Navigator } from '@tarojs/components'
import url from '../../config/api'
import { Current } from '@tarojs/taro'
import theme3_27 from '../../image/resource/theme3_27.png'
import './detail.less'
import relieved from '../../image/icon/relieved.png'

var dd;
class Detail extends Component {

  constructor(props) {
    super(props)
    var that = this
    dd = setInterval(function () {
      var a = that.state.beautyList;
      1 == a.flashStatus && (0 < a.second ? a.second = a.second - 1 : 0 < a.min ? (a.min = a.min - 1,
        a.second = 59) : 0 < a.hour ? (a.hour = a.hour - 1, a.min = 59, a.second = 59) : 0 < a.day ? (a.day = a.day - 1,
          a.hour = 23, a.min = 59, a.second = 59) : (a.is_flash = -1, clearInterval(dd)),
        that.setState({
          beautyList: a
        }));
    }, 1e3);
  }

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
    discussList: [],
    guaranteeStatus: [],
  }

  componentDidShow() {

    Taro.request({
      method: 'GET',
      url: url + '/BeautyProject/selectBeautyProjectById?id=' + Current.router.params.id
    }).then((res) => {
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


      }
      this.setState({
        banner: t.data.projectBanner,
        beautyList: t.data,
        choiceList: t.data.beautyProjectChoiceList[0],
      })
    })

    // 获取评论信息
    Taro.request({
      url: url + '/Discuss/selectDiscuss',
      data: {
        pid: Current.router.params.id,
        type: 1,
        status: 1,
        pageIndex: 0,
        pageSize: 5
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        console.log(res)

        for (let L = 0; L < res.data.data.length; L++) {
          if (res.data.data[L].imgs != null) {
            res.data.data[L].imgs = JSON.parse(res.data.data[L].imgs);
          }
          if (res.data.data[L].content.length > 84) {
            res.data.data[L].num = 1;
          } else {
            res.data.data[L].num = 2;
          }
        }

        this.setState({
          discussList: res.data.data
        })

      }
    )

    // 模块管理
    let homeModuleList = Taro.getStorageSync('homeModuleList')
    this.setState({
      guaranteeStatus: homeModuleList[12]
    })



  }



  componentWillUnmount() {
    clearInterval(dd);
    this.setState = (state, callback) => {
      return;
    };
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

  button = () => {
    return (
      <Button class="share" openType="share">
        <Image src={theme3_27}></Image>
        <View>分享</View>
      </Button>
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
                  <Image src={bannerItem.imageScr} mode="aspectFit" className="slide-Image"></Image>
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
            {
              this.state.beautyList.groupStatus == 1 ? this.button() : null
            }
          </View>
        </View>

        {/* <View class="commodityGuarantee">
          <Text class="punctuation"></Text>
          <Text class="guaranteeName">颌面专家</Text>
          <Text class="punctuation"> </Text>
          <Text class="guaranteeName">院长面诊</Text>
          <Text class="punctuation"></Text>
          <Text class="guaranteeName">纯韩颌面专家团</Text>
        </View> */}

        {
          this.state.guaranteeStatus.status == 1 ?
            <View class="guarantee">
              <Image src={relieved}></Image>
              <Text class="punctuation"></Text>
              <Text class="guaranteeName" style="font-weight: bold;">安心购</Text>
              <Text class="punctuation"></Text>
              <Text class="guaranteeName">颜值精选</Text>
              <Text class="punctuation"></Text>
              <Text class="guaranteeName">安心服务</Text>
              <Text class="punctuation"></Text>
              <Text class="guaranteeName">极速审核</Text>
            </View> : null
        }

        {
          this.state.discussList.length > 0 ?
            <View class="discuss">
              <View class="discussNumber">
                <View></View>
                <View>用户评论</View>
                {/* <View>{count ? count : 0}人</View> */}
              </View>

              {
                this.state.discussList.map((item, index) => {
                  return (
                    <View class="discussDetail" key={index}>
                      <View class="user">
                        <Image src={item.avatar}></Image>
                        <View class="name">{item.nick}</View>
                        {/* <!--星星评价--> */}
                        <View class="comment1-description">
                          <View class="star-pos">
                            <View class="starsM  {{flag2>=1? '': 'hideStar'}}" onClick="changeColor11"></View>
                            <View class="starsM  {{flag2>=2? '': 'hideStar'}}" onClick="changeColor12"></View>
                            <View class="starsM  {{flag2>=3? '': 'hideStar'}}" onClick="changeColor13"></View>
                            <View class="starsM  {{flag2>=4? '': 'hideStar'}}" onClick="changeColor14"></View>
                            <View class="starsM  {{flag2>=5? '': 'hideStar'}}" onClick="changeColor15"></View>
                          </View>
                        </View>
                      </View>
                      <View class="discussName">【项目】{this.state.beautyList.name}</View>
                      <View class="discussCount {{item.num==1?'textHiding':''}}">{item.content}</View>
                      <View>全文</View>
                      <View class="Image">
                        <View class="ImageList">
                          <Image src={item.imgs[0].pictureUrl}></Image>
                        </View>
                        <View class="ImageList">
                          <Image src={item.imgs[1].pictureUrl}></Image>
                        </View>
                        <View class="ImageList">
                          <Image src={item.imgs[2].pictureUrl}></Image>
                        </View>
                      </View>
                    </View>
                  )
                })
              }

              {
                this.state.discussList.length >= 5 ?
                  <Navigator class="comment" url={"../../pages/discuss/index?&id=" + this.state.beautyList.id}>
                    <View class="discussList"> 查看更多评价 》</View>
                  </Navigator> : null
              }

            </View> : null
        }

        {
          // this.state.beautyList.groupStatus==1 && group_list
          // <view class="group" wx:if="{{beautyProjectId.groupStatus==1&&group_list}}">
          // 	<view bindtap="to_more" class="title">
          // 		<view>以下小伙伴正在发起拼团，您可以直接参与：</view>
          // 		<view>更多></view>
          // 	</view>
          // 	<view class="list">
          // 		<view class="item" wx:for="{{group_list}}" wx:for-index="idx" wx:key="idx">
          // 			<image src="{{item.avatar}}"></image>
          // 			<view class="item_content">
          // 				<view>{{item.nick}}</view>
          // 				<view>
          // 					<view class="item_btn">还差{{item.total-item.teamTotal}}人成团</view>
          // 					<view class="item_times">剩余{{item.hour}}:{{item.min}}:{{item.second}}</view>
          // 				</view>
          // 			</view>
          // 			<view bindtap="to_group" class="group_btn" data-index="{{idx}}" wx:if="{{item.isGroup!=1}}">参团</view>
          // 			<view class="group_btn" wx:if="{{item.isGroup==1}}">已参</view>
          // 		</view>
          // 	</view>
          // </view>
        }


      </View >
    )
  }
}

export default Detail
