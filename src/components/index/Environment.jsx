import React, { Component } from 'react'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import classNames from 'classnames'

class Environment extends Component {

  state = {
    currentIndex: 0
  }

  handleChange = (e) => {
    this.setState({
      currentIndex: e.detail.current
    })
  }

  render() {
    return (
      <View class="environmentalS">
        <View class="name" style="margin-left:16rpx;margin-bottom:0rpx">
          <View>{this.props.environmentTitle.homeModuleName}</View>
          <View>{this.props.environmentTitle.subtitle != null ? this.props.environmentTitle.subtitle : ''}</View>
        </View>
        <Swiper autoplay interval={5000} circular previous-margin="80rpx" next-margin="80rpx" onChange={this.handleChange.bind(this)}>
          {
            this.props.environmental.map((envir, index) => {
              return (
                <SwiperItem key={index}>
                  {
                    this.state.currentIndex == index ?
                      <Image src={envir.pictureUrl} className={classNames('slide-image', 'active')} /> :
                      <Image src={envir.pictureUrl} className={classNames('slide-image')} />
                  }

                </SwiperItem>
              )
            })
          }
        </Swiper>
      </View>
    )
  }
}

export default Environment














