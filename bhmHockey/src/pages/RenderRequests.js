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
    Animated,
    FlatList
} from "react-native";
import {connect} from 'react-redux';
import { getListThunk } from '../actions';
import Form from '../components/Form';
import firebase from "firebase";
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import App from "../../App";



class RenderRequests extends Component {
    constructor(props) {
        super(props);
        this.params = this.props;
        uuid2 = this.props.uuid;
        this.state = {
           team: [],
          }
    }
    componentWillMount(){
        this.props.getListThunk();
        
    }
    
    componentDidMount(){
        console.log("did mount " , this.params.uuid)
        var uuid = this.params.uuid;
        
        //console.log("Component level array " ,this.props.list)
        //this.props.getListThunk({uuid});
        
    }

    populate() {
        console.log("array ", this.state.team)
        this.setState({ team: this.props.list });
        console.log("after array ", this.state.team)
    }

    

    render() {
        console.log("Component level array " ,this.props.list[0].uuid)
        
        
        return (
            <SafeAreaView style={styles.safe} >
            <Block flex={false} color="gray2" style={styles.requests} >
            
            <ScrollView showsVerticalScrollIndicator={false}>
            {this.props.list.map(request => (
                <TouchableOpacity activeOpacity={0.8} key={`request-${request.uuid}`}>
                <Block flex={0.75} column middle>
                <Text caption style={{ paddingVertical: 8, }}>{request.scheduler}</Text>
            </Block>
                </TouchableOpacity>
            ))}
            </ScrollView>
            </Block>
            </SafeAreaView>
            
        );
    }
}


export default connect(
    state=>({list: state.listReducer}), 
    { getListThunk }
  )(RenderRequests);

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