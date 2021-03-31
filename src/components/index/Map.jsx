import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import location from '../../image/icon/location.png'
import { set as setGlobalData, get as getGlobalData } from '../../config/global_data'


class Map extends Component {

  map = () => {
    let t = getGlobalData('mapData');
    let latitude = t.latitude;
    let longitude = t.longitude;
    Taro.openLocation({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      name: this.props.mapList[0].name,
      address: this.props.mapList[0].address,
      scale: 28
    })
  }

  render() {
    return (
      <View class="address">
        <View class="name">
          <View>{this.props.mapTitle.homeModuleName}</View>
          <View>{this.props.mapTitle.subtitle != null ? this.props.mapTitle.subtitle : ''}</View>
        </View>
        <View class='content' onClick={this.map}>
          {
            this.props.mapList.map((item, index) => {
              return (
                <Image key={index} src={item.mapImage} style="width:100%;" mode="widthFix" />
              )
            })
          }
          <View class="placeName" style="filter:alpha(opacity:0.5);opacity:0.5;">
            <View>
              <Image src={location} style="width:8px;height:11px" mode="aspectFit" />
            </View>
            <View style="padding:20rpx 10rpx 20rpx;font-size:10px">上海市杨浦区秦皇岛路32号</View>
          </View>
          <View class="route" style="">
            <Image src="https://applets.seouleaguer.com/images/2020/09/laiyuanxianluzhiying.png" style="width:100%;height:100%;" />
          </View>
        </View>
      </View>
    )
  }
}

export default Map

























