import React, { Component } from 'react';
import { View, Navigator, Image, Canvas, Text } from '@tarojs/components';
import Taro, { Current } from '@tarojs/taro';
import order01 from '../../image/resource/order01.png';
import order02 from '../../image/resource/order02.png';
import order03 from '../../image/resource/order03.png';
import url from '../../config/api';
import QR from '../../utils/qrcode'
import './detail.less'

class Detail extends Component {

  state = {
    imagePath: '',
    orderDetails: {},
    maskHidden: !1,
    shadow: !1,
    code: !1,
    o_amount: '0',
    urls: [],
  }

  setCanvasSize = () => {
    var a = {};
    try {
      var t = Taro.getSystemInfoSync(), e = .53 * t.windowWidth, o = e;
      a.w = e, a.h = o;
    } catch (a) {
      console.log("获取设备信息失败" + a);
    }
    return a;
  }

  createQrCode = (a, t, e, o) => {
    QR.api.draw(a, t, e, o)
    var n = this,
      i = setTimeout(function () {
        n.canvasToTempImage(),
          clearTimeout(i);
      }, 3e3);
  }

  canvasToTempImage = () => {
    var e = this;
    Taro.canvasToTempFilePath({
      canvasId: "mycanvas",
      success: function (a) {
        var t = a.tempFilePath;
        e.setState({
          imagePath: t
        });
      },
      fail: function (a) {
        console.log(a);
      }
    });
  }

  previewImage = () => {
    var t = this.state.imagePath;
    console.log(t)
    Taro.previewImage({
      current: t,
      urls: [t]
    });
  }

  componentDidShow() {

    console.log(Current.router)
    let that = this;
    Taro.request({
      url: url + '/OrderManagement/selectOrderById?outTradeNo=' + Current.router.params.outTradeNo,
      method: "GET",
      header: {//接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        console.log(res)
        if ("" != res.data.data) {
          if (1 == res.data.data.payStatus) {
            this.setState({
              maskHidden: !1
            })
            if (res.data.data.scoreMoney === 0) {
              Taro.showToast({
                title: "生成中...",
                icon: "loading",
                duration: 2e3
              });
            }
            var e = setTimeout(function () {
              Taro.hideToast();
              let a = that.setCanvasSize();
              let id = String(res.data.data.outTradeNo) + "已付款";
              that.createQrCode(id, "mycanvas", a.w, a.h),
                that.setState({
                  maskHidden: !0,
                  shadow: !0,
                  code: !0
                }),
                clearTimeout(e);
            }, 2e3);
          }
          this.setState({
            orderDetails: res.data.data,
            o_amount: res.data.data.oAmount
          });
        }
      }
    )

  }


  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  }

  order_del = (t) => {
    console.log(t.currentTarget)
    Taro.showModal({
      title: "提示",
      content: "确定取消订单吗？",
      success: function (t) {
        t.confirm ? Taro.request({
          url: url + "/OrderManagement/deleteOrder?outTradeNo=" + this.state.orderDetails.outTradeNo,
          method: "GET",
          header: {//接口返回的数据类型，可以直接解析数据
            'Content-Type': 'application/json'
          },
          success: function (t) {
            if ("" != t.data.data) {
              Taro.showToast({
                title: "取消成功",
                icon: "success",
                duration: 2e3
              });
              Taro.navigateBack({
                delta: 1
              });
            }
          }
        }) : t.cancel && console.log("用户点击取消");
      }
    });
  }

  pay = () => {
    Taro.navigateTo({
      url: "/pages/pagePay/payOrder/pay?&outTradeNo=" + this.state.orderDetails.outTradeNo
    });
  }

  render() {

    return (
      <>
        {
          this.state.orderDetails.scoreMoney == 0 ?
            <View class="page">
              <View class="top">
                {
                  this.state.orderDetails.payStatus == 2 ?
                    <>
                      <Image src={order01}></Image>
                      <View >待付款</View>
                    </> : null
                }

                {
                  this.state.orderDetails.payStatus == 1 && this.state.orderDetails.useStatus == 2 ?
                    <>
                      <Image src={order02}></Image>
                      <View >待使用</View>
                    </> : null
                }

                {
                  this.state.orderDetails.payStatus == 1 && this.state.orderDetails.useStatus == 1 ?
                    <>
                      <Image src={order03}></Image>
                      <View >已使用</View>
                    </> : null
                }

              </View>
              <View class="item_c">
                <Image src={this.state.orderDetails.productImage}></Image>
                <View class="title">{this.state.orderDetails.productName}</View>
                <View class="item_info">
                  <View>¥{this.state.orderDetails.productPrice}</View>
                  <View>×{this.state.orderDetails.total}</View>
                </View>
              </View>
              <View class="tip">
                {
                  this.state.orderDetails.payStatus == 2 ?
                    <>
                      <View >应付款</View>
                      <View >¥{this.state.orderDetails.amount}</View>
                    </> : null

                }

                {
                  this.state.orderDetails.payStatus == 1 ?
                    <>
                      <View >实付款</View>
                      <View >¥{this.state.orderDetails.oAmount}</View>
                    </> : null

                }

              </View>
              {
                this.state.orderDetails.payStatus == 1 ?
                  <View class="code ">
                    <View class='more'>使用凭证</View>
                    <Canvas onClick={this.previewImage.bind(this)} canvasId="mycanvas" />
                    <View class="item" style="color:#508eea;">
                      {this.state.orderDetails.useStatus == 1 ? '已使用' : '未使用'}
                      <Text>({this.state.orderDetails.isUse}/{this.state.orderDetails.canUse})</Text>
                      <Text style='color:#333'>(到店出示该二维码，店家核销)</Text>
                    </View>
                  </View> : null
              }


              <View class="info">
                <View class='more'>订单详情</View>
                <View>订单编号：{this.state.orderDetails.outTradeNo}</View>
                <View>下单时间：{this.state.orderDetails.createtime}</View>
                <View>失效时间：{this.state.orderDetails.endTime}</View>
                <View>预约时间：{this.state.orderDetails.planDate}</View>
                <View >门店：上海首尔丽医疗美容医院</View>
                <View >指定专家：{this.state.orderDetails.memberName}</View>
                <View>支付方式：{this.state.orderDetails.payType == 1 ? '余额支付' : '微信支付'}</View>
                <View >核销记录：
            <View >{this.state.orderDetails.heLog != null ? this.state.orderDetails.heLog.time : '暂无核销记录'}</View>
                </View>
              </View>

              {
                this.state.orderDetails.payStatus == 2 ?
                  <View class="btn">
                    <View onClick={this.order_del.bind(this)} class="btn1">取消订单</View>
                    <View onClick={this.pay.bind(this)} class="btn2" style="background:#508eea;">立即付款</View>
                  </View> : null
              }

              <View class="bottom"></View>




            </View>
            :
            <View class="body">
              <View class="ODCont2" style="background-color:#fff">
                <View class="listBox flex-display flex-alignC">
                  <Navigator
                    class="imgBlock"
                    url={"../mall/detail?&id=" + this.state.orderDetails.productId}
                  >
                    <Image mode="aspectFill" src={this.state.orderDetails.productImage}></Image>
                  </Navigator>
                  <View class="Text flex-flex1">
                    <View class="h1">{this.state.orderDetails.productName}</View>
                    <View class="h2">
                      规格：<Text class="sp1">{this.state.orderDetails.format ? this.state.orderDetails.format : '无'}</Text>
                    </View>
                    <View class="p" style="color:{{theme.color}};">
                      数量：<Text class="sp1">{this.state.orderDetails.total}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View class="ODCont4">
                <View class="listBox flex-display flex-alignC" style="background-color:#fff" >
                  <View class="name flex-flex1">金额</View>
                  <View class="Text" style="color:{{theme.color}};">￥{this.state.orderDetails.amount}</View>
                </View>
                <View class="listBox flex-display flex-alignC" style="background-color:#fff" >
                  <View class="name flex-flex1">积分</View>
                  <View class="Text sp1" style="color:{{theme.color}};">{this.state.orderDetails.scoreMoney}积分</View>
                </View>
                <View class="listBox flex-display flex-alignC" style="background-color:#fff" >
                  <View class="name flex-flex1">优惠卷</View>
                  <View class="Text sp1" style="color:{{theme.color}};">-￥{this.state.orderDetails.couponPrice}</View>
                </View>
                <View class="listBox flex-display flex-alignC" style="background-color:#fff">
                  <View class="name flex-flex1">新人满立减</View>
                  <View class="Text sp1" style="color:{{theme.color}};">-￥{this.state.orderDetails.prize_fee}</View>
                </View>
                <View class="listBox flex-display flex-alignC" style="background-color:#fff">
                  <View class="name flex-flex1">实付合计</View>
                  <View class="Text" style="color:{{theme.color}};">￥{this.state.orderDetails.oAmount}</View>
                </View>
              </View>
              <View class="ODTitle">配送信息</View>
              <View class="ODCont5">
                <View class="listBox flex-display" style="background-color:#fff">
                  <View class="name">收货人</View>
                  <View class="Text flex-flex1">{this.state.orderDetails.accountName} {this.state.orderDetails.accountMobile}</View>
                </View>
                <View class="listBox flex-display" style="background-color:#fff" >
                  <View class="name">收货地址</View>
                  <View class="Text flex-flex1">{this.state.orderDetails.accountAddress} {this.state.orderDetails.accountContent ? this.state.orderDetails.accountContent : ''}</View>
                </View>
                <View class="listBox flex-display" style="background-color:#fff" >
                  <View class="name">门店</View>
                  <View class="Text flex-flex1">上海首尔丽格医疗美容医院</View>
                </View>
                <View class="listBox flex-display" style="background-color:#fff">
                  <View class="name">配送方式</View>
                  {
                    this.state.orderDetails.peiType == 1 ?
                      <View class="Text flex-flex1">商家配送</View> : <View class="Text flex-flex1">自提</View>
                  }
                </View>
              </View>
              <View class="ODTitle">订单信息</View>
              <View class="ODCont5">
                <View class="listBox flex-display" style="background-color:#fff">
                  <View class="name">订单号</View>
                  <View class="Text flex-flex1">{this.state.orderDetails.outTradeNo}</View>
                </View>
                <View class="listBox flex-display" style="background-color:#fff">
                  <View class="name">下单时间</View>
                  <View class="Text flex-flex1">{this.state.orderDetails.createtime}</View>
                </View>
                <View class="listBox flex-display" style="background-color:#fff">
                  <View class="name">订单状态</View>
                  {
                    this.state.orderDetails.useStatus == 2 && this.state.orderDetails.payStatus == 1 ?
                      <View class="Text flex-flex1" >待核销</View> : null
                  }

                  {
                    this.state.orderDetails.useStatus == 1 && this.state.orderDetails.payStatus == 1 ?
                      <View class="Text flex-flex1" >已核销</View> : null
                  }

                  {
                    this.state.orderDetails.payStatus == 2 && this.state.orderDetails.refundStatus == 4 ?
                      <View class="Text flex-flex1" >退款中</View> : null
                  }

                  {
                    this.state.orderDetails.payStatus == 2 && this.state.orderDetails.refundStatus == 1 ?
                      <View class="Text flex-flex1" >已退款</View> : null
                  }

                </View>

                {
                  this.state.orderDetails.payStatus == 2 && this.state.orderDetails.refundStatus == 3 ?
                    <View class="listBox flex-display" style="background-color:#fff" >
                      <View class="name">退款原因</View>
                      <View class="Text flex-flex1">{this.state.orderDetails.tuiContent}</View>
                    </View> : null
                }

              </View>
              <View class="tip"></View>
            </View>
        }
      </>

    )

  }

}

export default Detail;



























