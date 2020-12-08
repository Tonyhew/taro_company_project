import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import member from '../../images/icon/member.png'
import FaceConsultation from '../../images/icon/FaceConsultation.png'
import vr from '../../images/icon/vr.png'
import talkAbout from '../../images/icon/talkAbout.png'

class QLink extends Component {

  render() {
    return (
      <View class="QLink" style="height:120rpx; display: flex;">
        <Navigator class="QL_item">
          <Image src={member} style="width:80rpx;height:80rpx;"></Image>
          <Text>会员热门</Text>
        </Navigator>

        <Navigator class="QL_item">
          <Image src={FaceConsultation} style="width:80rpx;height:80rpx;"></Image>
          <Text>面诊预约</Text>
        </Navigator>

        <Navigator class="QL_item">
          <Image src={vr} style="width:80rpx;height:80rpx;"></Image>
          <Text>全景VR</Text>
        </Navigator>

        <Navigator class="QL_item">
          <Image src={talkAbout} style="width:80rpx;height:80rpx;"></Image>
          <Text>漫说颌面</Text>
        </Navigator>
      </View>
    )
  }

}

export default QLink
