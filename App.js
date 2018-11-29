/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  StatusBar,
  UIManager,
  LayoutAnimation,
  DeviceEventEmitter
} from "react-native";
import { createStackNavigator, } from "react-navigation"
import Drawer from 'react-native-drawer'

import HomeScreen from "./screens/HomeScreen"
import DetailScreen from "./screens/DetailScreen"
import CategoryScreen from "./screens/CategoryScreen"
import SideMenu from "./components/SideMenu/SideMenu"
import NavigatorService from "./services/navigator"

import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import store from './redux/store'
import { Provider } from 'react-redux'
import SearchBox from "./components/Search/SearchBox";


const Main = createStackNavigator({
  Home: { screen: HomeScreen },
  Detail: { screen: DetailScreen },
  Category: { screen: CategoryScreen },
},
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    transitionConfig: getSlideFromRightTransition
  }

);

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
    this.state = {
      showTopDrawer: true,
      showSearchBox: false,
    }
    //this.eventScroll = this.eventScroll.bind(this)
    this.showSearchBox = this.showSearchBox.bind(this)
    this.hideSearchBox = this.hideSearchBox.bind(this)
    this.openControlPanel = this.openControlPanel.bind(this)
    RegisterAnimation()
  }

  // eventScroll(arg) {
  //   let stateDrawer = this.state.showTopDrawer
  //   if (arg == 1) {
  //     if (stateDrawer != true) {
  //       RequestAnimation()
  //       this.setState({ showTopDrawer: true })
  //     }
  //   }
  //   else if (arg == 0) {
  //     if (stateDrawer != false) {
  //       RequestAnimation()
  //       this.setState({ showTopDrawer: false })
  //     }
  //   }
  // }

  // componentWillMount() {
  //   DeviceEventEmitter.addListener("event-scroll", this.eventScroll)
  // }

  showSearchBox() {
    RequestAnimation()
    this.setState({ showSearchBox: true, })
  }

  hideSearchBox() {
    RequestAnimation()
    this.setState({ showSearchBox: false, })
  }

  onNavigationStateChange = (prevState, currentState) => {
    var cur = getCurrentRouteName(currentState);
    var prev = getCurrentRouteName(prevState);
    //E.fire(EVENTS.STACKNAV_ON_NAVIGATE, { cur, prev })

    if (cur == 'Home') {
      this.setState({ showTopDrawer: true })
    }
    else if (cur == 'Detail') {
      this.setState({ showTopDrawer: false })
      StatusBar.setBackgroundColor("#FFFFFF");
    }
    else if (cur == 'Category') {
      this.setState({ showTopDrawer: false })
      StatusBar.setBackgroundColor("#FFFFFF");
    }
  }

  closeControlPanel = () => {
    this._drawer.close()
  };

  openControlPanel = () => {
    this._drawer.open()
    StatusBar.setBackgroundColor('transparent')
  };

  render() {
    const HEADER_HEIGHT = 300
    return (
      <Provider store={store}>
        <Drawer
          type="overlay"
          ref={(ref) => this._drawer = ref}
          content={<SideMenu eventOnClick={this.closeControlPanel} navigation={this.props.navigation} />}
          tapToClose={true}
          openDrawerOffset={0.3}
          panCloseMask={0.2}
          tweenHandler={ratio => ({
            main: {
              opacity: 1,
            },
            mainOverlay: {
              opacity: ratio / 2,
              backgroundColor: 'black',
            },
          })}
        >
          <View style={{ flex: 1, height: 60, backgroundColor: "#FFFFFF" }}>
            {this.state.showTopDrawer ?
              <View style={styles.customTopDrawer}>
                {!this.state.showSearchBox ?
                  <View style={{ marginTop:25,flex: 1, height: 50, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ width: 50 }}>
                      <TouchableOpacity onPress={this.openControlPanel}>
                        <Image
                          style={{ marginLeft: 10, width: 20, height: 20 }}
                          source={require("./assets/images/menu.png")}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: 110, justifyContent: "center" }}>
                      <Text style={styles.TitleStyle}>Trang Chủ</Text>
                    </View>
                    <View style={{ width: 50, }}>
                      <TouchableOpacity onPress={this.showSearchBox}>
                        <Image
                          style={{ marginLeft: 20, width: 20, height: 20 }}
                          source={require("./assets/images/search.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View> : null}

                <SearchBox eventOnClose={this.hideSearchBox} style={this.state.showSearchBox ? { flex: 1 } : { width: 1 }} />
              </View>
              : null}
              
              <Main ref={navigatorRef => {
                NavigatorService.setContainer(navigatorRef);
              }} onNavigationStateChange={this.onNavigationStateChange} />
          </View>
        </Drawer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  TitleStyle: {
    color: "#333160",
    fontSize: 22,
    fontFamily: 'PlayfairDisplay-Bold',
  },
  customTopDrawer:{
    flexDirection: "row",
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    elevation: 3,
    alignItems:"center",
  },
});

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}
/////
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