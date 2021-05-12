import React, { Component } from 'react';
import { View } from '@tarojs/components';
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import { set as setGlobalData, get as getGlobalData } from '../../config/global_data'
import Banner from '../../components/index/Banner';
import QLink from '../../components/index/QLink';
import Popular from '../../components/index/Popular';
import Recommend from '../../components/index/Recommend';
import LimitedTime from '../../components/index/LimitedTime';
import QA from '../../components/index/QA';
import HotTopic from '../../components/index/HotTopic';
import Environment from '../../components/index/Environment';
import Skeleton from './index_skeleton'
import Map from '../../components/index/Map';
import api from '../../config/api';
import './index.less';

var dd,
  s;
export default class Index extends Component {

  state = {
    loading: true,
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
    questionListTitle: [],
    questionList: [],
    hotTopicTitle: [],
    hotTopicList: [],
    environmentTitle: [],
    currentIndex: 0,
    mapTitle: [],
    mapList: []
  }

  constructor(props) {
    super(props)
    var that = this
    dd = setInterval(function () {
      var a = that.state.listTime
      1 == a.flashStatus && (0 < a.second ? a.second = a.second - 1 : 0 < a.min ? (a.min = a.min - 1,
        a.second = 59) : 0 < a.hour ? (a.hour = a.hour - 1, a.min = 59, a.second = 59) : 0 < a.day ? (a.day = a.day - 1,
          a.hour = 23, a.min = 59, a.second = 59) : (a.flashStatus = 2, clearInterval(dd)),
        that.setState({
          listTime: a
        }));
    }, 1e3);
  }

  $instance = getCurrentInstance()

  UNSAFE_componentWillMount() {
    const onReadyEventId = this.$instance.router.onReady
    eventCenter.once(onReadyEventId, () => {
      // onReady 触发后才能获取小程序渲染层的节点
      Taro.createSelectorQuery().select('.index')
        .boundingClientRect()
        .exec(res => {
          this.setState({
            loading: false
          })
        })
    })
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
      header: { //接口返回的数据类/tion/json'
      },
    }).then((res) => {
      this.setState({
        limitTimeTitle: res.data.data
      })
    })

    // 你问我答版块
    Taro.request({
      method: 'GET',
      url: api + '/HomeModule/selectHomeModuleById',
      data: {
        id: 4
      },
      header: { //接口返回的数据类/tion/json'
      },
    }).then((res) => {
      this.setState({
        questionListTitle: res.data.data
      })
    })
    //查询你问我答
    Taro.request({
      url: api + "/Popular/selectPopularTypes",
      data: {
        openid: getGlobalData('openid'),
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
        questionList: res.data.data
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
    })

    // 热门话题版块
    Taro.request({
      method: 'GET',
      url: api + '/HomeModule/selectHomeModuleById',
      data: {
        id: 5
      },
      header: { //接口返回的数据类/tion/json'
      },
    }).then((res) => {
      this.setState({
        hotTopicTitle: res.data.data
      })
    });

    // 热门话题
    Taro.request({
      url: api + "/TopicType/selectTopicType",
      data: {
        status: 1,
        indexType: 1,
        pageIndex: 0,
        pageSize: 10
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(res => {
      this.setState({
        hotTopicList: res.data.data
      })
    })

    // 医院环境
    Taro.request({
      method: 'GET',
      url: api + '/HomeModule/selectHomeModuleById',
      data: {
        id: 9
      },
      header: { //接口返回的数据类/tion/json'
      },
    }).then((res) => {
      this.setState({
        environmentTitle: res.data.data
      })
    })

    Taro.request({
      method: 'GET',
      url: api + '/HomeModule/selectHomeModuleById',
      data: {
        id: 10
      },
      header: { //接口返回的数据类/tion/json'
      },
    }).then((res) => {
      this.setState({
        mapTitle: res.data.data
      })
    })

    Taro.request({
      method: 'POST',
      url: api + '/StoreAddress/selectStoreAddress',
      data: {},
      header: { //接口返回的数据类/tion/json'
      },
    }).then((res) => {
      var str = res.data.data[0].map
      var obj = JSON.parse(str);
      res.data.data[0].map = obj;
      setGlobalData('mapData', obj)
      this.setState({
        mapList: res.data.data
      })
    })

  }

  componentWillUnmount() {
    clearInterval(dd);
    this.setState = (state, callback) => {
      return;
    };
  }

  ske = () => {
    return (
      <Skeleton />
    )
  }


  render() {
    return (
      <View>

        {
          this.state.loading ? this.ske() :
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
              {
                this.state.beautyProjectList.length > 0 ?
                  <LimitedTime
                    limitTimeTitle={this.state.limitTimeTitle}
                    listTime={this.state.listTime}
                    beautyProjectList={this.state.beautyProjectList}
                    displayHeight={this.state.displayHeight}
                  /> : null
              }

              {/* 快速问答 */} 
              <QA
                questionListTitle={this.state.questionListTitle}
                questionListData={this.state.questionList}
              />

              {/* 热门话题 */}                               
              <HotTopic
                hotTopicTitle={this.state.hotTopicTitle}
                hotTopicList={this.state.hotTopicList}
              />

              {/* 亦医亦景 */}
              <Environment
                environmentTitle={this.state.environmentTitle}
                environmental={this.state.environmental}
              />

              {/* 来院路线 */}
              <Map
                mapTitle={this.state.mapTitle}
                mapList={this.state.mapList}
              />

            </View>
        }


      </View>
    )
  }
}
