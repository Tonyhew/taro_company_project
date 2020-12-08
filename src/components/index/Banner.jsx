import React, { Component } from 'react'
import { Swiper, SwiperItem, Image } from '@tarojs/components'

class Banner extends Component {
  
  render() {
    return (
      <Swiper
        class="banner"
        indicator-dots='true'
        indicatorDots="true"
        autoplay="true"
        interval="4000"
        duration="1000"
        circular='true'
        style="height:390rpx;"
      >
        {
          this.props.banner.map((banner) => {
            return (
              <SwiperItem class="banner_item" key={banner.id}>
                <Image src={banner.bimg} bindtap={banner.link} mode="aspectFit" class="slide-image"></Image>
              </SwiperItem>
            )
          })
        }
      </Swiper>
    )
  }
}

export default Banner
