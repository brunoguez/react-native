import React from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { useState } from 'react';


export default function App() {

    const [nome, setNome] = useState();
    const getNome = (text) => {
        if (text) {
            setNome("Seja bem-vindo " + text);
            return;
        }
        setNome("");
    }

    return (
        <View style={styles.container}>
            <View style={{ height: 65, backgroundColor: '#222', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Image
                    source={require('./src/assets/boot.jpeg')}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                />
                <Image
                    source={require('./src/assets/celular.png')}
                    style={{ width: 110, height: 30 }}
                    resizeMode="contain"
                />
                <Image
                    source={require('./src/assets/laptop.png')}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                />
            </View>

            <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}>
                <Text style={styles.texto}>Sistema do Professor Mário</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    onChangeText={getNome}
                />
                <Text style={styles.texto}> {nome} </Text>
            </View>
            {/* Rodapé*/}
            <View style={{ height: 65, backgroundColor: '#222' }}>
                <Text style={{ color: '#fff' }}>Rodapé</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: '#222',
        margin: 10,
        fontSize: 20,
        padding: 10
    },
    texto: {
        textAlign: 'center',
        fontSize: 25
    }
})
