import React, { Component } from 'react'
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    FlatList,
    StyleSheet,
    Platform
} from 'react-native';
import { url } from '../../Variables/General'
import { Card } from 'react-native-material-cards';

export default class Box_6 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        fetch(`${url}news/nhin-ra-the-gioi/4`)
            .then(resp => resp.json())
            .then(data => this.setState({ data: data }))
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ backgroundColor: "#546e7a", width: 7, marginTop: 4, marginBottom: 4, marginRight: 8 }} />
                        <Text style={styles.title}>Nhìn ra thế giới</Text>
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Category', { _id: "su-kien" })}>
                        <Image
                            style={{ width: 32, height: 32 }}
                            source={require("../../assets/images/button_more.png")}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.Container}
                    style={{ flex: 1 }}
                    horizontal={true}
                    data={this.state.data}
                    renderItem={this.renderItem} />
            </View>
        )
    }

    renderItem = ({ item, index }) => {
        let key = item.metaKey
        return (
            <View style={styles.Item} key={index}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', { _id: key })} >
                    <View>
                        <View>
                            <Card style={styles.elevationLow}>
                                <Image
                                    style={{ width: "100%", height: 100, borderRadius: 5 }}
                                    source={{ uri: `${url}` + item.images[0].image }} />
                                <Card style={styles.views}>
                                    <Image style={{ width: 15, height: 15 }} source={require("../../assets/images/view.png")} />
                                    <Text style={{ marginLeft: 3, color: "black", fontWeight: "bold" }}>{item.views}</Text>
                                </Card>
                            </Card>
                        </View>
                        <View style={{padding:5}}>
                            <Text style={{ marginTop: 5, fontSize: 15, fontFamily: 'Roboto-Regular' }} numberOfLines={2} ellipsizeMode={'tail'}>{item.title}</Text>
                            <Text style={{ marginTop: 5, textAlign: "right", fontSize: 10, fontFamily: 'Roboto-Thin' }}>{item.date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        color: "#333160",
        fontSize: 20,
        fontFamily: 'PlayfairDisplay-Bold',
        textAlign: "center",
    }
    ,
    Item: {
        flex: 1,
        margin: 5,
        minWidth: 140,
        maxWidth: 140,
    },
    views: {
        flexDirection: "row",
        width: 55,
        position: "absolute",
        backgroundColor: "#F7F6F6",
        right: 0,
        bottom: 0,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 3,
        paddingRight: 3,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                borderRadius: 5,
            },
            android: {
                elevation: 5,
                borderRadius: 5,
            },
        }),
    },
    elevationLow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                borderRadius: 5,
            },
            android: {
                elevation: 5,
                borderRadius: 5,
            },
        }),
    },
})
