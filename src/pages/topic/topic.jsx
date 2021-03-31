import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import classNames from 'classnames'
import SearchBox from '../../components/topic/searchBox';
import icon1 from '../../image/icon/icon-1.png'
import url from '../../config/api';
import './topic.less'

class Topic extends Component {

  state = {
    currentTab: 0,
    topicList: [],
    communityList: [{
      "id": 1,
      "content": "手术都有一定的风险性，但是经验丰富和技术高德医生可以将风险降到最低，并且需求和手术方案是否合理也在一定上影响了手术风险性，所以在术前要和医生做好沟通。",
      "author": "Angela"
    },
    {
      "id": 2,
      "content": "手术都有一定的风险性，但是经验丰富和技术高德医生可以将风险降到最低，并且需求和手术方案是否合理也在一定上影响了手术风险性，所以在术前要和医生做好沟通。",
      "author": "Angela"
    },
    {
      "id": 3,
      "content": "手术都有一定的风险性，但是经验丰富和技术高德医生可以将风险降到最低，并且需求和手术方案是否合理也在一定上影响了手术风险性，所以在术前要和医生做好沟通。手术都有一定的风险性，但是经验丰富和技术高德医生可以将风险降到最低，并且需求和手术方案是否合理也在一定上影响了手术风险性，所以在术前要和医生做好沟通。手术都有一定的风险性，但是经验丰富和技术高德医生可以将风险降到最低，并且需求和手术方案是否合理也在一定上影响了手术风险性，所以在术前要和医生做好沟通。手术都有一定的风险性，但是经验丰富和技术高德医生可以将风险降到最低，并且需求和手术方案是否合理也在一定上影响了手术风险性，所以在术前要和医生做好沟通。",
      "author": "Angela"
    }
    ]
  }

  componentDidShow() {
    Taro.request({
      url: url + '/Topic/selectTopicList',
      data: {
        status: 1,
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => [
        this.setState({
          topicList: res.data.data
        })
      ]
    )
  }

  changeTab = (e) => {
    if (this.state.currentTab === e.target.dataset.index) {
      return false;
    } else {
      this.setState({
        currentTab: e.target.dataset.index
      })
    }
  }

  topicId = (e) => {
    var t = e.currentTarget.dataset.topicId;
    "" != t && null != t ?
      (t = escape(t), Taro.navigateTo({
        url: "/pages/link/link?&id=" + t
      }))
      : console.log("失败");
  }

  render() {
    return (
      <View>
        <View class="sousuo">
          <View>

            <SearchBox id="SearchBar" />

          </View>
        </View>
        <View class="nav">
          <View class={classNames('swiper-tab-item', this.state.currentTab == 0 ? 'active' : '')} data-index="0" onClick={this.changeTab.bind(this)}>热门问答</View>
          <View class={classNames('swiper-tab-item', this.state.currentTab == 1 ? 'active' : '')} data-index="1" onClick={this.changeTab.bind(this)}>颜值社区</View>
        </View>
        <View class="nav_block"></View>

        {
          this.state.currentTab == 1 ?
            <View class="topicList">
              {
                this.state.topicList.map((item, index) => {
                  return (
                    <View key={index} class="piece" onClick={this.topicId.bind(this)} data-topicId={item.linkType}>
                      <View class="titel">{item.title}</View>
                      <Image src={item.images}></Image>
                      <View class="count">{item.content}</View>
                      <View class="line"></View>
                    </View>
                  )
                })
              }
            </View> : null
        }

        {
          this.state.currentTab == 0 ?
            <View class="community">
              {
                this.state.communityList.map((item, index) => {
                  return (
                    <View class="piece2" key={index}>
                      <Image src={icon1}></Image>
                      <View class="content">{item.content}</View>
                      <View class="author">——{item.author}</View>
                    </View>
                  )
                })
              }
            </View> : null
        }
      </View >
    )
  }

}


export default Topic












