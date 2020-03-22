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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AuthLoading from './AuthLoading';
import * as firebase from 'firebase';



class SignupScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            level: '',
            uid: '',
            venmo: '',
            loading: false
        };
    }

    


    async _handlePress(): Promise<void> {
        console.log("signed up");
        // console.log(this.state.firstName);
        // console.log(this.state.lastName);
        // console.log(this.state.email);
        let oldstate = this;
        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function(user) {
                oldstate.setState({uid: user.user.uid});
                oldstate.setState({loading: true})
                firebase.database().ref('UsersList/').child(user.user.uid).set({
                    email: oldstate.state.email,
                    firstname: oldstate.state.firstName,
                    lastname: oldstate.state.lastName,
                    level: oldstate.state.level,
                    venmo: oldstate.state.venmo
                }).then((data)=>{
                    //success callback
                    console.log('data ' , data)
                    this.props.navigation.navigate('Main');
                    oldstate.setState({loading: false})
                }).catch((error)=>{
                    //error callback
                    console.log('error ' , error)
                })
                console.log('uid:', oldstate.state.uid);
            })

            //var user = firebase.auth.currentUser;
            
            
            
        } catch (e) {
            alert(e);
        }
        //writeUserData(this.state.email, this.state.firstName, this.state.lastName, this.state.level, this.state.uid)

        console.log("after login ",  this.state.uid)
        
    }

 

    render() {
      if (this.state.loading === true) {
        return(<AuthLoading />)
        
      } else {
      
        return (
            
          //   <KeyboardAvoidingView
          //   behaviour = 'padding'
          //   style = {styles.signup_container}
          // >

          // <ScrollView
          //     contentContainerStyle = {styles.signup_container}
          //     keyboardShouldPersistTaps = 'never'
          //   ></ScrollView>

         
          <KeyboardAwareScrollView 
          contentContainerStyle = {styles.signup_container2}>
            
              <View style = {styles.signup_form_container}>
                <Text style={styles.signup_banner_text}>
                  SIGN UP
                </Text>
                <Text>
                  {this.state.errorMessage}
                </Text>
                <TextInput
                  style = {styles.signup_input}
                  onChangeText={(text) => this.setState({ firstName: text })}
                  placeholder="First Name"
                //   autoCapitalize = "none"
                  onFocus = { () => this.setState({ firstName: "" })}
                //   keyboardType = "email-address"
                  underlineColorAndroid = "#fff"
                />
                <TextInput
                style = {styles.signup_input}
                onChangeText={(text) => this.setState({ lastName: text })}
                placeholder="Last Name"
              //   autoCapitalize = "none"
                onFocus = { () => this.setState({lastName: ""})}
              //   keyboardType = "email-address"
                underlineColorAndroid = "#fff"
              />
                <TextInput
                  style = {styles.signup_input}
                  onChangeText={(text) => this.setState({ email: text })}
                  placeholder = "Email Address"
                  autoCapitalize = "none"
                  onFocus = { () => this.setState({email: ""})}
                  keyboardType = "email-address"
                  underlineColorAndroid = "#fff"
                />
                <TextInput
                  style = {styles.signup_input}
                  onChangeText={(text) => this.setState({ password: text })}
                  placeholder = "Password"
                  autoCapitalize = "none"
                  onFocus = { () => {
                    this.setState({password: ""});
                  }}
                  secureTextEntry = { true }
                  underlineColorAndroid = "#fff"
                />
                <TextInput
                style = {styles.signup_input}
                onChangeText={(text) => this.setState({ level: text })}
                placeholder="Playing Experience (Gold, Silver, Bronze) "
              //   autoCapitalize = "none"
                onFocus = { () => this.setState({level: ""})}
              //   keyboardType = "email-address"
                underlineColorAndroid = "#fff"
              />
              <TextInput
                style = {styles.signup_input}
                onChangeText={(text) => this.setState({ venmo: text })}
                placeholder="Venmo "
              //   autoCapitalize = "none"
                onFocus = { () => this.setState({venmo: ""})}
              //   keyboardType = "email-address"
                underlineColorAndroid = "#fff"
              />
              </View>
              <View style = {styles.signup_actions_container}>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Home')}
                >
                <Text
                style = {styles.login_button}
                   
                > Already have an account? </Text>
                <Text
                style = {styles.login_button}
                > Login </Text>
                 
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => this._handlePress()}
                  style = {styles.signup_button}
                >
                  <Text style = {styles.signup_text}>
                    SIGNUP
                  </Text>
                </TouchableOpacity>
              </View>
           
            </KeyboardAwareScrollView>
          // </KeyboardAvoidingView>

            
        );
                }
    }
}




export default SignupScreen;

const styles = StyleSheet.create({
  signup_container2: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    
  },
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
        backgroundColor: '#C4DE9F',
        width: "100%",
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
      },
      signup_text: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 10
      },
});



