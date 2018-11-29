import React, { Component } from 'react'
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  LayoutAnimation,
  ScrollView
} from "react-native"
import Box_Content from '../components/Categories/Box_Content'
import { Card } from 'react-native-material-cards';

export default class CategoryScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      isShowToolBar: 'flex'
    }
    this._onScroll = this._onScroll.bind(this)
    RegisterAnimation()
  }

  _onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);

    if (Math.abs(dif) <= 1) {
      console.log('unclear');
    } else if (dif < 0) {
      console.log('up');
      //RequestAnimation()
      if (this.state.isShowToolBar !== "flex") {
        this.setState({ isShowToolBar: "flex" })
      }

    } else {
      console.log('down');
      //RequestAnimation()
      if(Math.abs(dif) > 3 )
      {
        console.log('down');
        if (this.state.isShowToolBar !== "none") {
          this.setState({ isShowToolBar: "none" })
        }
      }
    }

    this.offset = currentOffset;
  };

  render() {
    const _id = this.props.navigation.state.params._id
    console.log(_id)
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {this.state.isShowToolBar === "flex" ?
          <View style={styles.navbar}>
            <View style={{ marginRight: 10, marginLeft: 5 }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image style={{ width: 29, height: 29 }} source={require('../assets/images/go_back.png')} />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Cơ sở hạ tầng</Text>

          </View>
          : null
        }

        <ScrollView showsVerticalScrollIndicator={false} onScroll={this._onScroll}>
          <Box_Content navigation={this.props.navigation} id={_id} />
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: "#0A191F",
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    textAlign: "center",
  },
  navbar:{
    width:"100%",
    position: "absolute",
    zIndex: 100, 
    backgroundColor: "#ffffff",
    flexDirection: "row", 
    alignItems: "center",
    padding: 10, 
    marginTop:20,
    elevation:5 }
})

function RegisterAnimation() {
  if (UIManager.setLayoutAnimationEnabledExperimental)
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

function RequestAnimation() {
  LayoutAnimation.configureNext({
    duration: 300,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: { type: LayoutAnimation.Types.easeInEaseOut },
  });
}