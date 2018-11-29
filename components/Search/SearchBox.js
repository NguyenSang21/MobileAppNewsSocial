import React, { Component } from 'react'
import { Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    UIManager,
    LayoutAnimation,
    ScrollView,
    Button,
} from "react-native"

export default class SearchBox extends Component {

  render() {
    return (
      <View style={[{backgroundColor:'#e8f5e9',flexDirection:"row", justifyContent:"space-between", height:50}, this.props.style]}>
        <Text>TEST SEARCH</Text>
        <Button onPress={this.props.eventOnClose} title="X"/>
      </View>
    )
  }
}
