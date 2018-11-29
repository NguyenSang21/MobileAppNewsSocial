import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform
} from "react-native";
import { url } from "../../Variables/General";
import { Card } from "react-native-material-cards";

export default class Box_2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch(`${url}news/khu-cong-nghiep/4`)
      .then(resp => resp.json())
      .then(data => this.setState({ data: data }));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", padding: 10, marginBottom: 5 }}>
          <View style={{ backgroundColor: "#546e7a", width: 7, marginTop: 4, marginBottom: 4, marginRight: 8 }} />
          <Text style={styles.title}>Khu công nghiệp</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          style={{ flex: 1 }}
          data={this.state.data}
          renderItem={this._renderItem}
        />
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Category", { _id: "ha-tang" })
            }
          >
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../assets/images/button_more_2.png")}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 10 }}>Xem thêm</Text>
        </View>
      </View>
    );
  }

  _renderItem = ({ item, index }) => {
    let key = item.metaKey;
    return (
      <View style={styles.Item}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Detail", { _id: key })}
        >
          <View style={{ flexDirection: "row" }}>
          <View>
              <Card style={styles.elevationLow}>
                <Image
                  style={{ width: 160, height: 110, borderRadius: 5, padding: 5 }}
                  source={{ uri: `${url}` + item.images[0].image }}
                />
                <Card style={styles.views}>
                  <Image style={{ width: 15, height: 15 }} source={require("../../assets/images/view.png")} />
                  <Text style={{ marginLeft: 3, fontWeight: "bold", color: "#333160" }}>{item.views}</Text>
                </Card>
              </Card>

            </View>
            <View style={{ width: 175 }}>
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={{ color: "#0B1B20", fontSize: 16, fontFamily: 'Roboto-Regular' }}
              >
                {item.title}
              </Text>
              <Text
                numberOfLines={3}
                ellipsizeMode={"tail"}
                style={{ padding: 5, fontFamily: 'Roboto-Thin' }}
              >
                {item.description}
              </Text>
              <Text
                style={{ textAlign: "right", fontSize: 10, fontFamily: 'Roboto-Thin' }}
              >
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
  Item: {
    flex: 1,
    padding:5
  },
  title: {
    color: "#333160",
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Bold',
    textAlign: "center",

  },
  views: {
    flexDirection: "row",
    width: 55,
    position: "absolute",
    backgroundColor: "#F7F6F6",
    right: 0,
    marginRight: 5,
    marginTop: 5,
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
