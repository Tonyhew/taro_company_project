import React, { Component } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import Banner from '../../components/index/Banner';
import QLink from '../../components/index/QLink';
import Popular from '../../components/index/Popular';
import Recommend from '../../components/index/Recommend';
import LimitedTime from '../../components/index/LimitedTime'
import api from '../../config/api';
import './index.less';


export default class Index extends Component {

  state = {
    pagesize: 3,
    banner: [],
    hotSeasonTitle: [],
    limitTimeTitle: [],
    seasonPopular: [],
    recommend: [],
    honor: [],
    environmental: [],
    listTime: {},
    displayHeight: 0,
    beautyProjectList: [],
  }

  componentDidShow() {

    // 获取banner图片
    Taro.request({
      method: 'POST',
      url: api + '/Banner/selectBanner',
      data: {
        status: 1
      },
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      this.setState({
        banner: res.data.data
      })
    })

    // 首页当季热门标题获取
    Taro.request({
      method: 'GET',
      url: api + '/HomeModule/selectHomeModuleById',
      data: {
        id: 1
      },
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      this.setState({
        hotSeasonTitle: res.data.data
      })
    })

    // 首页限时秒杀标题获取
    Taro.request({
      method: 'GET',
      url: api + '/HomeModule/selectHomeModuleById',
      data: {
        id: 3
      },
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      console.log(res)
      this.setState({
        limitTimeTitle: res.data.data
      })
    })

    // 首页图片获取
    Taro.request({
      method: 'POST',
      url: api + '/PictureManage/selectPictureManage',
      data: {
        status: 1,
        pageIndex: 1,
        pageSize: 30
      },
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      this.setState({
        seasonPopular: res.data.data.seasonPopular,
        recommend: res.data.data.recommend,
        honor: res.data.data.honorList,
        environmental: res.data.data.environmentalList,
      })
    })


    Taro.request({
      method: 'POST',
      url: api + '/BeautyProject/selectBeautyProjectList',
      data: {
        status: 1,
        flashStatus: 1,
        classification: 1,
        pageIndex: 0,
        pageSize: this.state.pagesize
      },
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      console.log(res)
      var e, i, s, n;
      var listTime = {};
      if (res.data.data.length > 0) {
        if (1 == res.data.data[0].flashStatus) {
          // 天
          e = parseInt(parseInt(res.data.data[0].fail) / (1000 * 60 * 60 * 24)),
            // 时
            i = parseInt((parseInt(res.data.data[0].fail) / (1000 * 60 * 60)) % 24),
            // 分
            s = parseInt((parseInt(res.data.data[0].fail) / (1000 * 60)) % 60),
            // 秒
            n = parseInt((parseInt(res.data.data[0].fail) / 1000) % 60),
            listTime.day = e, listTime.hour = i, listTime.min = s, listTime.second = n;
        }
        listTime.flashStatus = res.data.data[0].flashStatus;
      }
      var swiperHeight = 0;
      if (res.data.data.length < 4 && res.data.data.length > 0) {
        swiperHeight = res.data.data.length * 200 + res.data.data.length * 50 + 45;
      } else if (res.data.data.length > 0) {
        swiperHeight = 3 * 200 + 3 * 50 + 45;
      }

      this.setState({
        listTime: listTime,
        displayHeight: swiperHeight,
        beautyProjectList: res.data.data
      })

      console.log(this.state.beautyProjectList)
    })
    
    var that = this
    var dd = setInterval(function () {
      var a = that.state.listTime
      1 == a.flashStatus && (0 < a.second ? a.second = a.second - 1 : 0 < a.min ? (a.min = a.min - 1,
        a.second = 59) : 0 < a.hour ? (a.hour = a.hour - 1, a.min = 59, a.second = 59) : 0 < a.day ? (a.day = a.day - 1,
          a.hour = 23, a.min = 59, a.second = 59) : (a.flashStatus = 2, clearInterval(dd)),
        that.setState({
          listTime: a
        }));
    }, 1e3);

  }


  render() {
    return (
      <View className='index'>
        {/* Banner */}
        <Banner banner={this.state.banner} />
        {/* 快速链接 */}
        <QLink />
        {/* 新人专享等 */}
        <Popular hotSeasonTitle={this.state.hotSeasonTitle} seasonImg={this.state.seasonPopular} />
        {/* 今日推荐 */}
        <Recommend recommend={this.state.recommend} />
        {/* 限时秒杀 */}
        <LimitedTime
          limitTimeTitle={this.state.limitTimeTitle}
          listTime={this.state.listTime}
          beautyProjectList={this.state.beautyProjectList}
          displayHeight={this.state.displayHeight}
        />


      </View>
    )
  }
}
