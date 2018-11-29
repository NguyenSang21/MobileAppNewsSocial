import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  UIManager,
  LayoutAnimation,
  Platform,
  Text
} from "react-native";
import { url } from "../Variables/General";
import Box_Similar from "../components/Details/Box_Similar";
import MyWebView from "react-native-webview-autoheight";
import AutoResizeHeightWebView from "../components/AutoResize/AutoResizeHeightWebView";
export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}],
      loaded: false,
      _id: "",
      isShowToolBar:"flex"
    };
    this._onScroll =this._onScroll.bind(this)
    RegisterAnimation()
  }

  static navigationOptions = { header: null }

  componentDidMount() {
    const _id = this.props.navigation.state.params._id;
    this.setState({ _id: _id });
    fetch(`${url}newsKey/key/` + _id)
      .then(resp => resp.json())
      .then(data => this.setState({ data: data }));
  }

  _onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);

    if (Math.abs(dif) <= 1) {
      console.log('unclear');
    } else if (dif < 0) {
      console.log('up');
      if(this.state.isShowToolBar !="flex")
      {
        this.setState({isShowToolBar:"flex"})
        //RequestAnimation()
      }
    } else {
      console.log('down');
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
    const { data, _id } = this.state;
    
    return (
      <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
        {this.state.isShowToolBar === "flex" ? 
          <View style={styles.navbar}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image style={{ width: 29, height: 29,marginLeft: 10 }} source={require('../assets/images/go_back.png')} />
            </TouchableOpacity>
          </View>
          : null
        }
        
        <ScrollView onScroll={this._onScroll} style={{paddingTop: 60}} >

          <AutoResizeHeightWebView
            source={{ html: data[0].detail }}
            onAutoHeight={() => this.setState({ loaded: true })}
          />
          {this.state.loaded ?
            <View style={{flex:1,}}>
              <Box_Similar metaKey={_id} />
            </View>
          : null}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    width:"100%",
    position: "absolute", 
    zIndex: 100,
    marginTop: 25,
    height: 40,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    ...Platform.select({
      ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
      },
      android: {
          elevation: 5,
      },
  }),
   }
});


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