import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
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

  }

  render() {
    return (
      <View>
        Project
      </View>
    )
  }
}

