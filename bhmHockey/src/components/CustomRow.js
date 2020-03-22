import React from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';
import Block from './Block';
import * as theme from '../theme';
import Text from './Text';

const CustomRow = ({ availability, availableSpots, time, level, scheduler, date }) => (
   
            <Block row card shadow color="white" style={styles.request}>
                <Block
                    flex={0.45}
                    card
                    column
                    color="secondary"
                    style={styles.requestStatus}
                >
                    <Block flex={0.45} middle center color={theme.colors.primary}>
                        <Text medium white style={{ textTransform: "uppercase", padding: 5 }}>
                            {availability}
                        </Text>
                    </Block>
                    
                   
                    <Block flex={0.7} center middle>
                        <Text h2 white>
                            {availableSpots}
                            
                        </Text>
                    </Block>
  
                </Block>
                <Block flex={0.75} column middle>
                    <Text h3 style={{ paddingVertical: 8, }}>{date}</Text>
                    <Text caption semibold>
                        Time: {time}  •  Level: {level}  •  Organizer: {scheduler}
                    </Text>
                </Block>
            </Block>
    
);
export default CustomRow;

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