import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro, { Current } from '@tarojs/taro'
import url from '../../config/api'
import bonusPoints from '../../image/icon/bonusPoints.png'
import bonusPointsSeleted from '../../image/icon/bonusPointsSeleted.png'
import pointsDetails from '../../image/icon/pointsDetails.png'
import pointsDetailsSeleted from '../../image/icon/pointsDetailsSeleted.png'
import './score.less'

class Score extends Component {

  state = {
    curr: 1,
    winHeight: 0,
    winWidth: 0,
    page: 1,
    pagesize: 20,
    userInfo: [],
    couponList: [],
    scoreList: [],
  }

  componentDidShow() {

    if (Current.router.params.curr == 2) {
      this.setState({
        curr: Current.router.params.curr
      })
    }

    this.setState({
      userInfo: Taro.getStorageSync('userMeta')
    })

    let openid = Taro.getStorageSync('openid')
    // 获取优惠券列表
    Taro.request({
      url: url + '/CouponNew/selectCouponNewList',
      data: {
        openid: openid,
        status: 1
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        this.setState({
          couponList: res.data.data
        })
      }
    )

    // 获取积分列表
    Taro.request({
      url: url + '/Score/selectScore',
      data: {
        openid: openid,
        pageIndex: 0,
        pageSize: this.state.pagesize
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        this.setState({
          scoreList: res.data.data
        })
      }
    )


  }

  clickTab = (e) => {
    let index = e.currentTarget.dataset.index
    this.setState({
      curr: index
    })

  }

  to_coupon = (o) => {
    let that = this
    let e = o.currentTarget.dataset.index
    let openid = Taro.getStorageSync('openid')
    console.log(openid)
    if (this.state.couponList[e].claimStatus == 2 && this.state.userInfo.card == 1) {
      Taro.showModal({
        title: "提示",
        content: "确定兑换优惠券吗？",
        success: (o) => {
          o.confirm ? Taro.request({
            url: url + '/UserInfo/updateUserInfoScore',
            data: {
              openid: openid,
              scoreStatus: 2,
              consumptionReason: "兑换优惠券",
              score: this.state.couponList[e].score,
              beautyId: this.state.couponList[e].beautyId
            },
            method: "POST",
            header: { //接口返回的数据类型，可以直接解析数据
              'Content-Type': 'application/json'
            },
            success: function (score) {

              if (score.data.errCode == 0) {
                let coupon = {
                  openid: openid,
                  couponType: that.state.couponList[e].couponTypeName,
                  cid: that.state.couponList[e].id,
                  status: -1,
                  name: that.state.couponList[e].couponPrice,
                  condition: that.state.couponList[e].couponUsageConditions,
                  expiration: that.state.couponList[e].endTime
                }
                if (that.state.couponList[e].specifyType == 2) {
                  if (that.state.couponList[e].beautyId != null) {
                    coupon.beautyId = that.state.couponList[e].beautyId;
                  }
                  Taro.request({
                    url: url + "/UserCoupon/insertUserCoupon",
                    data: coupon,
                    method: "POST",
                    header: { //接口返回的数据类型，可以直接解析数据
                      'Content-Type': 'application/json'
                    },
                    success: function (o) {
                      if ("" != o.data.data) {
                        Taro.showToast({
                          title: "兑换成功",
                          icon: "success",
                          duration: 2e3
                        });
                        let t = that.state.couponList,
                          a = that.state.userInfo;
                        a.score = parseInt(a.score) - parseInt(t[e].score), t[e].claimStatus = 1,
                          that.setState({
                            couponList: t,
                            userinfo: a

                          });
                      }
                    }
                  })
                } else {
                  if (that.state.couponList[e].beautyId != null) {
                    coupon.beautyId = that.state.couponList[e].beautyId;
                  }
                  Taro.request({
                    url: url + "/UserCoupon/updatGetCoupons",
                    data: coupon,
                    method: "POST",
                    header: { //接口返回的数据类型，可以直接解析数据
                      'Content-Type': 'application/json'
                    },
                    success: function (o) {
                      if ("" != o.data.data) {
                        Taro.showToast({
                          title: "兑换成功",
                          icon: "success",
                          duration: 2e3
                        });
                        var t = that.state.couponList,
                          a = that.state.userinfo;
                        a.score = parseInt(a.score) - parseInt(t[e].score), t[e].claimStatus = 1,
                          n.setData({
                            couponList: t,
                            userinfo: a

                          });
                      }
                    }
                  })
                }
              } else {
                Taro.showToast({
                  title: score.data.errMsg,
                  icon: "success",
                  duration: 2e3
                });
              }
            }
          }) : o.cancel && console.log("用户点击取消");
        }
      })
    } else {
      Taro.showModal({
        title: "错误",
        content: "请前往‘主页’先开通会员！",
        success: function (o) {
          o.confirm ? console.log("用户点击确定") : o.cancel && console.log("用户点击取消");
        }
      })
    }

  }


  render() {
    return (
      <View>
        <View class="top">
          <View class="round">
            <View>{this.state.userInfo.score}</View>
            <View>可用积分</View>
          </View>
          <View class="assetDetails">
            <View class="balance" data-index="1" onClick={this.clickTab.bind(this)}>
              {
                this.state.curr == 1 ? <Image src={bonusPointsSeleted}></Image> : <Image src={bonusPoints} data-index="1"></Image>
              }

              <View data-index="1">积分兑好礼</View>
            </View>
            <View class="line"></View>
            <View class="balance" data-index="2" onClick={this.clickTab.bind(this)}>
              {
                this.state.curr == 2 ? <Image src={pointsDetailsSeleted}></Image> : <Image src={pointsDetails} data-index="2"></Image>
              }

              <View data-index="2">积分明细</View>
            </View>
          </View>
        </View>

        {
          this.state.curr == 1 ?
            <View class="content_list">
              <View class="rule">兑换说明：使用积分兑换优惠券可在积分商城兑换礼品，也可以在变美项目提交订单时抵用现金使用</View>

              {
                this.state.couponList.map((item, index) => {
                  return (
                    <View class="item" key={index}>
                      <View class="couponPricet" onClick={item.claimStatus == 1 ? '' : this.to_coupon.bind(this)} data-index={index}>
                        <Image src={item.claimStatus == 1 ? item.pictureReceived : item.unclaimedPicture}></Image>
                      </View>
                    </View>
                  )
                })
              }


            </View> : null
        }


        {
          this.state.curr == 2 ?
            <View class="pointsDetails">
              <View class="pointsTop">
                <View></View>
                <View>积分明细</View>
              </View>
              <View class="splitLine"></View>
              {
                this.state.scoreList.map((item, index) => {
                  return (
                    <View class="pointsItem" key={index}>
                      <View>{item.title}</View>
                      <View style={{ color: item.status == 1 ? '#3B81E9' : '#E7455A' }}>
                        {item.status == 1 ? '+' : '-'}{item.score}
                      </View>
                      <View>{item.createtime}</View>
                      <View class="splitLine"></View>
                    </View>
                  )
                })
              }
            </View> : null
        }

      </View>
    )
  }

}


export default Score
