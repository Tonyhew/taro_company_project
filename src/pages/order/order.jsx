import React, { Component } from 'react';
import Taro, { Current, getStorageSync } from '@tarojs/taro';
import { View, Image, Text, Textarea, Icon } from '@tarojs/components';
import url from '../../config/api';
import './order.less';



class Order extends Component {

  state = {
    curr: 1,
    count: 0,
    page: 0,
    pagesize: 15,
    isbottom: false,
    shadow: !1,
    menu: !1,
    orderList: [],
    content: "",
    refund: 0,
  }

  componentDidShow() {

    console.log(Current.router.params.orderStatus)
    const openidl = getStorageSync('openid');
    let orderData = {
      openid: openidl,
      pageIndex: 0,
      pageSize: this.state.pagesize
    }
    let options = Current.router.params
    if (options.orderStatus != 4) {
      if (options.orderStatus == 1) {
        orderData.payStatus = 2,
          orderData.useStatus = 2,
          orderData.discussStatus = 2,
          orderData.refundStatus = 4;
      } else if (options.orderStatus == 2) {
        orderData.payStatus = 1,
          orderData.useStatus = 2,
          orderData.discussStatus = 2,
          orderData.refundStatus = 4;
      } else if (options.orderStatus == 3) {
        orderData.payStatus = 1,
          orderData.useStatus = 1,
          orderData.discussStatus = 2,
          orderData.refundStatus = 4;
      }
      console.log(orderData)
      //发起网络请求
      Taro.request({
        url: url + '/OrderManagement/selectOrderList',
        data: orderData,
        method: "POST",
        header: {//接口返回的数据类型，可以直接解析数据
          'Content-Type': 'application/json'
        },
      }).then(
        res => {
          console.log(res)
          this.setState({
            curr: options.orderStatus,
            orderList: res.data.data
          })
        }
      )
    } else {
      //发起网络请求
      Taro.request({
        url: url + '/OrderManagement/selectRefundOrder',
        data: {
          openid: openidl,
          payStatus: 1,
          useStatus: 2,
          refundStatus: 4,
          pageIndex: 0,
          pageSize: this.state.pagesize
        },
        method: "POST",
        header: {//接口返回的数据类型，可以直接解析数据
          'Content-Type': 'application/json'
        },
      }).then(
        res => {
          console.log(res)
          this.setState({
            curr: options.orderStatus,
            orderList: res.data.data
          })
        }
      )
    }
  }

  tabChange = (t) => {
    let a = t.currentTarget.dataset.index

    let orderData = {
      openid: getStorageSync('openid'),
      pageIndex: 0,
      pageSize: this.state.pagesize
    };
    if (a != 4) {
      if (a == 1) {
        orderData.payStatus = 2,
          orderData.useStatus = 2,
          orderData.discussStatus = 2,
          orderData.refundStatus = 4;
      } else if (a == 2) {
        orderData.payStatus = 1,
          orderData.useStatus = 2,
          orderData.discussStatus = 2,
          orderData.refundStatus = 4;
      } else if (a == 3) {
        orderData.payStatus = 1,
          orderData.useStatus = 1,
          orderData.discussStatus = 2,
          orderData.refundStatus = 4;
      }
      //发起网络请求
      Taro.request({
        url: url + '/OrderManagement/selectOrderList',
        data: orderData,
        method: "POST",
        header: {//接口返回的数据类型，可以直接解析数据
          'Content-Type': 'application/json'
        },
      }).then(
        res => {
          console.log(res)
          this.setState({
            orderList: res.data.data
          })
        }
      )
    } else {
      //发起网络请求
      Taro.request({
        url: url + '/OrderManagement/selectRefundOrder',
        data: {
          openid: getStorageSync('openid'),
          payStatus: 1,
          useStatus: 2,
          refundStatus: 4,
          pageIndex: 0,
          pageSize: this.state.pagesize
        },
        method: "POST",
        header: {//接口返回的数据类型，可以直接解析数据
          'Content-Type': 'application/json'
        },
      }).then(
        res => {
          console.log(res)
          this.setState({
            orderList: res.data.data
          })
        }
      )
    }
    a != this.state.curr && (this.setState({
      curr: a,
      isbottom: false,
      page: 0
    }))

  }

  input = (e) => {
    console.log(e)
    this.setState({
      content: e.detail.value
    })
  }

  menu_close = () => {
    this.setState({
      shadow: !1,
      menu: !1
    })
  }

  menu_on = (t) => {
    console.log(t)
    let a = t.currentTarget.dataset.index;
    this.setState({
      refund: a,
      shadow: !0,
      menu: !0
    });
  }

  menu_btn = () => {
    let that = this,
      t = this.state.content;
    if ("" != t && null != t) {
      this.setState({
        content: "",
        shadow: !1,
        menu: !1
      });
      let a = {
        outTradeNo: this.state.orderList[this.state.refund].outTradeNo,
        content: t
      };
      Taro.request({
        url: url + "/OrderManagement/insertRefundOrder",
        data: a,
        method: "POST",
        header: {//接口返回的数据类型，可以直接解析数据
          'Content-Type': 'application/json'
        },

      }).then(
        res => {
          if ("" != res.data.data) {
            Taro.showToast({
              title: "提交成功",
              icon: "success",
              duration: 2e3
            });
            let a = this.state.orderList;
            a.splice(that.state.refund, 1), that.setState({
              orderList: a
            });
          }
        }
      )
    } else {
      Taro.showToast({
        title: "请填写理由",
        icon: "none",
        duration: 2e3
      });
    }
  }

  order_del = (t) => {
    let that = this,
      a = t.currentTarget.dataset.index;
    Taro.showModal({
      title: "提示",
      content: "确定取消订单吗？",
      success: function (t) {
        t.confirm ? Taro.request({
          url: url + "/OrderManagement/deleteOrder?outTradeNo=" + that.state.orderList[a].outTradeNo,
          method: "GET",
          header: {//接口返回的数据类型，可以直接解析数据
            'Content-Type': 'application/json'
          },

        }).then(
          res => {
            if ("" != res.data.data) {
              Taro.showToast({
                title: "取消成功",
                icon: "success",
                duration: 2e3
              });
              let n = that.state.orderList;
              n.splice(a, 1), that.setState({
                orderList: n
              });
            }
          }
        ) : t.cancel && console.log("用户点击取消");
      }
    });

  }

  to_detail = (t) => {
    let a = t.currentTarget.dataset.index
    Taro.navigateTo({
      url: 'detail?&outTradeNo=' + this.state.orderList[a].outTradeNo
    })
  }

  render() {

    return (
      <View class="page">

        <View class="nav">
          <View onClick={this.tabChange.bind(this)} data-index="1" style={{ color: (this.state.curr == 1) ? '#508eea' : '', borderBottom: (this.state.curr == 1) ? '#508eea 5rpx solid' : '' }}>待付款</View>
          <View onClick={this.tabChange.bind(this)} data-index="2" style={{ color: (this.state.curr == 2) ? '#508eea' : '', borderBottom: (this.state.curr == 2) ? '#508eea 5rpx solid' : '' }}>已付款</View>
          <View onClick={this.tabChange.bind(this)} data-index="3" style={{ color: (this.state.curr == 3) ? '#508eea' : '', borderBottom: (this.state.curr == 3) ? '#508eea 5rpx solid' : '' }}>待评价</View>
          <View onClick={this.tabChange.bind(this)} data-index="4" style={{ color: (this.state.curr == 4) ? '#508eea' : '', borderBottom: (this.state.curr == 4) ? '#508eea 5rpx solid' : '' }}>退售后</View>
        </View>
        <View class="nav_block"></View>
        <View class="list">

          {

            this.state.orderList.length === 0 ?
              <View class="item2">
                <View class="page404">
                  <Image src="http://video.seouleaguer.com/order_404.png"></Image>
                  <View>暂无内容</View>
                </View>
              </View> :
              this.state.orderList.map((item, index) => {
                return (
                  <View class="item" key={index}>
                    <View class="item_c">
                      <Image src={item.productImage}></Image>
                      <View class="title">{item.productName}</View>
                      <View class="info">
                        <View>¥{item.amount}</View>
                        <View style='display:none'>¥{item.oAmount}</View>
                        <View>×{item.total}</View>
                      </View>
                    </View>
                    <View class="item_t">
                      <View>订单编号：{item.outTradeNo}</View>

                      {
                        item.payStatus == 2 ?
                          <>
                            <View>待付款</View>
                          </> : null
                      }

                      {
                        item.payStatus == 1 && item.useStatus == 2 ?
                          <>
                            <View>未使用({item.isUse}/{item.canUse})</View>
                          </> : null
                      }

                      {
                        item.payStatus == 1 && item.useStatus == 1 ?
                          <>
                            <View>已完成</View>
                          </> : null
                      }

                      {
                        item.payStatus == 1 && item.refundStatus != 4 ?
                          <View>退款中</View> : null
                      }

                      {
                        item.payStatus == 1 && item.refundStatus == 1 ?
                          <View>已退款</View> : null
                      }
                    </View>
                    <View class="item_b">
                      <View class="info">
                        <View>下单时间：{item.createtime}</View>
                        {
                          item.payStatus == 2 ?
                            <View>
                              应付款：<Text class="price">¥{item.amount}</Text>
                            </View> : null
                        }

                        {
                          item.payStatus == 1 ?
                            <View>
                              实付款：<Text class="price">¥{item.oAmount}</Text>
                            </View> : null
                        }

                      </View>

                      {
                        item.failtime && item.status == -1 ?
                          <View class="info">
                            <View>失效时间：{item.failtime}</View>
                          </View> : null
                      }

                    </View>
                    <View class="item_d">
                      <View class="btn">
                        {
                          item.payStatus == 2 ?
                            <View onClick={this.order_del.bind(this)} class="btn1" data-index={index}>
                              取消
                          </View> : null
                        }

                        {
                          item.payStatus == 2 ?
                            <View class="btn2" style="background:#508eea;" onClick={this.to_detail.bind(this)} data-index={index}>
                              去支付
                          </View> : null
                        }

                        {
                          item.payStatus === 1 &&
                            item.useStatus === 2 &&
                            item.oAmount != 0 &&
                            item.refundStatus === 4 ?
                            <View onClick={this.menu_on.bind(this)} class="btn1" data-index={index}>
                              申请退款
                          </View> : null
                        }

                        {
                          item.payStatus == 1 && item.useStatus == 1 && item.discussStatus === 2 ?
                            <View catchtap="to_discuss" class="btn2" data-index={index} style="background:#508eea;">
                              去评价
                          </View> : null
                        }

                        {
                          item.payStatus == 1 && item.useStatus == 1 && item.discussStatus == 1 ?
                            <View class="btn2">已评价</View> : null
                        }

                        {
                          item.refundStatus === 3 ? <View class="btn3">退款申请审核中</View> : null
                        }

                        {
                          item.refundStatus === 2 ? <View class="btn3">退款中</View> : null
                        }

                        {
                          item.refundStatus === 1 ? <View class="btn3">退款已完成</View> : null
                        }

                      </View>
                    </View>
                  </View>
                )
              })
          }

        </View>

        {
          this.state.shadow && this.state.menu ?
            <View>
              <View class="shadow"></View>
              <View class="menu">
                <Icon onClick={this.menu_close.bind(this)} class="menu_close" color="#aaa" size="23" type="cancel"></Icon>
                <View class="menu_item">
                  <View>退款说明：</View>
                  <Textarea onInput={this.input.bind(this)} fixed="true" value={this.state.content}></Textarea>
                </View>
                <View onClick={this.menu_btn.bind(this)} class="menu_btn" style="background:#508eea">确定</View>
              </View>
            </View>
            : null
        }

      </View>
    )

  }

}

export default Order;


























