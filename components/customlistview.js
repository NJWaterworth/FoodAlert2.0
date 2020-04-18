import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CustomRow from '../components/customrow';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const CustomListview = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                data={itemList}
                keyExtractor = {({x, i}) => i }
				renderItem = {({item}) =>
				<CustomRow
                    title={item.food}
                    description={item.date}
                />}
            />

    </View>
);

export default CustomListview;
