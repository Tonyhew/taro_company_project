import React, { Component } from 'react';
import { View, Image } from '@tarojs/components';
import code_1 from '../../image/img/code_1.jpg'
import './manifesto.less';

class Manifesto extends Component {

  render() {

    return (
      <View class="pages">
        <View class="pictureFrame">
          <Image class="picture" src={code_1}></Image>
        </View>
      </View>
    )

  }

}

export default Manifesto;








