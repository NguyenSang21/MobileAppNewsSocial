import React, { Component } from 'react'
import { View, StyleSheet, FlatList, TouchableHighlight, Image, Text,ScrollView } from 'react-native'

const images = [
    {"url": require('../../assets/images/category1.png'), "title": "Quy Hoạch", "id":"thi-truong",},
    {"url": require('../../assets/images/category2.png'), "title": "Thị trường", "id":"tai-chinh-chung-khoan"},
    {"url": require('../../assets/images/category3.png'), "title": "Phân Tích Nhận Định", "id":"nhin-ra-the-gioi"},
    {"url": require('../../assets/images/category4.png'), "title": "Dự Án", "id":"hoat-dong-doanh-nghiep"},
    {"url": require('../../assets/images/category5.png'), "title": "Xu Hướng - Cẩm Nang", "id":"ha-tang"},
    {"url": require('../../assets/images/category6.png'), "title": "Kiến Thức", "id":"tin-du-an"}
]

export default class Box_Categories extends Component {
    renderImages (item, index) {
        return (
            <TouchableHighlight key = {index} onPress={() => this.props.navigation.navigate('Category', { _id: item.id })}>
                <View style={{justifyContent: 'center', alignItems: 'center', width:80}} >
                    <Image style={{width:50, height:50, margin:10}} source={item.url}/>
                    <Text numberOfLines={1} ellipsizeMode ={'tail'}>{item.title}</Text>
                </View>
            </TouchableHighlight>
        )
    }

  render() {
    return (
        <ScrollView  
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            showsHorizontalScrollIndicator={false} 
            horizontal 
            style={styles.container}>
            {images.map((item, index) => this.renderImages(item, index))}
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        
    }
})