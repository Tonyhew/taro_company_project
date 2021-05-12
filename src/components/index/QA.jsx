import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, ScrollView, Text } from '@tarojs/components'
import collection1 from '../../image/icon/collection1.png'
import collection2 from '../../image/icon/collection2.png'
import fabulous1 from '../../image/icon/fabulous1.png'
import fabulous2 from '../../image/icon/fabulous2.png'
import popular from '../../image/icon/popular.png'
import optimum from '../../image/icon/optimum.png'

class QA extends Component {

  componentDidMount() {
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  phonefull = (e) => {
    let id = e.currentTarget.dataset.popularType;
    Taro.navigateTo({
      url: '/topicComponent/popular/popular?&popularType=' + id
    })
  }

  render() {
    return (
      <View class="questionsAndAnswers">
        <View class="name">
          <View>{this.props.questionListTitle.homeModuleName}</View>
          <View>{this.props.questionListTitle.subtitle != null ? this.props.questionListTitle.subtitle : ''}</View>
        </View>
        <ScrollView scrollX style="white-space: nowrap;display: flex;">
          {
            this.props.questionListData.map(quesList => {
              return (
                <View key={quesList.id} onClick={this.phonefull.bind(this)} class="honorpicture" data-popularType={quesList.popularType}>
                  <View class="title2">
                    <View class="ask">
                      <Text>Q</Text>
                    </View>
                    <View class="titleName">{quesList.titleName}</View>
                    <View style="display: inline-flex;float: right;">
                      {
                        quesList.titleType == 1 ?
                          <Image
                            class={'popularimag'}
                            src={popular}
                          ></Image> :
                          <Image
                            class={'optimumimag'}
                            src={optimum}
                          ></Image>
                      }
                      
                    </View>
                    <View class="splitLine"></View>
                    <View class="under">
                      <View class="answer">
                        <Text>A</Text>
                      </View>
                      <View class="titleAnswer">{quesList.titleAnswer}</View>
                    </View>
                  </View>
                  <View bindtap="collection" class="collection" id={quesList.id}>
                    <Image src={quesList.collectionType == 1 ? collection1 : collection2}></Image>
                  </View>
                  <View bindtap="fabulous" class="fabulous" id="{{item.id}}">
                    <Image src={quesList.fabulousType == 1 ? fabulous1 : fabulous2}></Image>
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

export default QA
