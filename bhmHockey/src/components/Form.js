import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Statusbar,
    TextInput,
    TouchableOpacity
} from 'react-native';

class Form extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    placeholderTextColor="white"
                />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="white"
                />
            <TouchableOpacity style ={styles.button}>
                <Text style={styles.buttonText}> {this.props.type}</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

export default Form;


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputBox: {
        width: 300
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        marginVertical: 16
    },
    button: {
        backgroundColor: '#1c313a',
        width: 300,
        borderRadius: 25,
        marginVertical: 16,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    }
})