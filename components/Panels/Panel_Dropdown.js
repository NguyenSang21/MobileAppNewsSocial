import React, { Component } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';

class Panel_Dropdown extends Component {
    constructor(props) {
        super(props);

        this.icons = {
            'up': require('../../assets/images/up-arrow.png'),
            'down': require('../../assets/images/down-arrow.png')
        };

        this.state = {
            title: props.title,
            imageUri: props.imageUri,
            expanded: true,
            animation: new Animated.Value()
        };
        
    }

    toggle() {
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded: !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event) {
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event) {
        this.setState({
            minHeight: event.nativeEvent.layout.height
        });
    }

    render() {
        let icon = this.icons['down'];

        if (this.state.expanded) {
            icon = this.icons['up'];
        }

        return (
            <Animated.View
                style={[styles.container, { height: this.state.animation }]}>
                <View onLayout={this._setMinHeight.bind(this)}>
                    <TouchableOpacity onPress={this.toggle.bind(this)}>
                        <View style={{ marginLeft: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Image style={{ width: 30, height: 30, margin: 10 }} source={this.state.imageUri} />
                            <Text style={{ width: 150, color:'black', fontFamily:'PlayfairDisplay-Regular', fontSize:17 }} numberOfLines={1} ellipsizeMode={'tail'}>{this.state.title}</Text>
                            </View>
                            
                            <Image style={{ marginRight: 10, width: 10, height: 10 }} source={icon} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>

            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        overflow:"hidden"
    },
    body: {
        padding: 10,
        paddingTop: 0
    }
});

export default Panel_Dropdown;