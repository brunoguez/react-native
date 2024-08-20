import React from 'react'
import { Text, SafeAreaView, TextInput, StyleSheet, Pressable } from 'react-native'

export default function Ex1() {
    const [peso, onChangePeso] = React.useState('');
    const [altura, onChangeAltura] = React.useState('');
    const [viewResultado, onChangeResultado] = React.useState(false);
    return (
        <SafeAreaView>
            <Text style={styles.text} > <b>Exercício 1:&nbsp;</b>Calculadora de IMC Interativa</Text>
            <TextInput
                style={styles.input}
                value={peso}
                onChangeText={onChangePeso}
                placeholder="Insira seu peso"
                inputMode='decimal'
                keyboardType='numeric'
            />
            <TextInput
                style={styles.input}
                value={altura}
                onChangeText={onChangeAltura}
                placeholder="Insira sua altura"
                inputMode='decimal'
                keyboardType='numeric'
            />
            <Pressable style={styles.button} onPress={(a) => {
                console.log(a);
            }}>
                <Text style={styles.textButton}>Calcular!</Text>
            </Pressable>
            {viewResultado && <Text>Resultado</Text>}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        margin: 5,
    },
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