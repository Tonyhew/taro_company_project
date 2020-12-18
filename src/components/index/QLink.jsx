import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import member from '../../Images/icon/member.png'
import FaceConsultation from '../../Images/icon/FaceConsultation.png'
import vr from '../../Images/icon/vr.png'
import talkAbout from '../../Images/icon/talkAbout.png'

class QLink extends Component {

  render() {
    return (
      <View class="QLink" style="height:120rpx; display: flex;">
        <Navigator class="QL_item" url='/pages/card/card'>
          <Image src={member} style="width:80rpx;height:80rpx;"></Image>
          <Text>会员热门</Text>
        </Navigator>

        <Navigator class="QL_item" url>
          <Image src={FaceConsultation} style="width:80rpx;height:80rpx;"></Image>
          <Text>面诊预约</Text>
        </Navigator>

        <Navigator class="QL_item" url>
          <Image src={vr} style="width:80rpx;height:80rpx;"></Image>
          <Text>全景VR</Text>
        </Navigator>

        <Navigator class="QL_item" url>
          <Image src={talkAbout} style="width:80rpx;height:80rpx;"></Image>
          <Text>漫说颌面</Text>
        </Navigator>
      </View>
    )
  }

}

export default QLink
