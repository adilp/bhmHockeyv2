import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Button,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    Animated
} from "react-native";
import {connect} from 'react-redux';
import Form from '../components/Form';
import firebase from "firebase";
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import App from "../../App";


class HomeHeader extends Component {
    state = {
        level: 'nan',
        loading: false,
        availableSpots: 'nan',
        date: 'nan',
        time: 'nan',
        level: 'nan',
        scheduler: 'nan'
    }

    componentDidMount() {
        var level = " ";
        var ref = firebase.database().ref('Events/');
        var query = ref.orderByChild('availableSpots').limitToFirst(1);
        var that = this;
        query.once('value', function(snapshot) {
            //console.log(snapshot.val());
            snapshot.forEach(function(child){
                availableSpots = child.val().availableSpots;
                date = child.val().date;
                level = child.val().level;
                scheduler = child.val().scheduler;
                time = child.val().time;
                //console.log("current time", availableSpots,chosenDate, level, scheduler )
                that.setState({ level: level, availableSpots: availableSpots, date: date, scheduler: scheduler, time: time });
                //console.log(that.state.level);
                //console.log(that.state.loading);
                that.setState({loading: true});
                //console.log(that.state.loading);

            })
          
            });
    }

    getEvents() {
        var availableSpots = " ";
        var chosenDate = " ";
        
        var scheduler = " ";
        var currentTime = Date.now();
        
        }
    
    

    render() {
        if (this.state.loading){
            return (
                <Block> 
                <Block flex={false} row style={{ paddingVertical: 15 }}>
                        <Block center>
                        
                            
                      
                            <Text h3 white style={{ marginRight: -(25 + 5) }}>
                                Pickup schedule
                                {/* {this.props.counter} */}
                            </Text>
    
                        </Block>
                    </Block>
                    <TouchableOpacity  style={{ flex: 1}}
                     onPress={this.getEvents()}
                    >
                    
                    
                    <Block card shadow color="white" style={styles.headerChart}>
                        <Block collumn center>
    
                            <Text h3> {this.state.date} </Text>
                            
                             <Text h3> {this.state.time} </Text> 
    
                        </Block>
                        <Block row space="between" style={{ paddingHorizontal: 30 }}>
                            <Block flex={false} row center>
                                <Text caption bold tertiary>Level: </Text>
                                <Text h1 style={{ paddingHorizontal: 10 }}>
                                    {this.state.level}
                      </Text>
                            </Block>
    
                            <Block flex={false} row center>
                                <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                                    Spots Available:
                      </Text>
                                <Text h1>{this.state.availableSpots}</Text>
                            </Block>
                        </Block>
                        <Block
                            flex={0.5}
                            collumn
                            center
                            space="between"
                            style={{ paddingHorizontal: 30 }}
                        >
                            <Text caption light>
                                Organizer:
                    </Text>
                            <Text caption light>
                                {this.state.scheduler}
                    </Text>
                        </Block>
                        <Block flex={1}>
                        </Block>
                    </Block>
                    </TouchableOpacity>
                    </Block>
            );
        }

        return(
            <Block>
            
            </Block>
        )

        
    }
}

function mapStateToProps(state){
    return {
        counter: state.counter
    }
}

export default connect(mapStateToProps)(HomeHeader);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A62C23',
    },

    safe: {
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
        padding: 20,
        marginBottom: 15
    },
    requestStatus: {
        marginRight: 20,
        overflow: "hidden",
        height: 90
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white'
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
        fontWeight: 'bold'
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
    }

});