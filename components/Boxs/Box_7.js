import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform
} from "react-native";
import { url } from "../../Variables/General";
import { Card } from "react-native-material-cards";

export default class Box_7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch(`${url}news/khu-can-ho-cao-cap/4`)
      .then(resp => resp.json())
      .then(data => this.setState({ data: data }));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ backgroundColor: "#546e7a", width: 7, marginTop: 4, marginBottom: 4, marginRight: 8 }} />
            <Text style={styles.title}>Trung tâm thương mại</Text>
          </View>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Category', { _id: "ha-tang" })}>
            <Image
              style={{ width: 32, height: 32 }}
              source={require("../../assets/images/button_more.png")}
            />
          </TouchableOpacity>

        </View>
        <FlatList
          keyExtractor={(index) => index.toString()}
          style={styles.Container}
          data={this.state.data}
          renderItem={this.renderItem}
          numColumns={2}
        />
      </View>

    );
  }

  renderItem = ({ item, index }) => {
    let key = item.metaKey;
    return (
      <View style={index >= 2 ? styles.Item2 : styles.Item} key={index}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Detail", { _id: key })}
        >
          <View>
            <View>
              <Card style={styles.elevationLow}>
                <Image
                  style={{ width: "100%", height: 150, borderRadius: 5 }}
                  source={{ uri: `${url}` + item.images[0].image }}
                />
                <Card style={styles.views}>
                  <Image style={{ width: 15, height: 15 }} source={require("../../assets/images/view.png")} />
                  <Text style={{ marginLeft: 3, color: "black", fontWeight: "bold" }}>{item.views}</Text>
                </Card>

              </Card>

            </View>

            <View style={{ marginTop: 10, marginLeft: 1, marginRight: 1 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'Roboto-Regular',
                  color: "#252931"
                }}
                numberOfLines={2}
                ellipsizeMode={"tail"}
              >
                {item.title}
              </Text>
            </View>

            <View style={{ marginTop: 5, marginLeft: 2, marginRight: 2 }}>
              <Text
                style={{ color: "#6B6F73", fontFamily: 'Roboto-Thin' }}
                numberOfLines={2}
                ellipsizeMode={"tail"}
              >
                {item.description}
              </Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ textAlign: "right", fontSize: 10, fontFamily: 'Roboto-Thin' }}>
                {item.date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  Container: {
    marginVertical: 20,
    flex: 1,
  },
  title: {
    color: "#333160",
    fontSize: 20,
    textAlign: "center",
    fontFamily: 'PlayfairDisplay-Bold'
  }
  ,
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
  }
  ,
  Item: {
    marginLeft: 10,
    width: 165,
  },
  Item2: {
    marginLeft: 10,
    width: 165,
    marginTop: 25,
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
});
