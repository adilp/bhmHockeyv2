import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Image
} from "react-native";


import Logo from '../components/Logo';
import colors from "../config/colors";
import AuthLoading from './AuthLoading';

import * as firebase from 'firebase';



class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
            
        };
    }

    


    async _handlePress(){
        this.setState({loading: true})
        console.log(this.state.password);
        console.log(this.state.email);
        
        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user){
                console.log(user)
                this.setState({loading: false})
                
            })
        }catch (error) {
            console.log(error.toString());
            this.setState({loading: false})
        }
    }

 

    render() {
        if (this.state.loading) {
            return(
                <AuthLoading />
            );
        } else {
            return (
            
                <KeyboardAvoidingView
                behaviour = 'padding'
                style = {styles.signup_container}
              >
                <ScrollView
                  contentContainerStyle = {styles.signup_container}
                  keyboardShouldPersistTaps = 'never'
                >
                  <View style = {styles.signup_form_container}>
                    <Text style={styles.signup_banner_text}>
                      BHAM HOCKEY
                    </Text>
                    <Text>
                      {this.state.errorMessage}
                    </Text>
                    
                    <TextInput
                      style = {styles.signup_input}
                      onChangeText={(text) => this.setState({ email: text })}
                      placeholder = "EMAIL ADDRESS"
                      autoCapitalize = "none"
                      onFocus = { () => this.setState({email: ""})}
                      keyboardType = "email-address"
                      underlineColorAndroid = "#fff"
                    />
                    <TextInput
                      style = {styles.signup_input}
                      onChangeText={(text) => this.setState({ password: text })}
                      placeholder = "PASSWORD"
                      autoCapitalize = "none"
                      onFocus = { () => {
                        this.setState({password: ""});
                      }}
                      secureTextEntry = { true }
                      underlineColorAndroid = "#fff"
                    />
                   
                  </View>
                  <View style = {styles.signup_actions_container}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('Signup')}
                    >
                    <Text
                    style = {styles.login_button}
                       
                    > Dont have an account? </Text>
                    <Text
                    style = {styles.login_button}
                    > Sign up! </Text>
                     
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this._handlePress()}
                      style = {styles.signup_button}
                    >
                      <Text style = {styles.signup_text}>
                        LOGIN
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
                
            );
        }
        
    }
}




export default LoginScreen;

const styles = StyleSheet.create({
    signup_container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
      },
      signup_form_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      },
      signup_banner_text: {
        width: "100%",
        height: 40,
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        letterSpacing: 10,
        textAlign: 'center'
      },
      signup_input: {
        width: 200,
        height: 30,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'left',
        fontSize: 10
      },
      signup_actions_container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      login_button: {
        backgroundColor: '#fff',
        color: "lightgrey",
        width: 200,
        margin: 10,
        height: 20,
        fontSize: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 10
      },
      signup_button: {
        backgroundColor: '#A62C23',
        width: "100%",
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
      },
      signup_text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 10
      },
});
