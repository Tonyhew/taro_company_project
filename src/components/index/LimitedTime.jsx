import React, { Component } from 'react';
import Taro from '@tarojs/taro'
import { View, Navigator, Image, ScrollView } from '@tarojs/components';


export default class LimitedTime extends Component {
  
  handleItemNavigator = (id, e) => {
    Taro.navigateTo({
      url: '/pages/service/detail?&id=' + id
    })
  }

  render() {
    return (
      <View class="limitedTime">
        <View class="name">
          <View>{this.props.limitTimeTitle.homeModuleName}</View>
          <View>{this.props.limitTimeTitle.subtitle != null ? this.props.limitTimeTitle.subtitle : ''}</View>
        </View>
        <View class="flash_r">
          <View class="times">
            <View>距结束:</View>
            <View class="time_box">{this.props.listTime.day}</View>
            <View>天</View>
            <View class="time_box">{this.props.listTime.hour}</View>
            <View>时</View>
            <View class="time_box">{this.props.listTime.min}</View>
            <View>分</View>
            <View class="time_box">{this.props.listTime.second}</View>
            <View>秒</View>
          </View>
        </View>
        <ScrollView class="timeSwiper" duration="300" style={{ height: (0 == this.props.displayHeight) ? 0 : this.props.displayHeight + "rpx" }}>
          <View class="commodity">
            {
              this.props.beautyProjectList.map((beautyList, index) => {
                return (
                  <Navigator url class="time" onClick={this.handleItemNavigator.bind(this, beautyList.id)} key={index}>
                    <Image src={beautyList.coverImage}></Image>
                    <View class="item_content">
                      <View class="title" style='font-size:3.5vw;'>{beautyList.name}</View>
                      <View class="condition">{beautyList.groupNumber}人拼团</View>
                      <View class="item_btn">
                        <View style='font-size:13px;'>￥{beautyList.beautyProjectChoiceList[0].flashPrice}</View>
                        <View style='font-size:11px;'>￥{beautyList.price}</View>
                        <View style="background:#D22C38; float: right;">马上抢</View>
                      </View>
                    </View>
                  </Navigator>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}


