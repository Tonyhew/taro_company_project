import React, { Component } from 'react'
import { View, Icon, Input } from '@tarojs/components'
import classNames from 'classnames'


class SearchBox extends Component {

  state = {
    addflag: false,
    addimg: '',
    searchstr: '',
    searchflag: false,
  }

  searchList = (e) => {
    this.setState({
      searchstr: e.currentTarget.value
    })
  }

  getfocus = () => {
    this.setState({
      searchflag: true,
    })
  }

  cancelsearch = () => {
    this.setState({
      searchstr: '',
      searchflag: false,
    })
    
  }

  activity_clear = () => {
    this.setState({
      searchstr: ''
    })
  }

  componentDidShow() {
  
  }

  render() {

    return (
      <View class="wrapper">
        <View class='tit_seabox'>
          <View class={classNames('tit_seabox_bar', this.state.addflag ? 'tit_seabox_add' : '', this.state.searchflag ? 'tit_start_search' : '')}>
            <Icon type='search' size="32rpx"></Icon>
            <Input type="text" onInput={this.searchList.bind(this)} onConfirm="endsearchList" onFocus={this.getfocus.bind(this)} onBlur="blursearch" confirmType='search' value={this.state.searchstr} placeholder='输入商品名称搜索' />
            {
              this.state.searchflag ?
                <Icon onClick={this.activity_clear.bind(this)} type='clear' size="28rpx"></Icon>
                : null
            }
          </View>
          {
            this.state.searchflag ?
              <View onClick={this.cancelsearch.bind(this)} class="activity_seabtn">取消</View>
              : null
          }
        </View>
      </View >
    )

  }

}


export default SearchBox




















