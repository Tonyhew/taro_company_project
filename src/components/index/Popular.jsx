import React, { Component } from 'react'
import { View, Image, Navigator } from '@tarojs/components'

class Popular extends Component {
  render() {
    return (
      <View class="popular">
        <View>
          <View class="name">
            <View>{this.props.hotSeasonTitle.homeModuleName}</View>
            <View>{this.props.hotSeasonTitle.subtitle != null ? this.props.hotSeasonTitle.subtitle : ''}</View>
          </View>

          {
            this.props.seasonImg.map((seasonImg, index) => {
              return (
                <Navigator class="item" url={seasonImg.jumpConnection} key={index}>
                  <View class={seasonImg.className}>
                    <View>
                      {seasonImg.pictureLabelOne}
				            </View>
                    <View>
                      {seasonImg.pictureLabelTwo != null ? seasonImg.pictureLabelTwo : ''}
				            </View>
                    <Image src={seasonImg.pictureUrl}></Image>
                  </View>
                </Navigator>
              )
            })
          }

        </View>
      </View>
    )
  }
}


export default Popular
