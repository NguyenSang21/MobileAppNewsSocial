import React, { Component } from 'react'
import { View, StyleSheet, FlatList, TouchableHighlight, Image, Text,ScrollView, Select } from 'react-native'

const data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
}];

export default class Box_Select extends Component {
   
  

  render() {
    
    return (
      <View style={styles.container}>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        flex:1,
    }
})