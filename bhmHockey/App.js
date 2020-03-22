import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';



import Home from './src/pages/Home';

//import Firebase from './src/Firebase';
import Event from './src/pages/Event';
import AuthLoading from './src/pages/AuthLoading';
import Settings from './src/pages/Settings';
import NewEvent from './src/pages/NewEvent';
import SignupScreen from './src/pages/SignupScreen';
import EditProfile from './src/pages/EditProfile';
import * as firebase from 'firebase';
import Api from './src/Api';
import LoginScreen from './src/pages/LoginScreen';
//import AuthLoading from './AuthLoading';  
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducer';






export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
    }

    console.log(this.state.isAuthenticated);

    //Initialize
    if (!firebase.apps.length) {
      firebase.initializeApp(Api.FirebaseConfig)
    }

    
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

}

onAuthStateChanged = (user) => {
  this.setState({isAuthenticationReady: true});
  this.setState({isAuthenticated: !!user});
}

componentWillMount(){
  //Firebase.init();
  console.log("componentwillMount");
}

  render() {
    
     if (this.state.isAuthenticated) {
       return(
        //<Provider store={ createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
         <HomeAppContainer />
         //</Provider>
         );
     } 
     else {
      return(
        //<Provider store={ createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <AppContainer />
        //</Provider>
        );
     }
         
         
      
  }
}

const HomeTabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    tabBarOptions: {
      activeTintColor: "#A62C23"
    }
  },
  Settings,

});

//const HomeTabNavigator = createBottomTabNavigator();

//If user is not logged in
const AppStackNavigator = createStackNavigator({
  Home: {
    screen: LoginScreen, 
    navigationOptions: {
      //title: 'Registration',
      header: null
    } 
  },
  Signup: { 
    screen: SignupScreen,
    navigationOptions: {
      //title: 'Registration',
      //header: null
    }
  },
  Main: {
    screen: HomeTabNavigator,
    navigationOptions: {
      header: null,
      
    }
  },
  Event: {
    screen: Event,
    navigationOptions: {
      title: "Pickup",
    }
  },
  
  NewEvent: {
    screen: NewEvent,
    navigationOptions: {
      title: "New Event"
    }
  }
});

const AppContainer = createAppContainer(AppStackNavigator);
//If user logged in
const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeTabNavigator, 
    navigationOptions: {
      //title: 'Registration',
      header: null
    } 
  },
  Signup: { 
    screen: SignupScreen,
    navigationOptions: {
      //title: 'Registration',
      //header: null
    }
  },
  Main: {
    screen: HomeTabNavigator,
    activeTintColor: "#A62C23",
    navigationOptions: {
      header: null,
      
    }
  },
  Event: {
    screen: Event,
    navigationOptions: {
      title: "Pickup",
      headerTintColor: "#ffffff",
      headerStyle: {backgroundColor: "#A62C23"}
    }
  },
  
  NewEvent: {
    screen: NewEvent,
    navigationOptions: {
      title: "New Event"
    }
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      title: "Edit Profile",
      headerTintColor: "#ffffff",
      headerStyle: {backgroundColor: "#A62C23"}
    },
  },
});

const HomeAppContainer = createAppContainer(HomeStackNavigator);


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3D3C4C'
  },

  WelcomeHeading: {
      fontSize: 40,
      marginBottom: 20
  },

  subtext: {
      fontSize: 12
  },

  buttonStyle: {
      marginTop: 10,
  }
});
