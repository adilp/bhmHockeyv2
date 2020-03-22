import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image
} from "react-native";


class Logo extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image  style={{width:40, height: 70}}
                source={require('../images/logo.png')}/>
            <Text style={styles.logoText}>B</Text>	

            </View>
        );
    }
}
export default Logo;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
    },

    logoText : {
        marginVertical: 15,
        fontSize:18,
        color:'rgba(255, 255, 255, 0.7)'
    }
});
