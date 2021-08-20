import React, { Component } from 'react';
import { View, Image } from '@tarojs/components'
import './evaluation.less'

class Evaluation extends Component {


  render() {

    return (
      <View className="notice">
        <View className="noticePicture">
          <Image src="http://video.seouleaguer.com/serviceCommentery.jpg" mode="widthFix"></Image>
        </View>
      </View>
    )

  }


}

export default Evaluation;
