import React, { Component } from 'react';
import Taro, { Current, getStorageSync } from '@tarojs/taro';
import { View, Image, Input } from '@tarojs/components';
import { set as setGlobalData, get as getGlobalData } from '../../config/global_data';
import theme3_22 from '../../Images/resource/theme3_22.png';
import theme3_33 from '../../Images/resource/theme3_33.png';
import theme3_34 from '../../Images/resource/theme3_34.png';
import url from '../../config/api'
import './info.less'

class Info extends Component {

  state = {
    submit: !1,
    forget_submit: !1,
    isload: !1,
    edit: 0,
    code: "",
    flag: true,
    name: '',
    mobile: '',
    password: '',
    times: 0,
    smsCode: 0,
    card: 0,
  }

  componentDidShow() {
  }

  time_down = (t) => {
    var e = setInterval(function () {
      var a = t.state.times;
      0 == a ? (t.setState({
        isload: !1
      }), clearInterval(e)) : (a -= 1, t.setState({
        times: a
      }));
    }, 1e3);
  }

  getVerifiy = (a) => {
    var t = a.state.name,
      e = a.state.mobile,
      o = a.state.code,
      n = a.state.password,
      s = !0
    "" != t && null != t || (s = !1), "" != e && null != e || (s = !1);
    /^[1][3,4,5,7,8][0-9]{9}$/.test(e) || (s = !1);
    var d = a.state.card;
    "" != d && null != d && null != d.content && "" != d.content && 1 == d.content.code_status && ("" != o && null != o || (s = !1)),
      ("" == n || null == n || n.length < 6) && (s = !1)
    a.setState({
      submit: s
    });
  }

  forget_password = (a) => {
    var t = a.state.code,
      e = a.state.password,
      o = a.state.mobile,
      n = !0,
      s = a.state.card;
    "" != s && null != s && null != s.content && "" != s.content && 1 == s.content.code_status && ("" != t && null != t || (n = !1)),
      ("" == e || null == e || e.length < 6) && (n = !1), "" != o && null != o || (n = !1),
      a.setState({
        forget_submit: n
      });
  }

  Input = (a) => {
    switch (a.currentTarget.dataset.name) {
      case "name":
        this.setState({
          name: a.detail.value
        });
        break;
      case "mobile":
        this.setState({
          mobile: a.detail.value
        });
        break;
      case "code":
        this.setState({
          code: a.detail.value
        });
        break;
      case "password":
        this.setState({
          password: a.detail.value
        });
    }
    this.getVerifiy(this), this.forget_password(this);
  }

  getcode_register = () => {
    var t = this;
    var a = t.state.mobile;
    t.state.isload || ("" != a && null != a && /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/.test(a) ? Taro.request({
      url: url + "/SMS/sendSms",
      data: {
        phone: t.state.mobile,
        smsType: 1
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
      success: function (a) {
        if (a.data.errCode == 0) {
          t.setState({
            smsCode: a.data.data.code,
            times: 60,
            isload: !0
          }), t.time_down(t);
          Taro.showModal({
            title: "错误",
            content: "该手机号码已经注册",
            success: function (a) {
              a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
            }
          })
        } else {
          Taro.showModal({
            title: "错误",
            content: a.data.errMsg,
            success: function (a) {
              a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
            }
          })
        }

      }
    }) : Taro.showModal({
      title: "错误",
      content: "请输入正确的手机号",
      success: function (a) {
        a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
      }
    }));
  }

  submit = () => {
    var a = this
    if (a.state.submit) {
      var t = {
        openid: getStorageSync('openid'),
        card: 1,
        name: a.state.name,
        mobile: a.state.mobile,
        password: a.state.password,
        matchingUser: getStorageSync('userInfo').matchingUser
      };
      if (a.state.code == a.state.smsCode) {
        if (a.state.flag) {
          Taro.request({
            url: url + "/UserInfo/updateUserInfo",
            data: t,
            method: "POST",
            header: { //接口返回的数据类型，可以直接解析数据
              'Content-Type': 'application/json'
            },
            success: function (a) {
              "" != a.data.data && (Taro.showToast({
                title: "开通成功",
                icon: "success",
                duration: 2e3
              }), setTimeout(function () {
                Taro.navigateBack({
                  delta: 1
                });
              }, 2e3));
            }
          });
          this.setState({
            flag: false,
          })
          setTimeout(function () {
            this.setState({
              flag: true
            })
          }, 5000);
        } else {
          Taro.showToast({
            title: "网络繁忙,请勿频繁点击",
            icon: "none",
            duration: 3000
          })
        }
      } else {
        Taro.showToast({
          title: "验证码错误",
          icon: "success",
          duration: 2e3
        })
      }
    }
  }

  reset_member_info = () => {
    Taro.navigateTo({
      url: '/pages/card/info?edit=3'
    })
  }

  edit_one = () => {
    return (
      <View class="list">
        <View class="title">会员卡绑定</View>
        <View class="item">
          <Image src={theme3_22}></Image>
          <Input
            onInput={this.Input}
            data-name="name"
            placeholder="姓名"
            placeholderStyle="color:#999999;"
            type="text"
            value={this.state.name}
          ></Input>
        </View>
        <View class="item">
          <Image src={theme3_33}></Image>
          <Input
            onInput={this.Input}
            data-name="mobile"
            placeholder="手机号"
            placeholderStyle="color:#999999;"
            type="number"
            value={this.state.mobile}
          ></Input>
        </View>
        <View class="item code">
          <Input
            onInput={this.Input}
            data-name="code"
            type="number"
            value={this.state.code}
          ></Input>
          <View onClick={this.getcode_register} style="background:#444444;">{this.state.isload ? '(' + this.state.times + 's)' : '发送验证码'}</View>
        </View>
        <View class="item">
          <Image src={theme3_34}></Image>
          <Input
            password
            onInput={this.Input}
            data-name="password"
            placeholder="请输入6位数的支付密码"
            placeholderStyle="color:#999999;"
            type="number"
            value={this.state.password}></Input>
        </View>
        <View onClick={this.submit.bind(this)} class="btn" style="background:#518eeb;">确定</View>
      </View>
    )
  }

  edit_two = () => {
    return (
      <View class="list">
        <View class="title">会员卡绑定信息</View>
        <View class="item_c">
          <Image src={theme3_22}></Image>
          <View>{getStorageSync('userInfo').name}</View>
        </View>
        <View class="item_c">
          <Image src={theme3_33}></Image>
          <View>{getStorageSync('userInfo').mobile}</View>
        </View>
        <View onClick={this.reset_member_info.bind(this)} class="tip">信息修改</View>
      </View>
    )
  }

  edit_three = () => {
    return (
      <View class="list">
        <View class="title">找回密码</View>
        <View class="item" style="border:1rpx #dedede solid;">
          <Image src={theme3_33}></Image>
          <Input
            onInput={this.Input}
            data-name="mobile"
            placeholder="手机号"
            placeholderStyle="color:#999999;"
            type="number"
            value={getStorageSync('userInfo').mobile}></Input>
        </View>
        <View class="item code" style="border:1rpx #dedede solid;">
          <Input
            onInput={this.Input}
            data-name="code"
            type="number"
            value={this.state.code}></Input>
          <View
            onClick="getcode2"
            style="background:#444444;"
          >{this.state.isload ? '(' + this.state.times + 's)' : '发送验证码'}</View>
        </View>
        <View class="item" style="border:1rpx #dedede solid;">
          <Image src={theme3_34}></Image>
          <Input
            password
            onInput={this.Input}
            data-name="password"
            placeholder="请输入新6位以上的密码"
            placeholderStyle="color:#999999;"
            type="number"
            value={this.state.password}></Input>
        </View>
        <View
          onClick="forget_submit"
          class="btn"
          style="background:#518eeb;">确定</View>
      </View>
    )
  }

  render() {
    return (
      <View>

        <View class="top">
          <Image class="back" mode='widthFix' src={getStorageSync('userInfo').card != 1 ? JSON.parse(getGlobalData('cardRule')[2].content).card_status2 : JSON.parse(getGlobalData('cardRule')[2].content).card_status3}></Image>
          {
            getStorageSync('userInfo').card == 1 ? <View className='blueCard'>Blue Card</View> : null
          }
          <View class={getStorageSync('userInfo').card == 1 ? 'userinfo' : 'userinfo2'}>
            <Image src={getStorageSync('userInfo').avatar}></Image>
            <View>{getStorageSync('userInfo').nick}</View>
          </View>
        </View>

        {
          Current.router.params.edit == 1 ? this.edit_one() : null
        }

        {
          Current.router.params.edit == 2 ? this.edit_two() : null
        }

        {
          Current.router.params.edit == 3 ? this.edit_three() : null
        }

      </View>
    )
  }

}

export default Info

