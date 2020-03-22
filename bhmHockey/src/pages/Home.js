import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  RefreshControl,
  Platform,
} from 'react-native';

import Form from '../components/Form';
import * as firebase from 'firebase';
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import CustomListView from '../components/CustomListView';
import App from '../../App';
import api from '../Api.js';
import axios from 'axios';
import {
  getListThunk,
  getUserDetailsThunk,
  getEventCountThunk,
  updateCount,
  getAllEvents,
  getUserThunk,
} from '../actions';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducers from '../Reducer';
import RenderRequestsList from './RenderRequests';
import AuthLoading from './Settings';
import LoadingScroll from './AuthLoading';
//import Swiper from 'react-native-web-swiper';
import Swiper from '../config/swiper';
import {AfterInteractions} from 'react-native-interactions';
import _ from 'lodash';
import {NavigationEvents} from 'react-navigation';

class Home extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      isDisabled: true,
      isFetching: true,
      message: 'default click state',
      fullname: '',
      requestsState: [],
      loading: false,
      messages: [],
      golds: [],
      silvers: [],
      bronzes: [],
      dleagues: [],
      loadingfetch: false,
      refreshing: false,
      fadeAnim: new Animated.Value(0),
      textAnim: new Animated.Value(0),
      slideDownAnim: new Animated.Value(0),
      list:'',
      firebaseUser: ''
    };
  }

  componentWillMount() {
   
    this.props.getAllEvents();
    this.listenForMessages();
    this.props.getUserDetailsThunk();
  }

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({ firebaseUser: currentUser.uid});
    this.makingAPIcall(currentUser.uid);
    //List Fade in
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
    //Name Fade in
    Animated.timing(this.state.textAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    //Welcome slide from up
    Animated.timing(this.state.slideDownAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }



   //Get all events current user has registered for 
   makingAPIcall(uuid) {
     console.log("this is uuid in call ", uuid);
    let url = 
      api.backend + 'users/getAllRegisteredEvents/' + uuid;
    axios.get(url).then(res => {
      this.setState({ list: res.data });
      console.log("this is list in api ", this.state.list);
      //console.log("this is the check after api call " ,this.check())
      //this.setState({ loading: false });
    });
  }

  check(eventUuid) {
    let _ = require('underscore');
    var checking = true;
    Object.values(this.state.list).map((requesta, i) => {
      // eslint-disable-next-line prettier/prettier
      if (('Is eqal ', _.isEqual(requesta.player_uuid, this.props.userDetailsReducer.uuid)) && ('Is eqal ', _.isEqual(requesta.event_uuid, eventUuid))) {
        // eslint-disable-next-line prettier/prettier
        //this.setState({ userEventDetailsUUID: requesta.uuid })
        //console.log("This is checking ", this.state.userEventDetailsUUID)
        checking = false;
      }
    });
    return checking;
  }

  takeToEvent(request) {
    let check = this.check(request.uuid);
    console.log("clicked on event ", check)
    this.props.navigation.navigate('Event', {
      spots: request.availableSpots,
      date: request.date,
      puckdrop: request.time,
      level: request.level,
      organizer: request.user_uuid,
      uuid: request.uuid,
      price: request.price,
      venmo: request.venmo,
      balanced: request.balanced,
      reg: check,
    })
  }

  listenForMessages() {
    //Get All events
    that = this;
    let url = api.backend + 'events/getUpcomingEvents/1';
    axios.get(url).then(res => {
      const eventJsonResponse = res.data;
      console.log(eventJsonResponse);
      let messages = [];
      eventJsonResponse.forEach(child => {
        let msg = child;
        messages.push(msg);
      });
      that.setState({messages: messages, isFetching: false});
    });
    // var ref = firebase.database().ref('Events/');
    // ref.orderByChild('epochTime').on('value', function(snapshot) {
    //   let messages = [];
    //   snapshot.forEach(child => {
    //     let msg = child.val();
    //     messages.push(msg);
    //   });
    //   that.setState({messages: messages, isFetching: false});
    // });

   

    //Get Gold schedule
    var gold = firebase.database().ref('Gold/');
    gold.orderByChild('order').on('value', function(snapshot) {
      let messages = [];
      snapshot.forEach(child => {
        let msg = child.val();
        console.log('chilsdf ', msg);
        messages.push(msg);
      });
      that.setState({golds: messages});
    });

    //Get Silver Schedule
    var silver = firebase.database().ref('Silver/');
    silver.orderByChild('order').on('value', function(snapshot) {
      let messages = [];
      snapshot.forEach(child => {
        let msg = child.val();
        console.log('chilsdf ', msg);
        messages.push(msg);
      });
      that.setState({silvers: messages});
    });

    //Get Bronze Schedule
    var bronze = firebase.database().ref('Bronze/');
    bronze.orderByChild('order').on('value', function(snapshot) {
      console.log('This is the snap ', snapshot.val());
      let messages = [];
      snapshot.forEach(child => {
        let msg = child.val();
        console.log('chilsdf ', msg);
        messages.push(msg);
      });
      that.setState({bronzes: messages});
    });

    //Get D league Schedule
    var bronze = firebase.database().ref('DLeague/');
    bronze.orderByChild('order').on('value', function(snapshot) {
      console.log('This is the snap ', snapshot.val());
      let messages = [];
      snapshot.forEach(child => {
        let msg = child.val();
        console.log('chilsdf ', msg);
        messages.push(msg);
      });
      that.setState({dleagues: messages});
    });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.listenForMessages();
    this.setState({refreshing: false});
  };
  render2Header() {
    let {fadeAnim} = this.state;
    return (
      <Block
        flex={false}
        color="gray2"
        style={[styles.requests, {marginBottom: 30}]}>
        <Block
          flex={false}
          column
          space="between"
          style={[styles.requestsHeader, {marginBottom: 10}]}>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: this.state.slideDownAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
              opacity: this.state.textAnim,
            }}>
            <Text
              style={{letterSpacing: 3, fontSize: 30}}
              title
              light
              secondary>
              Welcome,
            </Text>
          </Animated.View>

          <Animated.View style={{opacity: this.state.textAnim}}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 3,
              }}
              title
              secondary>
              {this.props.userDetailsReducer.firstName}!
            </Text>
          </Animated.View>
        </Block>
      </Block>
    );
  }

  renderDLeagueSchedules() {
    return this.renderScrollableNav(this.state.dleagues, 'D League');
  }
  renderBronzeSchedules() {
    return this.renderScrollableNav(this.state.bronzes, 'Bronze');
  }
  renderGoldSchedules() {
    console.log('typesa ', typeof this.state.messages);

    console.log('typesa ', this.state.messages);

    objs = this.state.golds;
    obj2 = this.state.messages;
    obj2.map((request, i) => console.log('R ', request));

    return this.renderScrollableNav(objs, 'Gold');
  }

  renderSilverSchedules() {
    return this.renderScrollableNav(this.state.silvers, 'Silver');
  }

  renderScrollableNav(obj, title) {
    return (
      <Block flex={1} color="gray2" style={styles.requests}>
        <Block
          flex={false}
          style={[
            styles.requestsHeader,
            {alignItems: 'center', justifyContent: 'center', marginBottom: 10},
          ]}>
          <Text light style={{alignItems: 'center', justifyContent: 'center'}}>
            {title} Games:
          </Text>
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          {obj.map((request, i) => (
            <Block key={i} row card shadow color="white" style={styles.request}>
              <Block
                middle
                flex={0.45}
                card
                column
                color="secondary"
                style={styles.requestStatus}>
                <Block flex={0.5} middle center color={theme.colors.primary}>
                  <Text
                    medium
                    white
                    style={{textTransform: 'uppercase', padding: 5}}>
                    {request.Home}
                  </Text>
                </Block>

                <Block flex={0.5} center middle>
                  <Text
                    medium
                    white
                    style={{textTransform: 'uppercase', padding: 5}}>
                    {request.Away}
                  </Text>
                </Block>
              </Block>
              <Block flex={0.75} column middle>
                <Text secondary h3 style={{paddingVertical: 8}}>
                  {request.date}
                </Text>

                <Block flex={false} row style={{paddingVertical: 2}}>
                  <Text secondary h4>
                    TIME:
                  </Text>
                  <Text secondary h4 semibold style={{paddingLeft: 5}}>
                    {request.Time}
                  </Text>
                </Block>
              </Block>
            </Block>
          ))}
        </ScrollView>
      </Block>
    );
  }

  renderRequests3() {
    let {fadeAnim} = this.state;
    var obj = this.state.messages;
    console.log(this.state.messages);
    //var b = ar[0];
    console.log('Loading.... ', this.props.eventLoading);
    if (
      this.props.eventListReducer == null ||
      this.props.eventLoading === false
    ) {
      <Text> Broke </Text>;
    } else {
      return (
        <Block flex={1} color="gray2" style={styles.requests}>
          <Block
            flex={false}
            style={[
              styles.requestsHeader,
              {
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              },
            ]}>
            <Text
              light
              style={{alignItems: 'center', justifyContent: 'center'}}>
              Pickup Games:
            </Text>
          </Block>

          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            {obj.map((request, i) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={i}
                onPress={() =>
                  this.takeToEvent(request)
                  // this.props.navigation.navigate('Event', {
                  //   spots: request.availableSpots,
                  //   date: request.date,
                  //   puckdrop: request.time,
                  //   level: request.level,
                  //   organizer: request.scheduler,
                  //   uuid: request.uuid,
                  //   price: request.price,
                  //   venmo: request.venmo,
                  //   balanced: request.balanced,
                    
                  // })
                }>
                {/*  <Animated.View
                        flex={1}
                        style={{
                            transform: [
                                {
                                  translateY: this.state.slideDownAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [50, 0]
                                  })
                                }
                              ],
                            opacity: fadeAnim }} > */}
                <Block row card shadow color="white" style={styles.request}>
                  <Block
                    middle
                    flex={0.45}
                    card
                    column
                    color="secondary"
                    style={styles.requestStatus}>
                    <Block
                      flex={0.45}
                      middle
                      center
                      color={theme.colors.primary}>
                      <Text
                        medium
                        white
                        style={{textTransform: 'uppercase', margin: 5}}>
                        Spots
                      </Text>
                    </Block>

                    <Block flex={0.7} center middle>
                      <Text h2 white>
                        {request.availableSpots}
                      </Text>
                    </Block>
                  </Block>
                  <Block flex={0.75} column middle>
                    <Text secondary h3 style={{paddingVertical: 8}}>
                      {request.date}
                    </Text>
                    {/* <Text caption semibold>
                                            Time: {request.time}  •  Level: {request.level}  •  Organizer: {request.scheduler}  •  Price: ${request.price} 
                                       </Text> */}
                    <Block flex={false} row style={{paddingVertical: 2}}>
                      <Text secondary caption>
                        TIME:
                      </Text>
                      <Text caption semibold style={{marginLeft: 5}}>
                        {request.time}
                      </Text>
                    </Block>

                    <Block flex={false} row style={{paddingVertical: 2}}>
                      <Text secondary caption>
                        LEVEL:
                      </Text>
                      <Text caption semibold style={{marginLeft: 5}}>
                        {request.level}
                      </Text>
                    </Block>
                    <Block flex={false} row style={{paddingVertical: 2}}>
                      <Text secondary caption>
                        ORGANIZER:
                      </Text>
                      <Text caption semibold style={{marginLeft: 5}}>
                        {request.scheduler}
                      </Text>
                    </Block>
                    <Block flex={false} row style={{paddingVertical: 2}}>
                      <Text secondary caption>
                        PRICE:
                      </Text>
                      <Text caption semibold style={{marginLeft: 5}}>
                        ${request.price}
                      </Text>
                    </Block>
                  </Block>
                </Block>
                {/* </Animated.View> */}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Block>
      );
    }
  }

  render() {
    var obj = this.props.eventListReducer;
    let detailsReducer = this.props.userDetailsReducer
    console.log("This is loading ", detailsReducer)
    console.log("this is the laoding thing " , _.isEmpty({detailsReducer}));

    // if (typeof this.props.userDetailsReducer === 'object') {
      if (_.isEmpty(this.props.userDetailsReducer)) {
      return <LoadingScroll />;
    } else {
      if (this.props.userFormDetails.creator === 1) {
        return (
          <SafeAreaView style={styles.safe}>
          <NavigationEvents
          onWillFocus={payload => {
            console.log("will focus", payload);
            this.makingAPIcall(this.state.firebaseUser);
          }}
        />
            {this.render2Header()}

            <Swiper>
              <View style={{paddingTop: 10, flex: 1}}>
                {this.renderRequests3()}
              </View>
              <View style={{paddingTop: 10, flex: 1}}>
                {this.renderGoldSchedules()}
              </View>
              <View style={{paddingTop: 10, flex: 1}}>
                {this.renderSilverSchedules()}
              </View>
              <View style={{paddingTop: 10, flex: 1}}>
                {this.renderBronzeSchedules()}
              </View>
              <View style={{paddingTop: 10, flex: 1}}>
                {this.renderDLeagueSchedules()}
              </View>
            </Swiper>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('NewEvent')}
              style={styles.TouchableOpacityStyle}>
              <Image
                source={{
                  uri:
                    'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png',
                }}
                style={styles.FloatingButtonStyle}
              />
            </TouchableOpacity>
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView style={styles.safe}>
          <NavigationEvents
          onWillFocus={payload => {
            console.log("will focus", payload);
            this.makingAPIcall(this.state.firebaseUser);
          }}
        />
            {this.render2Header()}

            <Swiper>
              <View style={{paddingTop: 10, flex: 1}}>
                {this.renderRequests3()}
              </View>
              <View style={{paddingTop: 10, flex: 1}}>
                {this.renderGoldSchedules()}
              </View>
              <View style={{paddingTop: 10, flex: 1}}>
                {this.renderSilverSchedules()}
              </View>
              <View style={{paddingTop: 10, flex: 1}}>
                {this.renderBronzeSchedules()}
              </View>
              <View>{this.renderDLeagueSchedules()}</View>
            </Swiper>
          </SafeAreaView>
        );
      }
    }
  }
}

export default connect(
  state => ({
    eventLoading: state.eventListReducer.loading,
    userDetailsReducer: state.userDetailsReducer,
    userFormDetails: state.userFormDetails,
    eventListReducer: state.eventListReducer.arr,
  }),
  {getUserDetailsThunk, getAllEvents},
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray2,
  },

  safe: {
    flex: 1,
    backgroundColor: theme.colors.gray2,
  },
  headerChart: {
    marginTop: 30,
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
    padding: 20,
    marginBottom: 15,
  },
  requestStatus: {
    marginRight: 20,
    overflow: 'hidden',
    height: 90,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  signupTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#455a64',
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
  },

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 10,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
