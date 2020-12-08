import { Component } from 'react'
import Taro from '@tarojs/taro'
import './app.less'

class App extends Component {

  componentDidMount () {}

  componentDidShow () {
    Taro.setTabBarStyle({
      color: '#858585',
      selectedColor: '#347be9',
      borderStyle: 'white'
    })
  }

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
