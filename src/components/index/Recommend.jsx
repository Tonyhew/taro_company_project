import React, { Component } from 'react'
import { View, Navigator, Image } from '@tarojs/components'

class Recommend extends Component {
  render() {
    return (
      <View class="recommend">
        {
          this.props.recommend.map((recommend, index) => {
            return (
              <Navigator key={index} class="item" url={recommend.link ? '/pages/link/link?id=' + recommend.link : '#'}>
                <View class="content">
                  <View class="name1">
                    <View class="jinri">{recommend.pictureName}</View>
                  </View>
                  <Image src={recommend.pictureUrl} bindtap='link' style="width:100%;height:100%;border-radius:2%;"></Image>
                </View>
              </Navigator>
            )
          })
        }
      </View>
    )
  }
}

export default Recommend
