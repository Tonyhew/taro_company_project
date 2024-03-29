import React, { Component } from 'react';
import Taro, { Current } from '@tarojs/taro'
import {
  View,
  Image,
  Input,
  Text,
  Form,
  ScrollView,
  Icon,
  Button,
} from '@tarojs/components';
import url from '../../config/api';
import couponSelected from '../../image/icon/couponSelected.png'
import './pay.less'



class Pay extends Component {

  state = {
    pay_type: 2,
    coupon_curr: -1,
    can_pay: true,
    coupon_price: 0,
    userip: null,
    money: null,
    giveMoney: null,
    requestMsgNumber: 0,
    isIphoneX: true,
    address: {},
    userinfo: {},
    list: {},
    o_amount: 0,
    coupon: [],
    menu: false,
    shadow: false,
    sign: false,
    sign_error: false,
    password: '',
  }

  // 倒计时
  time_down = () => {
    this.setState({
      times: 30
    });
    let t = this
    let a = setInterval(function () {
      0 == t.state.times ? (t.setState({
        can_pay: !0
      }), clearInterval(a)) : t.setState({
        times: t.data.times - 1
      });
    }, 1e3);
  }

  // 订阅信息
  requestMSG = () => {
    return new Promise((resolve, reject) => {
      Taro.requestSubscribeMessage({
        tmplIds: ['37_7craO_ro3miIGu924c9mLOGQwOF_wT5nArY3yps'],
      }).then(
        res => {
          if (res['-37_7craO_ro3miIGu924c9mLOGQwOF_wT5nArY3yps'] === 'accept') {
            this.setState({
              requestMsgNumber: 1
            })
            Taro.showToast({
              title: '订阅OK!',
              duration: 1000,
            }).then(
              resolve()
            )
          }
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    })
  }

  wxPay = (a) => {
    console.log(this)
  }

  componentDidShow() {


    let outTradeNol = Current.router.params.outTradeNo
    let openId = Taro.getStorageSync('openid');
    // 获取用户个人信息，余额等
    Taro.request({
      url: url + '/UserInfo/selectUserInfo?openid=' + openId,
      method: "GET",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      }
    }).then(
      res => {
        console.log(res)
        let address = {
          name: res.data.data.name,
          mobile: res.data.data.mobile
        };
        this.setState({
          address: address,
          userinfo: res.data.data
        })
      }
    )
    // 获取商品信息，价格等
    Taro.request({
      url: url + '/OrderManagement/selectOrderById?outTradeNo=' + outTradeNol,
      method: "GET",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      order => {
        Taro.request({
          url: url + '/UserCoupon/selectUserCoupon',
          data: {
            openid: openId,
            cardPrice: order.data.data.price,
            status: -1,
            beautyId: order.data.data.beautyType
          },
          method: "POST",
          header: { //接口返回的数据类型，可以直接解析数据
            'Content-Type': 'application/json'
          },
        }).then(
          res => {
            res.data.data != []
            this.setState({
              coupon: res.data.data
            })
          }
        )
        this.setState({
          list: order.data.data,
          o_amount: order.data.data.amount,
          money: order.data.data.amount,
          giveMoney: 0
        })
      }
    )

  }


  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  }

  input = (e) => {
    switch (e.currentTarget.dataset.name) {
      case "content":
        this.setState({
          content: e.detail.value
        });
        break;
      case "password":
        this.setState({
          password: e.detail.value
        });
        break;
      case "money":
        this.setState({
          money: e.detail.value
        });
        break;
      case "giveMoney":
        this.setState({
          giveMoney: e.detail.value
        });
    }
  }

  // 优惠券弹窗开启
  menu_on = () => {
    this.setState({
      menu: !0,
      shadow: !0
    })
  }

  // 优惠券弹窗关闭
  menu_close = () => {
    this.setState({
      menu: !1,
      shadow: !1,
      pay: !1
    })
  }

  closeButton = () => {
    this.setState({
      shadow: false,
      menu: false
    })
  }

  // 优惠券选择
  coupon_choose = (a) => {
    let t = this,
      o = a.currentTarget.dataset.index;
    if (o != t.state.coupon_curr) {
      let e = t.state.coupon[o].name,
        n = t.state.list.amount;
      "" != (s = t.state.card) &&
        null != s &&
        1 == t.state.userinfo.card &&
        1 == t.state.list.service_list.sale_status &&
        1 == s.content.discount_status &&
        "" != s.content.discount &&
        null != s.content.discount &&
        (n = (parseFloat(n) * parseFloat(s.content.discount) / 10).toFixed(2)),
        n = (parseFloat(n) - parseFloat(e)).toFixed(2), t.setState({
          coupon_curr: o,
          coupon_price: e,
          o_amount: n
        });
    } else {
      let s;
      n = t.state.list.amount;
      "" != (s = t.state.card) &&
        null != s &&
        1 == t.state.userinfo.card &&
        1 == t.state.list.service_list.sale_status &&
        1 == s.content.discount_status &&
        "" != s.content.discount &&
        null != s.content.discount &&
        (n = (parseFloat(n) * parseFloat(s.content.discount) / 10).toFixed(2)),
        t.setState({
          coupon_curr: -1,
          coupon_price: null,
          o_amount: n
        });
    }
  }

  // 付款方式选择
  pay_choose = (t) => {
    let a = t.currentTarget.dataset.index;
    a != this.state.pay_type && this.setState({
      pay_type: a
    });
  }

  submit = (t) => {
    console.log(this.state.list, t.detail)
    if (this.state.requestMsgNumber == 0) {
      this.requestMSG()
    }
    let openId = Taro.getStorageSync('openid');
    var userip = Taro.getStorageSync('userip');
    if (1 == this.state.pay_type && (this.state.list.paymentMethodLimited == 1 || this.state.list.paymentMethodLimited == 2)) {
      // 组成微信支付所需参数。
      var wxpayfrom = {
        openid: openId,
        outTradeNo: this.state.list.outTradeNo,
        payType: this.state.payType,
        totalFee: this.state.o_amount * 100,
        tradeType: "JSAPI",
        notifyUrl: "https://applets.seouleaguer.com/miniapp/pay/notify/order",
        spbillCreateIp: userip,
        body: this.state.list.productName,
        formId: t.detail.formId
      }
      Taro.request({
        url: url + '/pay/createOrder',
        data: wxpayfrom,
        method: "POST",
        header: { //接口返回的数据类型，可以直接解析数据
          'Content-Type': 'application/json'
        },
      }).then(
        res => {
          Taro.setStorageSync('wxpay', res.data)
          this.wxPay(res.data)
        }
      )
    } else if (2 == this.state.pay_type && (this.state.list.paymentMethodLimited == 1 || this.state.list.paymentMethodLimited == 3)) {
      if (this.state.money >= 0 && this.state.giveMoney >= 0) {

        if (this.state.money == '' || this.state.money == null) {
          Taro.showToast({
            icon: 'none',
            title: '请输入余额消费金额'
          })
          return false
        }
        else if (this.state.giveMoney === '' || this.state.giveMoney === null) {
          Taro.showToast({
            icon: 'none',
            title: '请输入赠送金消费金额'
          })
          return false
        }
        else if ((parseInt(this.state.money) + parseInt(this.state.giveMoney)) == this.state.o_amount) {
          Taro.request({
            url: url + "/SMS/paymentVerification",
            data: {
              phone: this.state.address.mobile
            },
            method: "POST",
            header: { //接口返回的数据类型，可以直接解析数据
              'Content-Type': 'application/json'
            },
          })
          this.setState({
            pay: !1,
            sign: !0,
            // shadow: !0,
            form_id: t.detail.formId
          });
        } else {
          Taro.showToast({
            title: "输入金额有误",
            icon: "error",
            duration: 2e3
          })
        }
      } else {
        //失败通知
        Taro.showToast({
          title: "金额不能输入负数",
          icon: "none",
          duration: 2e3
        })
      }
    } else {
      //失败通知
      Taro.showToast({
        title: "请选择支付方式",
        icon: "none",
        duration: 2e3
      })
    }
  }

  sign_btn = () => {
    let that = this
    let t = this.state.password
    let openid = Taro.getStorageSync('openid');
    //用户余额支付，未完成。
    if (t == "" || t == null) {
      this.setState({
        sign_error: !0
      })
    } else {
      let couponPrices = 0;
      if (this.state.coupon_price != null) {
        couponPrices = this.state.coupon_price
      }

      if (this.state.money >= 0 && this.state.giveMoney >= 0) {
        Taro.request({
          url: url + "/UserInfo/balanceConsumption",
          data: {
            openid: openid,
            outTradeNo: this.state.list.outTradeNo,
            amountOfConsumption: this.state.money,
            freeGoldConsumption: this.state.giveMoney,
            pointsConsumption: 0,
            couponPrice: couponPrices,
            userPay: 1,
            password: this.state.password
          },
          method: "POST",
          header: { //接口返回的数据类型，可以直接解析数据
            'Content-Type': 'application/json'
          }
        }).then(
          res => {
            if (res.data.errCode == 0) {
              var t = res.data;
              // 用户使用优惠券，修改用户优惠券信息
              if (this.state.coupon_curr != -1) {
                Taro.request({
                  url: url + '/UserCoupon/updateUserCoupon',
                  data: {
                    openid: openidl,
                    id: this.state.coupon[this.state.coupon_curr].id
                  },
                  method: "POST",
                  header: { //接口返回的数据类型，可以直接解析数据
                    'Content-Type': 'application/json'
                  },
                })
              }

              //消息订阅
              Taro.request({
                url: url + '/wechat/kefu/Push',
                data: {
                  touser: openid,
                  template_id: "-37_7craO_ro3miIGu924c9mLOGQwOF_wT5nArY3yps",
                  page: "pages/index/index",
                  data: {
                    amount1: {
                      value: this.state.o_amount
                    },
                    thing2: {
                      value: "您已预约成功"
                    }
                  }
                },
                method: "POST",
              })
              "" != t.data && (
                this.setState({
                  shadow: !1,
                  sign: !1,
                  password: ""
                }),
                //成功通知
                Taro.showToast({
                  title: "支付成功",
                  icon: "success",
                  duration: 2e3
                }),
                //成功后跳转页面
                setTimeout(function () {

                  3 == that.state.list.orderType ? Taro.redirectTo({
                    url: "../../pages/group/order"
                  }) : Taro.redirectTo({
                    url: "../../pages/pagePay/orderDetail/detail?&outTradeNo=" + that.state.list.outTradeNo
                  });
                }, 2e3)
              );
            } else {
              Taro.showToast({
                title: res.data.errMsg,
                icon: "none",
                duration: 2e3
              })
            }
          }
        )
      } else {
        // 失败通知
        Taro.showToast({
          title: "金额不能输入负数",
          icon: "none",
          duration: 2e3
        })
      }

    }
  }

  sign_close = () => {
    this.setState({
      shadow: !1,
      sign: !1,
      password: ""
    })
  }

  render() {

    return (
      <View class="page">
        <View class="orderList">
          <View class="title">
            <View></View>
            <View>{this.state.list.order_type != 4 ? '订单信息' : '预约信息'}</View>
          </View>
          <View class="product">
            <Image src={this.state.list.productImage}></Image>
            <View>{this.state.list.productName}</View>
            <View>¥:{this.state.list.productPrice}</View>
            <View> X {this.state.list.total}</View>
          </View>
          <View class="item">
            <View>预约人</View>
            <View>{this.state.list.accountName}</View>
          </View>
          <View class="item">
            <View>预约号码</View>
            <View>{this.state.list.accountMobile}</View>
          </View>
          <View
            onClick={this.menu_on.bind(this)}
            class="item"
          >
            <View>优惠券</View>
            <View>{this.state.coupon_price ? '-' + this.state.coupon_price : ''}</View>
            <View>{this.state.coupon_price ? '' : '点击选取'}》</View>
          </View>
          <View class="item">
            <View>合计</View>
            <View>¥{this.state.o_amount}</View>
          </View>
          <View class="item">
            <Input
              onInput={this.input.bind(this)}
              data-name="content"
              placeholder="备注"
              placeholderStyle="color:#999;"
              type="text"
              value={this.state.content}
            />
          </View>
        </View>
        <View class="payList">
          <View class="title">
            <View></View>
            <View>支付方式</View>
          </View>
          <View class="choose">
            <View
              onClick={this.pay_choose.bind(this)}
              class="choose_i"
              data-index="2"
            >
              <View class={this.state.pay_type == 2 ? 'curr' : ''}></View>
              <View>余额支付</View>
              <br />
              <View class="money">
                <View class="ye">
                  余额(<Text style="color:#e50112;">¥{this.state.userinfo.money}</Text>)
                  <Input
                    onInput={this.input.bind(this)}
                    data-name="money"
                    placeholder="请输入消费余额"
                    placeholderStyle="color:#999999;"
                    type="number"
                    value={this.state.money}
                  />
                </View>
                <View class="zsj">
                  赠送金(<Text style="color:#e50112;">
                    ¥{this.state.userinfo.giveMoney}
                  </Text>)
                  <Input
                    onInput={this.input.bind(this)}
                    data-name="giveMoney"
                    placeholder="请输入消费赠送金金额"
                    placeholderStyle="color:#999999;"
                    type="number"
                    value={this.state.giveMoney}
                  />
                </View>
              </View>
            </View>
            <View
              onClick={this.pay_choose.bind(this)}
              class="choose_i"
              data-index="1"
            >
              <View class={this.state.pay_type == 1 ? 'curr' : ''}></View>
              <View>微信支付</View>
            </View>
          </View>
        </View>
        <View class="btn_block"></View>
        <View class="btn">
          <View>
            合计 : <Text>¥{this.state.o_amount}</Text>
          </View>
          <Form
            reportSubmit
            onClick={this.submit.bind(this)}
          >
            <Button
              class="pay"
              FormType="submit"
              style="background:#508eea;"
            >立即支付</Button>
          </Form>
        </View>

        {
          this.state.shadow ?
            <View
              onClick={this.closeButton.bind(this)}
              class="shadow"
            ></View> : null
        }

        {/* 优惠券开始 */}
        {
          this.state.menu ?
            <View class="menu">
              <View class="menu_top">
                <View class="menu_close"></View>
                <View>选择优惠券</View>
              </View>

              {
                this.state.coupon.length != 0 ?
                  <ScrollView
                    scroll-y="true"
                    style="height: 580rpx;"
                  >
                    <View class="menu_list">
                      {
                        this.state.coupon.map((item, index) => {
                          return (
                            <View
                              onClick={this.coupon_choose.bind(this)}
                              class="item"
                              data-index={index}
                            >
                              <Text>￥</Text>
                              <Text>{item.name}</Text>
                              <Text>{item.couponType}</Text>
                              <Text>满{item.condition}使用 </Text>
                              <View class="choose">
                                <Image src={couponSelected}></Image>
                              </View>
                            </View>
                          )
                        })
                      }
                    </View>
                  </ScrollView> :
                  <View style="text-align: center;padding:20rpx;">无满足条件优惠券</View>
              }

              <View
                onClick={this.menu_close.bind(this)}
                class="menu_btn"
                style="background:#518eeb;"
              >确定</View>
            </View> : null
        }
        {/* 优惠券end */}

        {/* 输入密码   */}
        {
          this.state.sign ?
            <>
              <View class="shadow"></View>
              <View class="passwordInput">
                <View class="mask"></View>
                <View class="sign">
                  <View style={{}}>支付验证码</View>
                  <Input
                    onInput={this.input.bind(this)}
                    data-name="password"
                    password="true"
                    placeholder="请输入短信证码"
                    placeholderStyle="color:#aaa"
                    type="number"
                    value={this.state.password}
                  />
                  {
                    this.state.sign_error ? <View class="sign_tip">密码错误</View> : null
                  }
                  <View
                    onClick={this.sign_btn.bind(this)}
                    class="sign_btn"
                    style="background:#518eeb;"
                  >确定</View>
                  <Icon
                    onClick={this.sign_close.bind(this)}
                    class="sign_close"
                    color="#000"
                    size="23"
                    type="cancel"
                  ></Icon>
                </View>
              </View>
            </> : null
        }
      </View>
    )

  }

}

export default Pay;













