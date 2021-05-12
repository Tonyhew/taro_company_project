import React, { Component } from 'react'
import { View, Image, Navigator } from '@tarojs/components'
import icon1 from '../../image/icon/icon-1.png'

class HotTopic extends Component {

  componentDidShow() {
  }

  render() {
    return (
      <View class="topic">
        <View class="name">
          <View>{this.props.hotTopicTitle.homeModuleName}</View>
          <View>{this.props.hotTopicTitle.subtitle != null ? this.props.hotTopicTitle.subtitle : ''}</View>
        </View>
        <Navigator url="/topicComponent/topic/topic?&currentTab=0">
          <View class="more">更多 》</View>
        </Navigator>
        {
          this.props.hotTopicList.map(item => {
            return (
              <Navigator key={item.id} class="topicList" url={item.path != null ? item.path : '/pages/topic/topic?&currentTab=0'}>
                <Image src={icon1}></Image>
                <View class="topicTitle">{item.topicTypeName}</View>
              </Navigator>
            )
          })
        }
      </View>
    )
  }
}

export default HotTopic








