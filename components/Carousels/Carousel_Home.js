import React, { Component } from 'react'
import Carousel from 'react-native-snap-carousel';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'
import { Card } from 'react-native-material-cards'
import { url } from '../../Variables/General'

export default class Carousel_Home extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            data: []
        }
    }

    componentDidMount() {
        fetch(`${url}news/cao-oc-van-phong/4`).then(resp => resp.json()).then(data=> this.setState({data}))
        console.log(this.state.data)
    }

    _renderItem ({item, index}) {
        return (
            <TouchableHighlight underlayColor='gray' onPress={() => this.props.navigation.navigate('Detail', { name: 'Jane' })} >
                <Card style = {styles.Container}>
                    <Image
                        style = {styles.ImageCarousel}
                        source = {{uri:`${url}` + item.images[0].image}}
                    />
                    <Text>{item.title}</Text>
                </Card>
            </TouchableHighlight>
        );
    }

  render() {
    return (
        <View style={{width:'100%', marginTop:5}}>
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.data}
                renderItem={this._renderItem}
                sliderWidth={360}
                itemWidth={256}
                layout={'default'}
                firstItem={4}
                />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    Container : {
        borderRadius: 10,
        flex:0,
        marginTop:5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 200,
        backgroundColor: "#ffffff",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        // overflow:'hidden'
    },
    ImageCarousel :
    {
        top:0,
        shadowOpacity: 0.75,
        width: 256,
        height: 170,
    },
})