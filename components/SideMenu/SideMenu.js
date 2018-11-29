import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import LineHorizontal from '../Line/LineHorizontal';
import Panel_Dropdown from '../Panels/Panel_Dropdown';
import { url } from "../../Variables/General";
import categories from "./data";
import NavigatorService from "../../services/navigator" 

export default class SideMenu extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         data: []
    //     }
    // }

    // componentDidMount() {
    //     fetch(`${url}news_category`)
    //         .then(res => res.json())
    //         .then(data => { this.setState({ data }) })
    // }

    // renderImages(item, index) {
    //     console.log(this.props.navigation)
    //     return (
    //         <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate('Category', { _id: item.id })}>
    //             <View style={{ marginLeft: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
    //                 <Image style={{ width: 30, height: 30, margin: 10 }} source={item.url} />
    //                 <Text style={{ width: 150 }} numberOfLines={1} ellipsizeMode={'tail'}>{item.title}</Text>
    //                 <Image style={{ marginRight: 10, width: 10, height: 10 }} source={require("../../assets/images/down-arrow.png")} />
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

    onNavigate = (screen, params) => {
        NavigatorService.navigate(screen, params);
        this.props.eventOnClick()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: "#40c4ff" }}>
                    <View style={{ flexDirection: "row", marginTop: 40, marginLeft: 5, marginRight: 10, marginBottom: 20 }}>
                        <View>
                            <Image style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                                source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png' }}
                            />
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", marginLeft: 10 }}>
                            <Text
                                style={{ color:"#FFFFFF", fontSize: 20, fontFamily:'PlayfairDisplay-Bold' }}
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                            > Nguyễn Sang</Text>
                            <Text
                                style={{ color:"#FFFFFF",width: "90%",fontFamily:'Roboto-Thin' }}
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                            >nguyensang1996@gmail.com</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={{ color:'#333160', margin: 10, fontSize: 20, fontFamily:'PlayfairDisplay-Bold' }}>Thể Loại</Text>
                    <LineHorizontal />
                </View>

                {/* <View>
                    {images.map((item, index) => this.renderImages(item, index))}
                </View> */}

                <ScrollView showsVerticalScrollIndicator={false}>
                    {categories.map((item, index) => (
                        <Panel_Dropdown key={index} title={item.title} imageUri={item.url}>
                            {item.items.map((item, index) => (
                                <TouchableHighlight key={index}  onPress={() => this.onNavigate('Category', { _id:item.key })}>
                                    <Text style={{ marginLeft: 10, color:'black',fontFamily:'Roboto-Thin', paddingTop: 10, paddingBottom: 10, }} >{item.title}</Text>
                                </TouchableHighlight>
                            ))}
                        </Panel_Dropdown>
                    ))}
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    }
})