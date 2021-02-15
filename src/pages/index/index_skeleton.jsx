import React, { Component } from 'react'
import { View, Swiper, SwiperItem, Navigator, Image, Text } from '@tarojs/components'
import './index_skeleton.less'

class Skeleton extends Component {

  render() {
    return (
      <View class="sk-container">
        <View hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_65" style="true">
          <View class="index" hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_64" style="true">
            <Swiper autoplay="false" circular="true" class="banner" current="0" display-multiple-items="1" duration="1000" easing-function="default" id="_n_6" indicator-active-color="#000000" indicator-color="rgba(0, 0, 0, .3)" indicator-dots="true" interval="4000"
              next-margin="0px" previous-margin="0px" style="height: 215px;">
              <SwiperItem class="banner_item" id="_n_68" item-id="true" style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
                <Image class="slide-image sk-image" id="_n_67" mode="aspectFit" style="true"></Image>
              </SwiperItem>
            </Swiper>
            <View class="QLink" hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_23" style="height: 66px;display: flex;">
              <Navigator class="QL_item" delta="1" extra-data="null" hover-class="navigator-hover" hover-start-time="50" hover-stay-time="600" id="_n_10" open-type="navigate" path="true" style="true" version="version">
                <Image id="_n_7" mode="scaleToFill" style="width: 44px;height: 44px;" class="sk-image"></Image>
                <Text id="_n_9" space="true" style="background-position-x: 50%;" class="sk-transparent sk-text-14-2857-674 sk-text">会员热门</Text>
              </Navigator>
              <Navigator class="QL_item" delta="1" extra-data="null" hover-class="navigator-hover" hover-start-time="50" hover-stay-time="600" id="_n_14" open-type="navigate" path="true" style="true" version="version">
                <Image id="_n_11" mode="scaleToFill" style="width: 44px;height: 44px;" class="sk-image"></Image>
                <Text id="_n_13" space="true" style="background-position-x: 50%;" class="sk-transparent sk-text-14-2857-569 sk-text">面诊预约</Text>
              </Navigator>
              <Navigator class="QL_item" delta="1" extra-data="null" hover-class="navigator-hover" hover-start-time="50" hover-stay-time="600" id="_n_18" open-type="navigate" path="true" style="true" version="version">
                <Image id="_n_15" mode="scaleToFill" style="width: 44px;height: 44px;" class="sk-image"></Image>
                <Text id="_n_17" space="true" style="background-position-x: 50%;" class="sk-transparent sk-text-14-2857-511 sk-text">全景VR</Text>
              </Navigator>
              <Navigator class="QL_item" delta="1" extra-data="null" hover-class="navigator-hover" hover-start-time="50" hover-stay-time="600" id="_n_22" open-type="navigate" path="true" style="true" version="version">
                <Image id="_n_19" mode="scaleToFill" style="width: 44px;height: 44px;" class="sk-image"></Image>
                <Text id="_n_21" space="true" style="background-position-x: 50%;" class="sk-transparent sk-text-14-2857-782 sk-text">漫说颌面</Text>
              </Navigator>
            </View>
            <View class="popular" hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_29" style="true">
              <View hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_28" style="true">
                <View class="name" hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_27" style="true">
                  <View hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_24" style="true" class="sk-transparent sk-text-14-2857-603 sk-text">当季热门</View>
                  <View hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_26" style="true"></View>
                </View>
                <Navigator class="item" delta="1" extra-data="null" hover-class="navigator-hover" hover-start-time="50" hover-stay-time="600" id="_n_247" open-type="navigate" path="true" style="true" version="version">
                  <View class="content1" hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_246" style="true">
                    <View hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_242" style="true" class="sk-transparent sk-text-14-2857-447 sk-text">新人专享</View>
                    <View hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_244" style="background-position-x: 50%;" class="sk-transparent sk-text-14-2857-759 sk-text">领取超值大礼包</View>
                    <Image id="_n_245" mode="scaleToFill" style="true" class="sk-image"></Image>
                  </View>
                </Navigator>
                <Navigator class="item" delta="1" extra-data="null" hover-class="navigator-hover" hover-start-time="50" hover-stay-time="600" id="_n_254" open-type="navigate" path="true" style="true" version="version">
                  <View class="content2" hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_253" style="true">
                    <View hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_249" style="true" class="sk-transparent sk-text-14-2857-284 sk-text">院长团介绍</View>
                    <View hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_251" style="true"></View>
                    <Image id="_n_252" mode="scaleToFill" style="true" class="sk-image"></Image>
                  </View>
                </Navigator>
                <Navigator class="item" delta="1" extra-data="null" hover-class="navigator-hover" hover-start-time="50" hover-stay-time="600" id="_n_261" open-type="navigate" path="true" style="true" version="version">
                  <View class="content3" hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_260" style="true">
                    <View hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_256" style="true" class="sk-transparent sk-text-14-2857-781 sk-text">当月热荐</View>
                    <View hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_258" style="true"></View>
                    <Image id="_n_259" mode="scaleToFill" style="true" class="sk-image"></Image>
                  </View>
                </Navigator>
                <Navigator class="item" delta="1" extra-data="null" hover-class="navigator-hover" hover-start-time="50" hover-stay-time="600" id="_n_268" open-type="navigate" path="true" style="true" version="version">
                  <View class="content4" hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_267" style="true">
                    <View hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_263" style="true" class="sk-transparent sk-text-14-2857-654 sk-text">积分商城</View>
                    <View hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_265" style="true"></View>
                    <Image id="_n_266" mode="scaleToFill" style="true" class="sk-image"></Image>
                  </View>
                </Navigator>
              </View>
            </View>
            <View class="recommend" hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_30" style="true">
              <Navigator class="item" delta="1" extra-data="null" hover-class="navigator-hover" hover-start-time="50" hover-stay-time="600" id="_n_274" open-type="navigate" path="true" style="true" version="version">
                <View class="content" hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_273" style="true">
                  <View class="name1 sk-image" hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_271" style="true">
                    <View class="jinri sk-transparent sk-text-14-2857-908 sk-text" hover-class="none" hover-start-time="50" hover-stay-time="400" id="_n_270" style="true">今日推荐</View>
                  </View>
                  <Image id="_n_272" mode="scaleToFill" style="width: 100%;height: 100%;border-radius: 2%;" class="sk-image"></Image>
                </View>
              </Navigator>
            </View>
          </View>
        </View>
      </View>
    )
  }

}

export default Skeleton
