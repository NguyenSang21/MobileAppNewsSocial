import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, Dimensions, Text, Platform } from 'react-native';
import { Card } from 'react-native-material-cards';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

const images = [
    { "url": "http://www.pci.com.vn/vnt_upload/project/07_2017/DAQ12.jpg", "views": 223, "title": "Thị Trường chứng khoán tăng mạnh", "description": "Có 42 tòa chung cư tái định cư đã đưa vào sử dụng trên địa bàn Hà Nội hiện nay không còn một đồng nào quỹ bảo trì. Và để vận hành các tòa nhà này hầu như phải trông chờ vào sự đóng góp của người dân và hỗ trợ từ phía ngân sách thành phố…" },
    { "url": "http://chungcuvip.biz/chungcuvip/upload/images/chung-cu-lancaster-nui-truc.jpg", "views": 2132, "title": "Cuối 2018, các dự án bất động sản tại Mê Linh sẽ “bừng tỉnh”?", "description": "CafeLand – Mặc dù đã có cởi mở hơn song tâm lý kiêng cữ mua bán nhà đất vào tháng 7 âm lịch (tháng ngâu hay tháng cô hồn) vẫn là một thách thức với các doanh nghiệp bất động sản." },
    { "url": "https://images.vov.vn/w600/uploaded/g3zdcpr1cvuly8uzveukg/2018_01_18/can_ho_de_ban_sdif.jpg", "views": 23, "title": "Thoái vốn tại DNNN: Cần gỡ rối quy định và công khai, minh bạch", "description": "CafeLand - Không thể phủ nhận nhu cầu thuê căn hộ tại các thành phố lớn như Hà Nội và TP.HCM là luôn có, song không phải nhà đầu tư nào cũng luôn thắng lớn với loại hình này." }
];

export default class Carousel_Auto_Scroll extends React.Component {
    renderPage(item, index) {
        return (
            <View key={index} style={{ padding: 2, }}>
                <Card style={styles.elevationLow}>
                    <Image style={{ width: BannerWidth - 14, height: BannerHeight, borderRadius: 3 }} source={{ uri: item.url }} />
                    <Card style={styles.view}>
                        <Image style={{ width: 15, height: 15 }} source={require("../../assets/images/view.png")} />
                        <Text style={{ marginLeft: 2, color: "#0A191F",fontFamily:"OpenSans-Regular" }}>{item.views}</Text>
                    </Card>
                </Card>

                <View style={{ elevation: 5, borderRadius: 5, padding: 5, position: "absolute", bottom: 20, left: 15, marginRight: 25, backgroundColor: "rgba(0,0,0,0.6)" }}>
                    <Text
                        style={{ color: "white", fontSize: 13, fontFamily:"OpenSans-Bold", }}
                        numberOfLines={1}
                        ellipsizeMode="tail">{item.title}</Text>
                    {/* <Text>
                        {item.description}
                    </Text> */}
                </View>
            </View>
        );
    }

    render() {
        return (
            <Carousel
                autoplay
                autoplayTimeout={5000}
                loop
                index={0}
                pageSize={BannerWidth}>
                {images.map((image, index) => this.renderPage(image, index))}
            </Carousel>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        right: 0,
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 13,
        marginTop: 13,
        backgroundColor: "#F7F6F6",
        alignItems: "center",
        borderRadius: 10,
        flexDirection: "row",
        position: "absolute",
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
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
});