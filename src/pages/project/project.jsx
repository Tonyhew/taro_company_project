import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image, Navigator, Text, ScrollView } from '@tarojs/components';
import url from '../../config/api';
import './project.less'

export default class Project extends Component {

  state = {
    winWidth: 0,
    winHeight: 0,
    leftMargin: '0rpx',
    rightMargin: '0rpx',
    currentIndex: 0,
    pagesize: 100,
    BeautyProjectBanner: [],
    loading: false,
    homeModuleList: {},
    beautifyClass: [],
    beautyProjectList: {},
    activitiesTheme1: [],
    activitiesTheme2: [],
    activitiesOfTheMonthList: []
  }

  componentDidShow() {

    this.setState({
      homeModuleList: Taro.getStorageSync('homeModuleList')[10]
    })

    // 获取屏幕的高度
    let sysInfo = Taro.getSystemInfoSync();
    let winHeight = sysInfo.windowHeight;
    let winWidth = sysInfo.windowWidth;
    this.setState({
      winWidth: winWidth,
      winHeight: winHeight
    })

    // 获取项目页Banner
    Taro.request({
      url: url + "/BeautyProjectBanner/selectBanner",
      data: {
        status: 1
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      }
    }).then(
      res => {
        this.setState({
          BeautyProjectBanner: res.data.data
        })
      }
    )

    // 获取活动推荐
    Taro.request({
      url: url + '/Recharge/selectRecharge',
      data: {
        xkey: "activities_of_the_month"
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      }
    }).then(
      res => {
        if (res.data.errCode == 0 && res.data.data.length > 0) {
          res.data.data[0].content = JSON.parse(res.data.data[0].content);
          this.setState({
            activitiesOfTheMonthList: res.data.data[0].content.activitiesImageList,
            activitiesTheme1: res.data.data[0].content.activitiesTheme[0].theme1[0],
            activitiesTheme2: res.data.data[0].content.activitiesTheme[0].theme2[0]
          })
        }
      }
    )

    Taro.request({
      url: url + '/BeautyProjecType/selectBeautyProjectTypeList',
      data: {
        "status": 1,
        "navigationStatus": 1
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        this.setState({
          beautifyClass: res.data.data
        })
      }
    )

    // 获取所有项目列表产品
    Taro.request({
      url: url + '/BeautyProject/selectBeautyProjectIndex',
      data: {
        status: 1,
        classification: 1,
        pageIndex: 0,
        pageSize: this.state.pagesize
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        this.setState({
          beautyProjectList: res.data.data
        })
      }
    )


  }

  handleChange = (e) => {
    this.setState({
      currentIndex: e.detail.current
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
        {
          this.state.homeModuleList.status == 1 ?
            <View>

              {/* 项目页头Banner */}
              <View class="headPicture">
                <Swiper class="banner" autoplay="true" interval="4000" duration="1000" circular='true'>

                  {
                    this.state.BeautyProjectBanner.map((item, index) => {
                      return (
                        <SwiperItem key={index}>
                          <Navigator url={item.link}>
                            <Image src={item.bimg} mode="widthFix" class="slide-image"></Image>
                          </Navigator>
                        </SwiperItem>
                      )
                    })
                  }

                </Swiper>
              </View>

              {/* 项目导航 */}
              <View class="navigationIcon">
                {
                  this.state.beautifyClass.map((item, index) => {
                    return (
                      <Navigator key={index} class="icon" url={"/pages/service/typeService?typeId=" + item.id}>
                        <Image src={item.typeIcon}></Image>
                        <Text>{item.name}</Text>
                      </Navigator>
                    )
                  })
                }
              </View>

              {/* 活动推荐 */}
              {
                this.state.activitiesOfTheMonthList.length > 0 ?
                  <View class="activitiesOfTheMonth">
                    <View class="activitiesTheme">
                      <View class="theme1">
                        <Image src={this.state.activitiesTheme1.image}></Image>
                        <View class="theme1Name">{this.state.activitiesTheme1.name}</View>
                        <View class="theme">{this.state.activitiesTheme1.subtitle}</View>
                      </View>
                      <View class="theme2">
                        <Image class="theme2Image" src={this.state.activitiesTheme2.imageLeft}></Image>
                        <View class="theme2Name">{this.state.activitiesTheme2.title}</View>
                        <Image class="theme2Image" src={this.state.activitiesTheme2.imageRight}></Image>
                      </View>
                    </View>
                    <ScrollView scroll-x="true" class="themeNavigation" onClick={this.handleChange.bind(this)}>
                      {
                        this.state.activitiesOfTheMonthList.map((item, index) => {
                          return (
                            <View class="poster " key={index}>
                              <Navigator url="#">
                                <View class="label">
                                  <Image src={item.imageUrl} mode="heightFix"></Image>
                                  <View>{item.activitiesName}</View>
                                </View>
                                <Image src={item.activitiesimage} mode="widthFix"></Image>
                              </Navigator>
                            </View>
                          )
                        })
                      }

                    </ScrollView>
                  </View> : null
              }


              <ScrollView class="mallProject" scrollY="true" scrollTop={this.state.winHeight}>

                {
                  // 面部轮廓项目
                  this.state.beautyProjectList[1] ?
                    <View class="projectModule">
                      <View class="label">
                        <View class="blueLabel"></View>
                        <View class="labelName">面部轮廓</View>
                      </View>
                      <View class="polling" >
                        {
                          this.state.beautyProjectList[1].map((item, index) => {
                            return (

                              <Navigator class="commodity" url={"../service/detail?&id=" + item.id} key={index}>
                                <Image src={item.coverImage} mode="aspectFit"></Image>
                                <View class="flex-display">
                                  <View class="title">{item.name}</View>
                                  <View class="item_btn">
                                    <View class="price">

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 2 ?
                                          <Text>¥{item.price}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 1 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].flashPrice}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 1 && item.flashStatus == 2 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].groupPrice}</Text> : null
                                      }

                                    </View>
                                    <View class="btn">选规格</View>
                                  </View>
                                </View>
                              </Navigator>

                            )
                          })
                        }

                      </View>
                    </View>
                    : null
                }

                {
                  // 胸部整形项目
                  this.state.beautyProjectList[2] ?
                    <View class="projectModule">
                      <View class="label">
                        <View class="blueLabel"></View>
                        <View class="labelName">胸部整形</View>
                      </View>
                      <View class="polling" >
                        {
                          this.state.beautyProjectList[2].map((item, index) => {
                            return (

                              <Navigator class="commodity" url={"../service/detail?&id=" + item.id} key={index}>
                                <Image src={item.coverImage} mode="aspectFit"></Image>
                                <View class="flex-display">
                                  <View class="title">{item.name}</View>
                                  <View class="item_btn">
                                    <View class="price">

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 2 ?
                                          <Text>¥{item.price}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 1 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].flashPrice}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 1 && item.flashStatus == 2 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].groupPrice}</Text> : null
                                      }

                                    </View>
                                    <View class="btn">选规格</View>
                                  </View>
                                </View>
                              </Navigator>

                            )
                          })
                        }

                      </View>
                    </View>
                    : null
                }

                {
                  // 鼻部整形项目
                  this.state.beautyProjectList[3] ?
                    <View class="projectModule">
                      <View class="label">
                        <View class="blueLabel"></View>
                        <View class="labelName">鼻部整形</View>
                      </View>
                      <View class="polling" >
                        {
                          this.state.beautyProjectList[3].map((item, index) => {
                            return (

                              <Navigator class="commodity" url={"../service/detail?&id=" + item.id} key={index}>
                                <Image src={item.coverImage} mode="aspectFit"></Image>
                                <View class="flex-display">
                                  <View class="title">{item.name}</View>
                                  <View class="item_btn">
                                    <View class="price">

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 2 ?
                                          <Text>¥{item.price}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 1 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].flashPrice}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 1 && item.flashStatus == 2 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].groupPrice}</Text> : null
                                      }

                                    </View>
                                    <View class="btn">选规格</View>
                                  </View>
                                </View>
                              </Navigator>

                            )
                          })
                        }

                      </View>
                    </View>
                    : null
                }

                {
                  // 眼部整形项目
                  this.state.beautyProjectList[4] ?
                    <View class="projectModule">
                      <View class="label">
                        <View class="blueLabel"></View>
                        <View class="labelName">眼部整形</View>
                      </View>
                      <View class="polling" >
                        {
                          this.state.beautyProjectList[4].map((item, index) => {
                            return (

                              <Navigator class="commodity" url={"../service/detail?&id=" + item.id} key={index}>
                                <Image src={item.coverImage} mode="aspectFit"></Image>
                                <View class="flex-display">
                                  <View class="title">{item.name}</View>
                                  <View class="item_btn">
                                    <View class="price">

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 2 ?
                                          <Text>¥{item.price}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 1 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].flashPrice}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 1 && item.flashStatus == 2 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].groupPrice}</Text> : null
                                      }

                                    </View>
                                    <View class="btn">选规格</View>
                                  </View>
                                </View>
                              </Navigator>

                            )
                          })
                        }

                      </View>
                    </View>
                    : null
                }

                {
                  // 肤色项目
                  this.state.beautyProjectList[5] ?
                    <View class="projectModule">
                      <View class="label">
                        <View class="blueLabel"></View>
                        <View class="labelName">肤色</View>
                      </View>
                      <View class="polling" >

                        {
                          this.state.beautyProjectList[5].map((item, index) => {
                            return (

                              <Navigator class="commodity" url={"../service/detail?&id=" + item.id} key={index}>
                                <Image src={item.coverImage} mode="aspectFit"></Image>
                                <View class="flex-display">
                                  <View class="title">{item.name}</View>
                                  <View class="item_btn">
                                    <View class="price">

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 2 ?
                                          <Text>¥{item.price}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 1 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].flashPrice}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 1 && item.flashStatus == 2 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].groupPrice}</Text> : null
                                      }

                                    </View>
                                    <View class="btn">选规格</View>
                                  </View>
                                </View>
                              </Navigator>

                            )
                          })
                        }

                      </View>
                    </View>
                    : null
                }

                {
                  // 肤质项目
                  this.state.beautyProjectList[6] ?
                    <View class="projectModule">
                      <View class="label">
                        <View class="blueLabel"></View>
                        <View class="labelName">肤质</View>
                      </View>
                      <View class="polling" >

                        {
                          this.state.beautyProjectList[6].map((item, index) => {
                            return (

                              <Navigator class="commodity" url={"../service/detail?&id=" + item.id} key={index}>
                                <Image src={item.coverImage} mode="aspectFit"></Image>
                                <View class="flex-display">
                                  <View class="title">{item.name}</View>
                                  <View class="item_btn">
                                    <View class="price">

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 2 ?
                                          <Text>¥{item.price}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 1 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].flashPrice}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 1 && item.flashStatus == 2 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].groupPrice}</Text> : null
                                      }

                                    </View>
                                    <View class="btn">选规格</View>
                                  </View>
                                </View>
                              </Navigator>

                            )
                          })
                        }

                      </View>
                    </View>
                    : null
                }

                {
                  // 肤龄项目
                  this.state.beautyProjectList[7] ?
                    <View class="projectModule">
                      <View class="label">
                        <View class="blueLabel"></View>
                        <View class="labelName">肤龄</View>
                      </View>
                      <View class="polling" >

                        {
                          this.state.beautyProjectList[7].map((item, index) => {
                            return (

                              <Navigator class="commodity" url={"../service/detail?&id=" + item.id} key={index}>
                                <Image src={item.coverImage} mode="aspectFit"></Image>
                                <View class="flex-display">
                                  <View class="title">{item.name}</View>
                                  <View class="item_btn">
                                    <View class="price">

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 2 ?
                                          <Text>¥{item.price}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 1 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].flashPrice}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 1 && item.flashStatus == 2 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].groupPrice}</Text> : null
                                      }

                                    </View>
                                    <View class="btn">选规格</View>
                                  </View>
                                </View>
                              </Navigator>

                            )
                          })
                        }

                      </View>
                    </View>
                    : null
                }

                {
                  // 肤形项目
                  this.state.beautyProjectList[8] ?
                    <View class="projectModule">
                      <View class="label">
                        <View class="blueLabel"></View>
                        <View class="labelName">肤形</View>
                      </View>
                      <View class="polling" >

                        {
                          this.state.beautyProjectList[8].map((item, index) => {
                            return (

                              <Navigator class="commodity" url={"../service/detail?&id=" + item.id} key={index}>
                                <Image src={item.coverImage} mode="aspectFit"></Image>
                                <View class="flex-display">
                                  <View class="title">{item.name}</View>
                                  <View class="item_btn">
                                    <View class="price">

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 2 ?
                                          <Text>¥{item.price}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 1 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].flashPrice}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 1 && item.flashStatus == 2 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].groupPrice}</Text> : null
                                      }

                                    </View>
                                    <View class="btn">选规格</View>
                                  </View>
                                </View>
                              </Navigator>

                            )
                          })
                        }

                      </View>
                    </View>
                    : null
                }

                {
                  // 口腔项目
                  this.state.beautyProjectList[9] ?
                    <View class="projectModule">
                      <View class="label">
                        <View class="blueLabel"></View>
                        <View class="labelName">口腔</View>
                      </View>
                      <View class="polling" >

                        {
                          this.state.beautyProjectList[9].map((item, index) => {
                            return (

                              <Navigator class="commodity" url={"../service/detail?&id=" + item.id} key={index}>
                                <Image src={item.coverImage} mode="aspectFit"></Image>
                                <View class="flex-display">
                                  <View class="title">{item.name}</View>
                                  <View class="item_btn">
                                    <View class="price">

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 2 ?
                                          <Text>¥{item.price}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 2 && item.flashStatus == 1 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].flashPrice}</Text> : null
                                      }

                                      {
                                        item.groupStatus == 1 && item.flashStatus == 2 ?
                                          <Text>¥{item.beautyProjectChoiceList[0].groupPrice}</Text> : null
                                      }

                                    </View>
                                    <View class="btn">选规格</View>
                                  </View>
                                </View>
                              </Navigator>

                            )
                          })
                        }

                      </View>
                    </View>
                    : null
                }

                {/* <View class="end"></View> */}

              </ScrollView>

            </View> :
            <View class="page2">
              <View class="page404">
                <Image src="http://video.seouleaguer.com/404_picture.png"></Image>
                <View>正在努力装修中</View>
                <View>敬请期待...</View>
              </View>
            </View>
        }
      </View>
    )
  }
}

