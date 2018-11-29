import React, { Component } from 'react'
import { View } from 'react-native'

export default class LineHorizontal extends Component {
    render() {
        return (
            <View
                style={{
                    marginLeft: 5,
                    marginRight: 5,
                    borderBottomColor: "#E4E6F1",
                    borderBottomWidth: 1
                }}
            />
        )
    }
}
