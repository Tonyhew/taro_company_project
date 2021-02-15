import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { Swiper, SwiperItem, Image } from '@tarojs/components';

class Banner extends Component {

  link = (a) => {
    let t = a.currentTarget.dataset.link,
      n = a.currentTarget.dataset.appid,
      e = a.currentTarget.dataset.linkType
    "" != n && null != n ? Taro.navigateToMiniProgram({
      appId: n,
      path: "",
      success: function (a) {
      },
      fail: function () {
        Taro.showModal({
          title: "错误",
          content: "跳转失败"
        });
      }
    }) : "" != t && null != t && (-1 != t.indexOf("../") ? Taro.navigateTo({
      url: t
    }) : (t = escape(t), Taro.navigateTo({
      url: "../link/link?&id=" + t,

    }
    )));

  }

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
                <Image src={banner.bimg} onClick={this.link.bind(this)} data-link={banner.link} data-linkType='1' mode="aspectFit" class="slide-image"></Image>
              </SwiperItem>
            )
          })
        }
      </Swiper>
    )
  }
}

export default Banner
