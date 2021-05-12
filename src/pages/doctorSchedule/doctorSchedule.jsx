import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import url from '../../config/api';
import './doctorSchedule.less';

class DoctorList extends Component {

  state = {
    curr: 0,
    shadow: false,
    indicatorActivecolor: '#347BE9',
    popupSwitch: false,
    doctorScheduleImage: [],
    plasticSurgery: [],
    nonSurgical: [],
    stomatology: [],
  }

  componentDidShow() {

    Taro.request({
      url: url + '/President/selectPresidentInfo',
      data: {
        status: 1,
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => {

        let plasticSurgery = res.data.data.plasticSurgery;
        let nonSurgical = res.data.data.nonSurgical;
        let stomatology = res.data.data.stomatology;
        for (let i = 0; i < plasticSurgery.length; i++) {
          plasticSurgery[i].zuoPin = JSON.parse(plasticSurgery[i].zuoPin);
        }
        for (let i = 0; i < nonSurgical.length; i++) {
          nonSurgical[i].zuoPin = JSON.parse(nonSurgical[i].zuoPin);
        }
        for (let i = 0; i < stomatology.length; i++) {
          stomatology[i].zuoPin = JSON.parse(stomatology[i].zuoPin);
        }

        this.setState({
          plasticSurgery: plasticSurgery,
          nonSurgical: nonSurgical,
          stomatology: stomatology
        })

      }
    )

    Taro.request({
      url: url + '/Recharge/selectRecharge',
      data: {
        xkey: "popupSwitch"
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      }
    }).then(
      res => {
        res.data.data[0].content = JSON.parse(res.data.data[0].content)
        this.setState({
          popupSwitch: res.data.data[0].content.status
        })
      }
    )

  }

  plasticSurgery = (e) => {

    let doctorId = e.currentTarget.dataset.doctorsId,
      plasticSurgeryList = this.state.plasticSurgery,
      doctorScheduleImages = this.state.plasticSurgery;

    for (let i = 0; i < plasticSurgeryList.length; i++) {
      if (plasticSurgeryList[i].id == doctorId) {
        doctorScheduleImages = plasticSurgeryList[i];
      }
    }

    if (this.state.popupSwitch) {
      this.setState({
        shadow: true,
        curr: doctorId,
        doctorScheduleImage: doctorScheduleImages
      })
    }

  }

  nonSurgical = (e) => {

    let doctorId = e.currentTarget.dataset.doctorsId,
      nonSurgicalList = this.state.nonSurgical,
      doctorScheduleImages = this.state.nonSurgical;

    for (let i = 0; i < nonSurgicalList.length; i++) {
      if (nonSurgicalList[i].id == doctorId) {
        doctorScheduleImages = nonSurgicalList[i];
      }
    }

    if (this.state.popupSwitch) {
      this.setState({
        shadow: true,
        curr: doctorId,
        doctorScheduleImage: doctorScheduleImages
      })
    }

  }

  stomatology = (e) => {
    let doctorId = e.currentTarget.dataset.doctorsId,
      stomatologyList = this.state.nonSurgical,
      doctorScheduleImages = this.state.nonSurgical;

    for (let i = 0; i < stomatologyList.length; i++) {
      if (stomatologyList[i].id == doctorId) {
        doctorScheduleImages = stomatologyList[i];
      }
    }

    if (this.state.popupSwitch) {
      this.setState({
        shadow: true,
        curr: doctorId,
        doctorScheduleImage: doctorScheduleImages
      })
    }
  }

  close = () => {
    this.setState({
      shadow: false,
      curr: 0,
    })
  }


  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
}

  render() {

    return (
      <View>
        <View class="prompt">此坐诊信息仅供参考，详情请咨询客服</View>
        <View class="shell">
          <View class="label">整形外科</View>
          <View class="doctorInformation">
            {
              this.state.plasticSurgery.map((item, index) => {
                return (
                  <View
                    class="dcl"
                    key={index}
                  >
                    <View
                      class="kezi"
                      onClick={this.plasticSurgery.bind(this)}
                      data-doctorsId={item.id}
                    >
                      <Image
                        class={this.state.curr == item.id ? 'avatar' : ''}
                        src={this.state.curr == item.id ? item.bimg : item.simg}
                        mode="widthFix"></Image>
                      <View class="name">{item.name}</View>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View class="shell">
          <View class="label">美容皮肤科</View>
          <View class="doctorInformation">
            {
              this.state.nonSurgical.map((item, index) => {
                return (
                  <View
                    class="dcl"
                    key={index}
                  >
                    <View
                      class="kezi"
                      onClick={this.nonSurgical.bind(this)}
                      data-doctorsId={item.id}
                    >
                      <Image
                        class={this.state.curr == item.id ? 'avatar' : ''}
                        src={this.state.curr == item.id ? item.bimg : item.simg}
                        mode="widthFix"></Image>
                      <View class="name">{item.name}</View>
                    </View>
                  </View>
                )
              })
            }

          </View>
        </View >
        <View class="shell">
          <View class="label">口腔科</View>
          <View class="doctorInformation">

            {
              this.state.stomatology.map((item, index) => {
                return (
                  <View
                    class="dcl"
                    key={index}>
                    <View
                      class="kezi"
                      onClick={this.stomatology.bind(this)}
                      data-doctorsId={item.id}>
                      <Image
                        class={this.state.curr == item.id ? 'avatar' : ''}
                        src={this.state.curr == item.id ? item.bimg : item.simg}
                        mode="widthFix"></Image>
                      <View class="name">{item.name}</View>
                    </View>
                  </View>
                )
              })
            }

          </View>
        </View >

        {
          this.state.shadow && this.state.popupSwitch ?
            <>
              <View class="shadow"></View>
              <View class="doctorSchedule" catchMove>
                <Image class="switch" src="/Images/card/close.png" onClick={this.close.bind(this)}></Image>

                {

                  <View class="mainBody">
                    <Image class="doctorScheduleImage" src={this.state.doctorScheduleImage.code} mode="widthFix"></Image>
                    <View class="introduction">
                      <Swiper
                        class="scrolls"
                        indicator-dots='true'
                        indicatorDots="true"
                        autoplay="true"
                        interval="6000"
                        duration="4000"
                        indicator-active-color={this.state.indicatorActivecolor}
                        style="height:516rpx;"
                      >

                        {
                          this.state.doctorScheduleImage.zuoPin.map((item, index) => {
                            return (
                              <SwiperItem class="picture" key={index}>
                                <Image class="roster" src={item.image} mode="widthFix"></Image>
                              </SwiperItem>
                            )
                          })
                        }

                      </Swiper>
                      <View class=""></View>
                    </View>
                  </View>
                }

              </View >
            </> : null
        }



      </View >
    )
  }

}


export default DoctorList;










