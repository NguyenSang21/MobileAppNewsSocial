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
import { Card } from 'react-native-material-cards';
import { url } from '../../Variables/General'

export default class Box_Similar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        fetch(`${url}news/hoat-dong-doanh-nghiep/4`)
            .then(resp => resp.json())
            .then(data => this.setState({ data: data }))
    }

    render() {
        return (
            <View style={{ flex: 1, marginBottom:40, }}>
                <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ backgroundColor: "#546e7a", width: 7, marginTop: 4, marginBottom: 4, marginRight: 8 }} />
                        <Text style={styles.title}>Sự kiện</Text>
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
                    <View styl={{ alignItems: "center" }}>
                        <View>
                            <Card style={styles.elevationLow}>
                                <Image
                                    style={{ width: "100%", height: 100, borderRadius: 5 }}
                                    source={{ uri: `${url}` + item.images[0].image }} />
                                <Card style={styles.views}>
                                    <Image style={{ width: 15, height: 15 }} source={require("../../assets/images/view.png")} />
                                    <Text style={{ marginLeft: 3, fontWeight: "bold", color: "black" }}>{item.views}</Text>
                                </Card>
                            </Card>
                        </View>
                        <View style={{ padding: 5 }}>
                            <Text style={{ marginTop: 5, fontSize: 16, fontFamily: 'OpenSans-Regular' }} numberOfLines={2} ellipsizeMode={'tail'}>{item.title}</Text>
                            <Text style={{ marginTop: 5, textAlign: "right", fontSize: 10, fontFamily: 'Roboto-Thin' }}>{item.date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: "#333160",
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'PlayfairDisplay-Bold'
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
        width: 60,
        position: "absolute",
        backgroundColor: "#F7F6F6",
        right: 0,
        bottom: 0,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
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
