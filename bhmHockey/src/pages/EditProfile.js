import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import Logo from '../components/Logo';
import colors from '../config/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthLoading from './AuthLoading';
import * as firebase from 'firebase';
import {getUserDetailsThunk, getUserThunk} from '../actions';
import Reducers from '../Reducer';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import axios from 'axios';
import api from '../Api';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.userFormDetails.firstName,
      lastName: this.props.userFormDetails.lastName,
      email: this.props.userFormDetails.email,
      password: '',
      level: this.props.userFormDetails.level,
      uid: '',
      venmo: this.props.userFormDetails.venmo,
      loading: false,
    };
  }

  componentWillMount() {
    this.props.getUserDetailsThunk();
    this.props.getUserThunk();
  }

  async _handlePress(): Promise<void> {
    console.log('signed up');

    let oldstate = this;

    try {
      let url = api.backend + 'users/' + this.props.userReducer;

      axios
        .put(url, {
          firstname: oldstate.state.firstName,
          lastname: oldstate.state.lastName,
          level: oldstate.state.level,
          venmo: oldstate.state.venmo,
          email: this.props.userFormDetails.email,
        })
        .then(function(response) {
          console.log('Post ', response);
        });

      // try {
      //   firebase
      //     .database()
      //     .ref(`/UsersList/${this.props.userReducer}`)
      //     .set({
      //       firstname: oldstate.state.firstName,
      //       lastname: oldstate.state.lastName,
      //       level: oldstate.state.level,
      //       venmo: oldstate.state.venmo,
      //       email: this.props.userFormDetails.email,
      //     });
    } catch (e) {
      alert(e);
    }
    //console.log("after login ",  this.state)
    Alert.alert('Edit Profile', 'Profile Updated!');
  }

  render() {
    console.log('RenderEditProf ', this.props);
    if (this.state.loading === true) {
      return <AuthLoading />;
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
          contentContainerStyle={styles.signup_container2}>
          <View style={styles.signup_form_container}>
            <Text style={styles.signup_banner_text}>
              {this.props.userFormDetails.firstName}{' '}
              {this.props.userFormDetails.lastName}
            </Text>
            <Text>{this.state.errorMessage}</Text>
            <Text style={styles.signup_input2}>First Name: </Text>
            <TextInput
              style={styles.signup_input}
              onChangeText={text => this.setState({firstName: text})}
              placeholder={this.props.userFormDetails.firstName}
              //   autoCapitalize = "none"
              onFocus={() => this.setState({firstName: ''})}
              //   keyboardType = "email-address"
              underlineColorAndroid="#fff"
            />
            <Text style={styles.signup_input2}>Last Name: </Text>
            <TextInput
              style={styles.signup_input}
              onChangeText={text => this.setState({lastName: text})}
              placeholder={this.props.userFormDetails.lastName}
              //   autoCapitalize = "none"
              onFocus={() => this.setState({lastName: ''})}
              //   keyboardType = "email-address"
              underlineColorAndroid="#fff"
            />
            <Text style={styles.signup_input2}>Playing Experience: </Text>
            <TextInput
              style={styles.signup_input}
              onChangeText={text => this.setState({level: text})}
              placeholder="Playing Experience (Gold, Silver, Bronze) "
              //   autoCapitalize = "none"
              onFocus={() => this.setState({level: ''})}
              //   keyboardType = "email-address"
              underlineColorAndroid="#fff"
            />
            <Text style={styles.signup_input2}>Venmo: </Text>
            <TextInput
              style={styles.signup_input}
              onChangeText={text => this.setState({venmo: text})}
              placeholder={this.props.userVenmoReducer.venmo}
              //   autoCapitalize = "none"
              onFocus={() => this.setState({venmo: ''})}
              //   keyboardType = "email-address"
              underlineColorAndroid="#fff"
            />
          </View>
          <TouchableOpacity
            onPress={() => this._handlePress()}
            style={styles.signup_button}>
            <Text style={styles.signup_text}>SAVE</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        // </KeyboardAvoidingView>
      );
    }
  }
}

export default connect(
  state => ({
    userVenmoReducer: state.userVenmoReducer,
    userFormDetails: state.userFormDetails,
    userReducer: state.userReducer,
  }),
  {getUserDetailsThunk, getUserThunk},
)(EditProfile);

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
    justifyContent: 'center',
  },
  signup_banner_text: {
    width: '100%',
    height: 40,
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 10,
    textAlign: 'center',
  },
  signup_input: {
    width: 200,
    height: 30,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 10,
  },
  signup_input2: {
    width: 200,
    borderColor: 'gray',
    //borderBottomWidth: 1,
    //marginTop: 0,
    //marginBottom: 0,
    textAlign: 'left',
    fontSize: 10,
  },
  signup_actions_container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  login_button: {
    backgroundColor: '#fff',
    color: 'lightgrey',
    width: 200,
    margin: 10,
    height: 20,
    fontSize: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
  },
  signup_button: {
    backgroundColor: '#C4DE9F',
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signup_text: {
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 10,
  },
});
