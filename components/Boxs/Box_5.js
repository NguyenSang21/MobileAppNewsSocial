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

export default class Box_3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        fetch(`${url}news/tin-du-an/4`)
            .then(resp => resp.json())
            .then(data => this.setState({ data: data }))
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ flexDirection: "row", padding: 10 }}>
                    <View style={{ backgroundColor: "#546e7a", width: 7, marginTop: 4, marginBottom: 4, marginRight: 8 }} />
                    <Text style={styles.title}>Cơ sở hạ tầng</Text>
                </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.data}
                    renderItem={this.renderItem} />
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Category', { _id: "ha-tang" })}>
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../assets/images/button_more_2.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 10 }}>Xem thêm</Text>

                </View>
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
                                    style={{ width: "100%", height: 200, borderRadius: 3 }}
                                    source={{ uri: `${url}` + item.images[0].image }} />
                                    <Card style={styles.views}>
                                        <Image style={{ width: 15, height: 15 }} source={require("../../assets/images/view.png")} />
                                        <Text style={{ marginLeft: 3, fontWeight: "bold", color: "black" }}>{item.views}</Text>
                                    </Card>
                            </Card>

                        </View>
                        <View style={{paddingLeft:5, paddingRight:5,}}>
                            <Text
                                style={{ color: '#252931', fontSize: 20, fontFamily: 'Roboto-Regular', marginLeft: 5, marginRight: 5, marginTop: 10 }}
                                numberOfLines={2}
                                ellipsizeMode={'tail'}>{item.title}</Text>
                            <Text
                                style={{ marginTop: 10, marginLeft: 5, marginRight: 5, fontFamily: 'Roboto-Thin' }}
                                numberOfLines={3}
                                ellipsizeMode={'tail'}
                            >
                                {item.description}
                            </Text>
                            <Text style={{ fontSize: 10, padding: 5, textAlign: "right", fontFamily: 'Roboto-Thin' }}>{item.date}</Text>
                            {
                                index < 2 ?
                                    <View
                                        style={{
                                            marginTop: 20,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            borderBottomColor: '#E4E6F1',
                                            borderBottomWidth: 1,
                                        }}
                                    />
                                    : <Text />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Item: {
        flex: 1,
        margin: 5,
    },
    title: {
        color: "#333160",
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'PlayfairDisplay-Bold'
    },
    views: {
        flexDirection: "row",
        width: 55,
        position: "absolute",
        backgroundColor: "#F7F6F6",
        bottom: 0,
        marginLeft: 10,
        marginBottom: 10,
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
