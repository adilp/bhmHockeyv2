/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  TextInput,
  Picker,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Form from '../components/Form';
import AuthLoading from './AuthLoading';
import * as firebase from 'firebase';
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import App from '../../App';
import api from '../Api';
import axios from 'axios';
//import { TouchableOpacity } from "react-native-gesture-handler";
import {
  getListThunk,
  getUserDetailsThunk,
  getEventCountThunk,
  updateCount,
  getAllEvents,
  getUserThunk,
  getListBalanced,
} from '../actions';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducers from '../Reducer';
import RenderRequestsList from './RenderRequests';
import _ from 'lodash';
import { LongPressGestureHandler } from 'react-native-gesture-handler';

class Event extends Component {
  constructor(props) {
    super(props);
    this.onButtonDelay = _.debounce(this.onButtonPress, 2000);
    this.params = this.props.navigation.state.params;
    this.state = {
      isDisabled: true,
      message: 'default click state',
      fullname: '',
      requestsState: [],
      loading: true,
      registered: false,
      balanced: this.params.balanced,
      userEventDetailsUUID: '',
      list: {},
      check: this.params.reg,
    };
  }

  //Handling Debounce
  registerButtonPressed() {
    this.setState({ registered: true });
    this.onButtonDelay();
  }

  playerOrGoalieAlert() {
    Alert.alert(
      'Goalie or Player?',
      'Are you signing up as a goalie or player?',
      [
        {
          text: 'Player',
          onPress: () => this._handlePress(0),
          //style: 'cancel',
          //onPress: () => return 0,

        },
        {
          text: 'Goalie',
          onPress: () => this._handlePress(1),
        },
        {
          text: 'Cancel',
          onPress: () => console.log("cancel pressed"),
        },
      ],
      { cancelable: false },
    );
  }
  //Button state updated
  onButtonPress() {
    if (!this.fullCheck() || !this.check()) {
      if (this.check()) {
        this.playerOrGoalieAlert();
      } else {
        this._handlePress();
      }

      //console.log("Alerts ", pog);
      //this._handlePress();
    } else {
      Alert.alert(
        'Full',
        'Game is full',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
      this.setState({ registered: false });
    }
  }

  componentDidMount() {
    
    // this._handleStart();
    // if (!this.props.whiteTeamReducer && !this.props.blackTeamReducer) {
    //   alert('Hello');
    // }
  }

  componentWillMount() {
    var passedUuid = this.params.uuid;
    //this.props.getListThunk(this.params.uuid);
    // this.props.getUserDetailsThunk();
    this.props.getEventCountThunk(this.params.uuid);
    this.makingAPIcall(passedUuid);
    this.check();
    // this.props.getUserThunk();
    // this.props.getListBalanced(this.params.uuid);
  }

  makingAPIcall(uuid) {
    //this.setState({loading: true});
    let url =
      api.backend + 'userEventDetails/getEventDetailsByEventUUID/' + uuid;
    axios.get(url).then(res => {
      this.setState({ list: res.data });
      console.log("this is list ", this.state.list);
      this.setState({ loading: false });
    });
  }

  async _handleStart(): Promise<void> {
    var that = this;
    var ref = firebase.database().ref('SignUp/' + this.params.uuid);

    ref.once('value').then(function (snapshot) {
      snapshot.forEach(function (child) {
        let currentlike = child.val();
        //console.log("sched ", currentlike)
        that.setState({
          requestsState: [...that.state.requestsState, currentlike],
        });
        that.setState({ loading: true });
      });
    });
  }
  //UUID generator
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  //Checking to see if user exists in either team
  check() {
    let _ = require('underscore');
    var checking = true;
    Object.values(this.state.list).map((requesta, i) => {
      // eslint-disable-next-line prettier/prettier
      if (('Is eqal ', _.isEqual(requesta.player_uuid, this.props.userDetailsReducer.uuid))) {
        // eslint-disable-next-line prettier/prettier
        this.setState({ userEventDetailsUUID: requesta.uuid })
        console.log("This is checking ", this.state.userEventDetailsUUID)
        checking = false;
      }
    });
    return checking;
  }

  //Checking to see if any spots available

  fullCheck() {
    console.log(
      'number of total spots at the moment ',
      this.props.eventcountReducer,
    );
    if (this.props.eventcountReducer == 0) {
      console.log('Zero spots aval');
      return true;
    } else {
      console.log('There are ' + this.props.eventcountReducer + ' available');
      return false;
    }
  }

  renderHeader() {
    return (
      <Block flex={0.42} column style={{ marginHorizontal: 15 }}>
        <Block flex={false} row style={{ marginVertical: 15 }}>
          <Block center>
            <Text h3 white style={{ marginRight: -(25 + 5) }}>
              {this.params.date}
            </Text>
          </Block>
        </Block>
        <Block card shadow color="white" style={styles.headerChart}>
          <ScrollView>
            <Block collumn center>
              <Text h1> {this.params.puckdrop}</Text>
            </Block>
            <Block row space="between" style={{ marginHorizontal: 30 }}>
              <Block flex={false} row center>
                <Text caption bold tertiary>
                  Price:{' '}
                </Text>
                <Text h2 style={{ marginHorizontal: 10 }}>
                  ${this.params.price}
                </Text>
              </Block>

              <Block flex={false} row center>
                <Text caption bold primary style={{ marginHorizontal: 10 }}>
                  Spots Available:
                </Text>
                <Text h2>{this.props.eventcountReducer}</Text>
              </Block>
            </Block>
            <Block
              flex={0.5}
              collumn
              center
              space="between"
              style={{ marginHorizontal: 30 }}>
              <Block flex={false} row center>
                <Text caption bold primary style={{ marginHorizontal: 10 }}>
                  Level: {this.params.level}
                </Text>
              </Block>
              <Text caption light>
                Organizer venmo:
              </Text>
              <Text caption light>
                {this.params.venmo}
              </Text>
            </Block>
            <Block flex={1} />
          </ScrollView>
        </Block>
      </Block>
    );
  }

  //figuring out the path in db to update
  togglePaidUnPaid(request, team) {
    let vpath = 'TeamsList/' + this.params.uuid + '/' + team + '/';
    let SingupPath = 'SignUp/' + this.params.uuid + '/';
    let newStatus = '';
    let Paid = 'Paid';
    let unpaid = 'unpaid';
    let vstatus = '';
    let emmpty = 'Empty';

    if (
      request.Name == emmpty ||
      this.props.userDetailsReducer != this.params.organizer
    ) {
      console.log('EMpty or same guys');
    } else {
      try {
        var signupUid = this.uuidv4();
        firebase
          .database()
          .ref('TeamsList/' + this.params.uuid + '/' + team)
          .once('value', snapshot => {
            snapshot.forEach(child => {
              console.log('toggle child', child.val());
              if (request.Name === child.val().Name) {
                vpath += child.key;
                if (child.val().Paid === Paid) {
                  console.log('Unpaid');
                  vstatus = 'unpaid';
                } else {
                  vstatus = 'Paid';
                }
              }
            });
          })
          .then(
            firebase
              .database()
              .ref('SignUp/' + this.params.uuid)
              .once('value', snapshot => {
                console.log('snapshot in firebase ', snapshot.val());
                snapshot.forEach(child => {
                  console.log('snapshot in firebase child ', child.val());
                  if (child.val().scheduler === request.Name) {
                    SingupPath += child.key;
                    console.log(SingupPath);
                    if (child.val().Paid == Paid) {
                      newStatus = 'unpaid';
                    } else {
                      newStatus = 'Paid';
                    }
                  }
                });
              }),
          )

          .then(this.updateToggle(vpath, vstatus, SingupPath, newStatus))

          .catch(error => {
            //error callback
            console.log('error ', error);
          });
      } catch (e) {
        alert(e);
      }
    }
  }
  //Make database update here
  updateToggle(vpath, vstatus, SignupPath, newStatus) {
    //console.log("Update ", vpath)
    firebase
      .database()
      .ref(vpath)
      .update({ Paid: vstatus });
    firebase
      .database()
      .ref(SignupPath)
      .update({ Paid: newStatus });
  }
  //Deleting user if owner
  _onLongPress(request) {
    console.log('long pressed ', request);
    if (this.props.userDetailsReducer.uuid != this.params.organizer) {
      console.log('Not authorized');
    } else {
      Alert.alert(
        'Edit',
        'Remove ' + request.Name + ' from list?',
        [
          {text: 'Change Team', onPress: () => this.changeTeamsAlert(request.uuid)},
          {text: 'Paid/Unpaid', onPress: () => this._toggleNewPaidUnpaid(request.payment_status, request.uuid)},

          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'Remove', onPress: () => this.removeFromList(request.uuid) },
        ],
        { cancelable: false },
      );
      // Alert.alert("you have removed ", request.Name);
      // this.removeFromList(request.Name)
    }
  }

  async _toggleNewPaidUnpaid(current, uuid): Promise<void>{
    var status = '';
    if (current === "PAID"){
      status = "UNPAID"
    } else {
      status = "PAID"
    }
      try {
        let url = api.backend + 'userEventDetails/' + uuid;
        axios.put(url, {
          payment_status: status,
        }).then(response => {
          console.log("After payment :" + response);
          this.makingAPIcall(this.params.uuid);
        });
      } catch (e) {
        alert(e);
      }
  }

  changeTeamsAlert(uuid){

    Alert.alert(
      'Change team',
      'Change to: ',
      [
        {text: 'Waitlist', onPress: () => this._changeTeamApiCall(uuid, "")},
        {text: 'Black', onPress: () => this._changeTeamApiCall(uuid, "Black")},

        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'White', onPress: () => this._changeTeamApiCall(uuid, "White") },
      ],
      { cancelable: false },
    );

  }
async _changeTeamApiCall(uuid, team): Promise<void>{
  try {
    let url = api.backend + 'userEventDetails/' + uuid;
    axios.put(url, {
      team_name: team,
    }).then(response => {
      console.log("After payment :" + response);
      this.makingAPIcall(this.params.uuid);
    });
  } catch (e) {
    alert(e);
  }
}

  renderRequestsRedux() { 
    // var registerButton;
    // if (!this.state.registered){
    //   if (this.check){
    //     registerButton = <Text style={styles.buttonText}>Register</Text>
    //   } else {
    //     registerButton = <Text style={styles.buttonText}>Un register</Text>
    //   }
    // } else {
    //   registerButton = <Text style={styles.buttonText}>Loading</Text>

    // }
    if (this.state.registered) {
      return (
        <Block flex={0.8} color="gray2" style={styles.requests}>
          <Block center>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.registerButtonPressed()}>
              <ActivityIndicator size="small" />
            </TouchableOpacity>
          </Block>

          <Block flex={false} row space="between" style={styles.requestsHeader}>
            <Text h3>White team:</Text>
          </Block>
          <Block row card shadow color="white" style={styles.request}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ActivityIndicator size="large" />
              {Object.values(this.state.list).map((request, i) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={i}
                //onPress={() => this.togglePaidUnPaid(request, 'whiteTeam')}
                onLongPress={() => this._onLongPress()}
                >
                  <Block flex={0.75} column middle>
                    <Block row space="between">
                      <Text caption style={{ marginVertical: 8 }}>
                        {request.firstName} {request.lastName}
                      </Text>
                      <Text caption style={{ marginVertical: 8 }}>
                        {request.team_name}
                      </Text>
                    </Block>
                  </Block>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Block>
          {/*   <Block flex={false} row space="between" style={styles.requestsHeader}>
            <Text h3>Black team:</Text>
          </Block>
          <Block row card shadow color="white" style={styles.request}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ActivityIndicator size="large" />
              {this.props.blackTeamReducer.blackTeam.map((request, i) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={i}
                  onPress={() => this.togglePaidUnPaid(request, 'blackTeam')}
                  onLongPress={() => this._onLongPress()}>
                  <Block flex={0.75} column middle>
                    <Block row space="between">
                      <Text caption style={{marginVertical: 8}}>
                        {request.Name}
                      </Text>
                      <Text caption style={{marginVertical: 8}}>
                        {request.Paid}
                      </Text>
                    </Block>
                  </Block>
                </TouchableOpacity>
              ))}
            </ScrollView>
              </Block> */}
        </Block>
      );
    } else {
      return (
        <Block flex={0.8} color="gray2" style={styles.requests}>
          <Block center>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.registerButtonPressed()}>
              <Text style={styles.buttonText}> 
                {
                    // this.state.list.map( (neighbour) => {
                    //   if (neighbour.player_uuid == this.props.userDetailsReducer.uuid) {
                    //     return (<Text>Un-register</Text>)
                    //   } else{
                    //     return (<Text>Register</Text>)
                    //   }
                    // })

                   //registerButton

                  (() => {
                    if (!this.state.check) {
                      console.log("check state is false");
                      return (<Text style={styles.buttonText}>Un- Register </Text>);
                    } else {
                      console.log("check state is true");
                      return (<Text style={styles.buttonText}> Register </Text>);
                    }
                  })()
                }
              </Text>
            </TouchableOpacity>
          </Block>
          <Block flex={false} row space="between" style={styles.requestsHeader}>
            <Text h3>Signed up:</Text>
          </Block>
          <Block row card shadow color="white" style={styles.request}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {Object.values(this.state.list).map((request, i) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={i}
                //onPress={() => this.togglePaidUnPaid(request, 'whiteTeam')}
                onLongPress={() => this._onLongPress(request)}
                >
                  <Block flex={0.75} column middle>
                    <Block row space="between">
                      <Text caption style={{ marginVertical: 8 }}>
                        {request.firstName} {request.lastName}
                      </Text>
                      <Text caption style={{ marginVertical: 8 }}>
                        {
                          //Render text goalie if it is 1.
                          (() => {
                            if (request.goalie === 1) {
                              return (<Text> Goalie </Text>);
                            } else {
                              return (<Text> {request.team_name} </Text>)
                            }
                          })()
                        }
                      </Text>
                      <Text caption style={{ marginVertical: 8 }}>
                        {request.payment_status}
                      </Text>
                    </Block>
                  </Block>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Block>
          {/*   <Block flex={false} row space="between" style={styles.requestsHeader}>
            <Text h3>Black team:</Text>
          </Block>
          <Block row card shadow color="white" style={styles.request}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.props.blackTeamReducer.blackTeam.map((request, i) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={i}
                  onPress={() => this.togglePaidUnPaid(request, 'blackTeam')}
                  onLongPress={() => this._onLongPress(request)}>
                  <Block flex={0.75} column middle>
                    <Block row space="between">
                      <Text caption style={{paddingVertical: 8}}>
                        {request.Name}
                      </Text>
                      <Text caption style={{paddingVertical: 8}}>
                        {request.Paid}
                      </Text>
                    </Block>
                  </Block>
                </TouchableOpacity>
              ))}
            </ScrollView>
              </Block> */}
        </Block>
      );
    }
  }

  //Pressing register button
  async _handlePress(playerType): Promise<void> {
    let event_uuid = this.params.uuid;
    this.setState({ registered: true });
    console.log("Player type: ", playerType);

    //Checking to see if user is already signed up.
    if (this.check()) {
      console.log('full check ', !this.fullCheck());
      //If not then register user and update the counter
      var signupUid = this.uuidv4();
      try {
        let url = api.backend + 'userEventDetails/';
        axios.post(url, {
          uuid: signupUid,
          event_uuid: event_uuid,
          player_uuid: this.props.userDetailsReducer.uuid,
          goalie: playerType,
        }).then(response => {
          this.setState({ registered: false });
          this.makingAPIcall(this.params.uuid);
          this.setState({check: false});
        });


      } catch (e) {
        alert(e);
      }

      //Else already registerd, remove user.
    } else {

      Alert.alert(
        'Remove?',
        'Already registred, remove from list?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Remove',
            onPress: () => this.removeFromList(this.state.userEventDetailsUUID),
          },
        ],
        { cancelable: false },
      );
    }
  }

  //Removing user from list in DB by getting path
  async removeFromList(user): Promise<void> { //removeFromList(user) {
    var delEventuuid = '';
    that = this;
    console.log('Event uuid', this.params.uuid);
    console.log('Event uuid2', this.state.userEventDetailsUUID);
    try {
      let url = api.backend + 'userEventDetails/' + user; //+ this.state.userEventDetailsUUID;
      axios.delete(url).then(response => {
        this.setState({ registered: false });
        this.makingAPIcall(this.params.uuid);
        this.setState({check: true});
      });
    } catch (e) {
      alert(e);
    }
  }

  //Delete event from firebase and navigate back to home
  _deleteEvent() {
    var delEventuuid = '';

    var ref = firebase.database().ref('Events/');
    ref
      .orderByChild('uuid')
      .equalTo(this.params.uuid)
      .on('value', function (snapshot) {
        snapshot.forEach(child => {
          delEventuuid = child.key;
        });
      });
    var remRef = firebase.database().ref('Events/' + delEventuuid);
    remRef.remove();

    this.props.navigation.navigate('Main');
  }

  //Delete event rendering
  deleteEvent() {
    if (this.props.userDetailsReducer.uuid != this.params.organizer) {
      return <Text>.</Text>;
    } else {
      return (
        <TouchableOpacity
          onPress={() => {

            Alert.alert(
              'Remove?',
              'Delete Event?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Remove',
                  onPress: () => console.log('Cancel Pressed') //this.removeFromList(this.props.userDetailsReducer.uuid),
                },
              ],
              { cancelable: false },
            );
            //this._deleteEvent();
          }}
          style={styles.signup_button}>
          <Text style={styles.signup_text}>DELETE</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    
    console.log('helasdf ', this.params);
    console.log('helasdf2 ', this.state.check);

    console.log("this is remove ", this.state.list);
    console.log('Props ', this.props);
    console.log('List uuid ', Object.values(this.props.list));
    Object.values(this.props.list).map((requesta, i) =>
      console.log('teams render ', requesta),
    );

    if (this.props.teamListFetchReducer.isFetching || this.state.loading) {
      return <ActivityIndicator size="large" color="0000ff" />;
    } else {
      return (
        <SafeAreaView style={styles.safe}>
          <ScrollView>
            {this.renderHeader()}
            {this.renderRequestsRedux()}
            {this.deleteEvent()}
            {/*
            



                    {this.renderRequests()}
                <RenderRequestsList uuid={this.params.uuid} />
                */}
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

export default connect(
  state => ({
    teamListFetchReducer: state.teamListFetchReducer,
    blackTeamReducer: state.blackTeamReducer,
    whiteTeamReducer: state.whiteTeamReducer,
    balanceTeamsReducer: state.balanceTeamsReducer,
    userThunk: state.userReducer,
    list: state.listReducer,
    userDetailsReducer: state.userDetailsReducer,
    eventcountReducer: state.eventcountReducer,
    updateCountReducer: state.updateCount,
    eventListReducer: state.eventListReducer,
    userVenmoReducer: state.userVenmoReducer,
  }),
  {
    getListThunk,
    getUserDetailsThunk,
    getEventCountThunk,
    updateCount,
    getAllEvents,
    getUserThunk,
    getListBalanced,
  },
)(Event);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F6F5F5',
  },
  container: {
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A62C23',
  },

  safe: {
    zIndex: 1,
    flex: 1,
    backgroundColor: theme.colors.accent,
  },
  headerChart: {
    paddingTop: 30,
    //paddingBottom: 45,
    zIndex: 1,
  },
  requests: {
    marginTop: -40,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
  },
  request: {
    zIndex: 1,
    padding: 20,
    marginBottom: 20,
  },
  requestStatus: {
    zIndex: 1,
    marginRight: 20,
    overflow: 'hidden',
    height: 90,
  },
  welcome: {
    zIndex: 1,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  instructions: {
    zIndex: 1,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  signupTextCont: {
    zIndex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#455a64',
  },
  signupText: {
    zIndex: 1,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    zIndex: 1,
    backgroundColor: '#3A3232',
    width: 300,
    borderRadius: 25,
    paddingVertical: 10,
  },
  buttonText: {
    zIndex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  requestsHeader: {
    zIndex: 1,
    paddingHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
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
