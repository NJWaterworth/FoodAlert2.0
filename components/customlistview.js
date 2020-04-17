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
                renderItem={({ item }) => <CustomRow
                    title={item.date}
                    description={item.foodItem}
                    image_url={'../images/apple1.png'}
                />}
            />

    </View>
);

export default CustomListview;
