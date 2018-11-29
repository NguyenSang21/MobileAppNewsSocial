import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  DeviceEventEmitter,
} from "react-native";

import Box_1 from "../components/Boxs/Box_1";
import Box_2 from "../components/Boxs/Box_2";
import Box_3 from "../components/Boxs/Box_3";
import Box_4 from "../components/Boxs/Box_4";
import Box_5 from "../components/Boxs/Box_5";
import Box_6 from "../components/Boxs/Box_6";
import Box_7 from "../components/Boxs/Box_7";

import Carousel_Auto_Scroll from "../components/Carousels/Carousel_Auto_Scroll";

export default class HomeScreen extends Component {

  static navigationOptions = {
    header: null
  };

  _onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);

    if (Math.abs(dif) <= 1) {
      console.log('unclear');
    } else if (dif < 0) {
      console.log('up');
      DeviceEventEmitter.emit("event-scroll", 1)
    } else 
    {
      if(Math.abs(dif) > 3 )
      {
        console.log('down');
        DeviceEventEmitter.emit("event-scroll", 0)
      }
    }

    this.offset = currentOffset;
  };

  render() {
    console.log(this.props.name)
    return (

      <View style={styles.Container}>

        <View style={{height:25, backgroundColor:"#FFFFFF"}} />

        <ScrollView style={{paddingTop: 50, backgroundColor: "#FFFFFF",}} onScroll={this._onScroll} showsVerticalScrollIndicator={false} >

          <Carousel_Auto_Scroll />

          {/* Tin mới */}
          <Box_1 navigation={this.props.navigation} />

          <View
            style={{
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
              borderBottomColor: "#E4E6F1",
              borderBottomWidth: 1
            }}
          />

          {/* Sự kiện */}
          <Box_4 navigation={this.props.navigation} />

          <View
            style={{
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
              borderBottomColor: "#E4E6F1",
              borderBottomWidth: 1
            }}
          />

          {/* Trung tâm thương mại */}
          <Box_7 navigation={this.props.navigation} />

          <View
            style={{
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
              borderBottomColor: "#E4E6F1",
              borderBottomWidth: 1
            }}
          />

          {/* cơ sở hạ tầng */}
          <Box_3 navigation={this.props.navigation} />

          <View
            style={{
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
              borderBottomColor: "#E4E6F1",
              borderBottomWidth: 1
            }}
          />

          {/* Nhìn ra thế giới 1*/}
          <Box_6 navigation={this.props.navigation} />

          <View
            style={{
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
              borderBottomColor: "#E4E6F1",
              borderBottomWidth: 1
            }}
          />

          {/* Kkhu công nhiệp */}
          <Box_2 navigation={this.props.navigation} />

          <View
            style={{
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
              borderBottomColor: "#E4E6F1",
              borderBottomWidth: 1
            }}
          />

          {/* Nhìn ra thế giới 2*/}
          <Box_6 navigation={this.props.navigation} />

          <View
            style={{
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
              borderBottomColor: "#E4E6F1",
              borderBottomWidth: 1
            }}
          />
          {/* Dự án */}
          <Box_5 navigation={this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    
  },
  TitleStyle: {
    color: "black",
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "700"
  }
});
