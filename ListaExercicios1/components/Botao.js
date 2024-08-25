import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Botao({ text, onPress }) {
    return (
        <View>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.textButton}>{text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});