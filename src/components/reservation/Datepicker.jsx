import React, { Component } from 'react';
import { View, Text, PickerView, PickerViewColumn } from '@tarojs/components';


class DatePicker extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    timevalue: {
      type: Array,
      value: "标题"
    },
  }


  componentDidShow(e) {


  }


  render() {
    return (
      <View>
        {/* 日期模态框 */}
        <View class="modelboxbg"></View>
        <View class="modelbox">
          <View class="model_picker">
            <View class="button_model">
              <Text onClick={this.props.canslebtn}>取消</Text>
              <Text onClick={this.props.closebtn}>确定</Text>
            </View>
            <View class="cont_model">
              <PickerView indicator-style="height: 50px;" style="width: 100%; height: 300px;" value={this.props.value} onChange={this.props.bindChange.bind(this)}>
                {/* 年 */}
                <PickerViewColumn>
                  {
                    this.props.years.map((years, index) => {
                      return (
                        <View style="line-height: 50px" key={index}>{years}</View>
                      )
                    })
                  }
                </PickerViewColumn>

                {/* 月 */}
                <PickerViewColumn>
                  {
                    this.props.months.map((months, index) => {
                      return (
                        <View style="line-height: 50px" key={index}>{months}</View>
                      )
                    })
                  }
                </PickerViewColumn>

                {/* 日 */}
                <PickerViewColumn>
                  {
                    this.props.days.map((days, index) => {
                      return (
                        <View style="line-height: 50px" key={index}>{days}</View>
                      )
                    })
                  }
                </PickerViewColumn>

                {/* 时 */}
                <PickerViewColumn>
                  {
                    this.props.hours.map((hours, index) => {
                      return (
                        <View style="line-height: 50px" key={index}>{hours}</View>
                      )
                    })
                  }
                </PickerViewColumn>

                {/* 分 */}
                <PickerViewColumn>
                  {
                    this.props.minutes.map((minutes, index) => {
                      return (
                        <View style="line-height: 50px" key={index}>{minutes}</View>
                      )
                    })
                  }
                </PickerViewColumn>

              </PickerView>
            </View>
          </View>
        </View>
      </View>
    )
  }

}

export default DatePicker;













