import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import generos from '../db';

const categories = generos;
export default function Ex2() {
    const [selectedButtons, setSelectedButtons] = useState([]);
    const getMapSelectedButtonsId = () => selectedButtons.map(a => a.id);

    const handlePress = (category) => {
        setSelectedButtons(prevSelected =>
            prevSelected.map(a => a.id).includes(category.id)
                ? prevSelected.map(a => a.id).filter(item => item !== category.id)
                : [...prevSelected, category]
        );
    };

    return (
        <View style={styles.container}>
            {categories.map(category => (
                <TouchableOpacity
                    key={category.id}
                    style={[
                        styles.button,
                        getMapSelectedButtonsId().includes(category.id) && styles.buttonSelected
                    ]}
                    onPress={() => handlePress(category)}
                >
                    <Text style={[
                        styles.buttonText,
                        getMapSelectedButtonsId().includes(category.id) && styles.buttonTextSelected
                    ]}>
                        {category.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    button: {
        minWidth: '32%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: 'transparent',
    },
    buttonSelected: {
        backgroundColor: 'black',
    },
    buttonText: {
        fontSize: '12px',
        color: 'black',
        textAlign: 'center',
    },
    buttonTextSelected: {
        color: 'white',
    },
});