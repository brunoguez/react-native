import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import estilos from '../templates'
import { Button, TextInput } from 'react-native-paper';

const getRandom = () => Math.floor(Math.random() * 1001);

export default function Ex5() {

    const [valor, setValor] = useState(null);
    const [tentativa, setTentativa] = useState('');
    const [exibir, setExibir] = useState(false);
    const [buttonProps, setButtonProps] = useState({ text: "Chute o número" });

    const handleChute = () => {
        console.log({ tentativa, valor, buttonProps, exibir })

        if (exibir) {
            setTentativa('')
            setValor(getRandom());
            setExibir(false);
            setButtonProps((prop) => ({ ...prop, text: "Chute o número" }));
            return;
        }

        if (!tentativa) {
            setButtonProps((prop) => ({ ...prop, text: "Que valor ZOADO, tente outro" }));
            return;
        }
        const numero = Number(tentativa)
        if (Number.isNaN(numero)) {
            setButtonProps((prop) => ({ ...prop, text: "Pelo menos usa um número né" }));
            return;
        }
        if (numero == valor) {
            setButtonProps((prop) => ({ ...prop, text: "Booooa, fala dele(a)... Quer outra rodada?" }));
            setExibir(true);
            return;
        }
        if (valor > numero) {
            setButtonProps((prop) => ({ ...prop, text: "É maior... Tente de novo" }));
            return;
        }
        setButtonProps((prop) => ({ ...prop, text: "É menor... Mais uma vez" }));
    }

    useState(() => {
        setValor(() => getRandom());
    }, [])

    return (
        <View >
            <Text style={styles.text}><b>Exercício 5: </b>Jogo de Adivinhação</Text>
            <Text style={[styles.text, styles.textResult]}>{exibir ? valor : "????"}</Text>
            <TextInput
                style={styles.mb}
                value={tentativa}
                label="Valor do Chute de 1 a 1000"
                inputMode='decimal'
                keyboardType='numeric'
                onChangeText={text => setTentativa(text.replace(',', '.'))}
                onFocus={() => setTentativa('')}
            />
            <Button
                icon="shoe-sneaker"
                mode="contained"
                onPress={handleChute}>
                <Text>{buttonProps.text}</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    ...estilos,
    mb: {
        marginBottom: '1em'
    },
    textResult: {
        fontSize: 50,
    },
})