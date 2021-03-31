import React, { Component } from 'react';
import { View, Image, Input, Text, P } from '@tarojs/components';
import Taro, { getStorageSync } from '@tarojs/taro';
import classNames from 'classnames';
import icon1 from '../../image/icon/icon_1.png';
import icon2 from '../../image/icon/icon_2.png';
import left from '../../image/resource/left.png';
import api from '../../config/api';
import DatePicker from '../../components/reservation/Datepicker'
import './reservation.less';

const utils = require('../../utils/activity')
// 初始化日期模态框数据
let date = new Date();
let years = [];
let months = [];
let days = [];
let hours = [];
let minutes = [];

for (let i = date.getFullYear(); i < (date.getFullYear() + 5) + 1; i++) {
  years.push(i + "年")
}
for (let i = 1; i < 13; i++) {
  months.push(i + "月")
}
for (let i = 1; i < 32; i++) {
  days.push(i + "日")
}
for (let i = 0; i < 24; i++) {
  hours.push(i + "")
}
for (let i = 0; i < 60; i++) {
  minutes.push(i + "")
}

function sign(a) {
  var customerName = a.state.customerName,
    customerAge = a.state.customerAge,
    customerPhone = a.state.customerPhone,
    memberName = a.state.member_name,
    reservationItem = a.state.reservationItem,
    starttime = a.state.starttime,
    s = "";
  "" != customerName && null != customerName || (s = '预约姓名为空'),
    "" != customerAge && null != customerAge || (s = "预约年龄为空"),
    "" != memberName && null != memberName || (s = "预约医生为空"),
    "" != reservationItem && null != reservationItem || (s = "预约项目为空"),
    "" != starttime && null != starttime || (s = "预约时间为空");
  /^[1][3,4,5,7,8][0-9]{9}$/.test(customerPhone) || (s = "请输入正确的联系电话"),
    "" == s ? a.setState({
      submit: true
    }) : Taro.showToast({
      title: s,
      icon: 'none',
    });
}

class Reservation extends Component {

  // state 仓库
  state = {
    sexType: 2,
    store_member: -1,
    changefalg: false,
    value: [0, 1, 1, 1, 1],
    openflag: true, //1日期控件显示  2控件滚动选择 底部页面不滚动
    years: years, //时间可选范围模态框数据
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    year: '', //时间值
    month: '',
    day: '',
    hour: '',
    minute: '',
    starttime: utils.getobjDate(),
    submit: false,
    member_page: false,
    member_list: [],
    customerName: '',
    customerAge: '',
    customerPhone: '',
    reservationItem: '',
    member_name: '',
    page: 0,
    isbottom: false
  }

  componentDidShow() {

  }

  input = (t) => {
    console.log(t.detail.value)
    switch (t.currentTarget.dataset.name) {
      case "customerName":
        this.setState({
          customerName: t.detail.value
        });
        break;
      case "customerAge":
        this.setState({
          customerAge: t.detail.value
        });
        break;
      case "customerPhone":
        this.setState({
          customerPhone: t.detail.value
        });
        break;
      case "reservationItem":
        this.setState({
          reservationItem: t.detail.value
        });
    }
  }

  // 医生选择模块
  doctor_choose = () => {
    return (
      <View onClick={"member_close"} class="member_page">
        <View class="member_list">
          {
            this.state.member_list.map((item, index) => {
              return (
                <View onClick={this.member_choose.bind(this)} class="item" data-index={index} key={index}>
                  <Image src={item.simg}></Image>
                  <View class="item_r">
                    <View class="name">{item.name}</View>
                  </View>
                </View>
              )
            })
          }
          <View bindtap="member_close" class="return">
            <Image src={left}></Image>
            <View>返回</View>
          </View>
        </View>
      </View>
    )
  }

  // 性别选择
  sexChoose = (e) => {
    let sexType = e.currentTarget.dataset.sex
    sexType != this.state.sexType && this.setState({
      sexType: sexType
    });
  }

  // 医生查询 ajax请求查询
  doctorChoose = () => {
    Taro.request({
      url: api + '/President/selectPresident',
      data: {
        status: 1
      },
      method: "POST",
      header: { //接口返回的数据类型，可以直接解析数据
        'Content-Type': 'application/json'
      },
    }).then(
      res => {
        console.log(res)
        let jsonObj = res.data.data;
        let obj = {};
        for (let i = 0; i < jsonObj.length; i++) {
          var str = res.data.data[i].service;
          obj = JSON.parse(str); //由JSON字符串转换为JSON对象
          res.data.data[i].service = obj;
        }
        this.setState({
          member_list: res.data.data,
          member_page: true
        })
      }
    )
  }

  // 医生选择
  member_choose = (e) => {
    let a = e.currentTarget.dataset.index,
      i = this.state.member_list;
    this.setState({
      store_member: i[a].id,
      member_name: i[a].name,
      member_page: !1,
      member_list: [],
      page: 1,
      isbottom: !1
    });
  }

  tap = () => {
    // 根据选择项目  传去对应数据  根据开始结束时间获取索引  设置面板默认数据
    let value = [2019, 0, 0, 0, 0];
    let arr = [];
    arr = utils.getarrWithtime(this.state.starttime);

    const {
      years,
      months,
      days,
      hours,
      minutes,
      openflag
    } = this.state;
    //根据arr  数据索引
    value[0] = years.indexOf(arr[0] + '年');
    value[1] = months.indexOf(arr[1] + '月');
    value[2] = days.indexOf(arr[2] + '日');
    value[3] = hours.indexOf(arr[3]);
    value[4] = minutes.indexOf(arr[4]);

    this.setState({
      value,
      openflag: false,
      years, //日期模态框数据
      months,
      days,
      hours,
      minutes,
    })
  }

  // 取消
  canslebtn = () => {

    this.setState({
      openflag: true,
      changefalg: false,
    })
  }

  // 确定  如果不选择那么默认重置
  closebtn = () => {

    this.setState({
      openflag: true,
    })
    const {
      curindex,
      year,
      month,
      day,
      hour,
      minute
    } = this.state;

    if (this.state.changefalg) {
      let starttime = utils.getDate(year, month, day, hour, minute)
      console.log('starttime', starttime)
      this.setState({
        starttime,
        changefalg: false,
      })
    }
  }

  bindChange = (ev) => {

    let e = ev;
    let val = e.detail.value;

    let year = this.state.years[val[0]];
    let month = this.state.months[val[1]];
    let hour = this.state.hours[val[3]];
    let minute = this.state.minutes[val[4]];

    //如果点击月份  那么后面日跟着变换数据
    let days = [];
    let daynum = utils.mGetDate(year.substr(0, year.length - 1),
      month.substr(0, month.length - 1));
    for (let i = 1; i < daynum + 1; i++) {
      days.push(i + "日")
    }

    this.setState({
      value: val,
      days,
      year,
      month,
      day: this.state.days[val[2]],
      hour,
      minute,
      changefalg: true,
    })
  }

  submit = () => {
    console.log(sign(this))
    let openid = getStorageSync('openid')
    if (sign(this), this.state.submit) {
      Taro.request({
        url: api + "/Appointment/insertAppointment",
        data: {
          openid: openid,
          customerName: this.state.customerName,
          customerAge: this.state.customerAge,
          customerSex: this.state.sexType,
          customerPhone: this.state.customerPhone,
          customerDoctor: this.state.member_name,
          appointment: this.state.starttime,
          reservationItem: this.state.reservationItem
        },
        method: "POST",
        header: { //接口返回的数据类型，可以直接解析数据
          'Content-Type': 'application/json'
        },
      }).then(
        res => {
          console.log(res)
          if (res.data.errCode == 0) {
            Taro.showToast({
              title: '预约成功',
              icon: 'success',
              duration: 3000, //持续的时间
              success: function () {
                setTimeout(function () {
                  Taro.reLaunch({
                    url: '/pages/index/index',
                  })
                }, 2000);
              }
            })
          } else {
            Taro.showModal({
              title: "失败",
              content: "预约已满",
              success: function (res) {
                if (res.confirm) { //这里是点击了确定以后       
                  console.log('用户点击确定')

                } else { //这里是点击了取消以后       
                  console.log('用户点击取消')
                }
              }
            });
          }
        }
      )
    }
  }

  render() {

    return (

      <>
        <View className="page">

          <View class="top">
            <Image src={icon1}></Image>
            <View>预约登记</View>
          </View>
          <View class="from">
            <View class="item">
              <View>预约人姓名<Text class="asterisk">*</Text></View>
              <Input
                class="input"
                onInput={this.input.bind(this)}
                data-name="customerName"
                placeholder="请输入"
                placeholder-style="color:#DDDDDD"
                value={this.state.customerName}
              ></Input>
            </View>
            <View class="item">
              <View>年龄<Text class="asterisk">*</Text></View>
              <Input
                class="input"
                onInput={this.input.bind(this)}
                data-name="customerAge"
                placeholder="请输入"
                placeholder-style="color:#DDDDDD"
                value={this.state.customerAge}
              ></Input>
            </View>
            <View class="item">
              <View>性别<Text class="asterisk">*</Text></View>
              <View
                class="sex"
                onClick={(e) => this.sexChoose(e)}
                data-sex="1"
              >
                <View class={this.state.sexType == 1 ? 'curr' : ''}></View>
                <View>男</View>
              </View>
              <View
                class="sex"
                onClick={(e) => this.sexChoose(e)}
                data-sex="2"
              >
                <View class={this.state.sexType == 2 ? 'curr' : ''}></View>
                <View>女</View>
              </View>
            </View>
            <View class="item">
              <View>联系电话<Text class="asterisk">*</Text></View>
              <Input
                class="input"
                onInput={this.input.bind(this)}
                data-name="customerPhone"
                placeholder="请输入"
                placeholder-style="color:#DDDDDD"
                value={this.state.customerPhone}
              ></Input>
            </View>
            <View class="item">
              <View>预约医生<Text class="asterisk">*</Text></View>
              <View
                class="picking"
                onClick={this.doctorChoose.bind(this)}
                style={{ color: this.state.store_member == -1 ? '#DDDDDD' : '' }}
              >
                {this.state.store_member == -1 ? '请选择' : this.state.member_name}
                <Text style="color:#4A4A4A;">{'>'}</Text>
              </View>
            </View>
            <View class="item">
              <View>预约时间<Text class="asterisk">*</Text></View>
              <View
                class="picking"
                style={{ color: this.state.store_member == -1 ? '#DDDDDD' : '' }}
                onClick={this.tap.bind(this)}
              >
                {this.state.starttime ? this.state.starttime : '请选择'}
                <Text style="color:#4A4A4A;">{'>'}</Text>
              </View>
            </View>
            <View class="item">
              <View>预约项目<Text class="asterisk">*</Text></View>
              <Input
                class="input"
                onInput={this.input.bind(this)}
                data-name="reservationItem"
                placeholder="请输入"
                placeholder-style="color:#DDDDDD"
                value={this.state.reservationItem}
              ></Input>
            </View>
          </View>
          <View class="prompt">
            <View class="heads">
              <Image src={icon2}></Image>
              <View>提示</View>
            </View>
            {/* <!-- <View wx: {{ promptList }}" wx:key="ids"> --> */}
            <View class="content">
              <View class="bale">
                <View class="dian"></View>
                <View class="title">信息提交后不可更改</View>
              </View>
              <View class="bale">
                <View class="dian"></View>
                <View class="title">为了保障医院的正常预约秩序，请认真填写信息</View>
              </View>
              <View class="bale">
                <View class="dian"></View>
                <Text class="title">预约到院后请积极配合工作人员的引导</Text>
              </View>
              <View class="bale">
                <View class="dian"></View>
                <Text class="title">非常感谢您的填写，如有疑问，请咨询客服</Text>
              </View>
            </View>
          </View>
          <View class="button" onClick={this.submit.bind(this)}>提交</View>
          {/* <!-- 院长选择 --> */}
          {
            this.state.member_page ? this.doctor_choose() : null
          }

        </View>

        {
          !this.state.openflag ?
            <DatePicker
              canslebtn={this.canslebtn.bind(this)}
              closebtn={this.closebtn.bind(this)}
              bindChange={this.bindChange.bind(this)}
              value={this.state.value}
              years={this.state.years}
              months={this.state.months}
              days={this.state.days}
              hours={this.state.hours}
              minutes={this.state.minutes}
            />
            : null
        }

      </>
    )

  }

}


export default Reservation















