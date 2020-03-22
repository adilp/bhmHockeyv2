
import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomRow from './CustomRow';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

// class CustomListview extends Component {

//     _keyExtractor = (item, index) => index.id;

//     _renderItem = ({item}) => (
//         <TouchableOpacity onPress={ () => console.log("Item Press")}>
//                 <CustomRow
//                 availability={item.availability}
//                 availableSpots={item.availableSpots}
//                 time={item.time}
//                 level={item.level}
//                 scheduler={item.scheduler}
//                 date={item.date}
                
//                 />
//                 </TouchableOpacity>
//       );

//     render() {
//          return (
//             <FlatList
//                 data={this.props.data}
//                 keyExtractor = {this._keyExtractor}
//                 renderItems = {this._renderItem}
//         );
//     }
  
const CustomListview = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                data={itemList}
                renderItem={({ item }) =>( 
                <TouchableOpacity onPress={ () => console.log("Item Press")}>
                <CustomRow
                availability={item.availability}
                availableSpots={item.availableSpots}
                time={item.time}
                level={item.level}
                scheduler={item.scheduler}
                date={item.date}
                
                />
                </TouchableOpacity>
                )}
                keyExtractor={(itemList, index) => index.toString()}
            />
    </View>
);


export default CustomListview;