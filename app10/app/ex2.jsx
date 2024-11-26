import { Stack } from 'expo-router';
import { View } from 'react-native';
import { Styles } from '../src/styles'
import * as React from 'react';
import { TextInput, Button, HelperText, Text, RadioButton } from 'react-native-paper';

export default function Ex2() {
    const [v1, setV1] = React.useState("");
    const [v2, setV2] = React.useState("");
    const [massage, setMessage] = React.useState("");
    const [result, setResult] = React.useState("");

    const [tipoCalculo, setTipoCalculo] = React.useState('f');

    const tipos = {
        f: {
            label: "Força",
            unidade: "Newtons"
        },
        m: {
            label: "Massa",
            unidade: "Kgs"
        },
        a: {
            label: "Aceleração",
            unidade: "M/s²"
        }
    }

    const [text1, setText1] = React.useState(tipos.m.label);
    const [text2, setText2] = React.useState(tipos.a.label);

    const handleTipoCalculo = (value) => {
        setTipoCalculo(value);
        setMessage("");
        setResult("");

        if (value === "f") {
            setText1(tipos.m.label);
            setText2(tipos.a.label);
            return;
        }

        setText1(tipos.m.label);
        setText2(tipos.f.label);
    }

    const handleButton = () => {
        const isForca = tipoCalculo === "f";

        setMessage("");

        let messages = [];
        if (isNaN(v1) || v1 <= 0) messages.push(`${tipos.m.label} inválida`);
        if (isNaN(v2) || v2 <= 0) messages.push(`${tipos[isForca ? "a" : "f"].label} inválida`);
        if (messages.length > 0) {
            setMessage(messages.join(" | "));
            setResult("");
            return;
        }
        let calculo = isForca ? (v1 * v2) : (v2 / v1);
        setResult(calculo.toFixed(2) + (isForca ? " Newtons" : " M/s²"))
    }

    return (
        <View style={Styles.container}>
            <Stack.Screen options={{ title: "Exercício 2" }} />
            <Text>Tipo de Cálculo</Text>
            <RadioButton.Group
                onValueChange={handleTipoCalculo}
                value={tipoCalculo}>
                <RadioButton.Item label="Força" value="f" />
                <RadioButton.Item label="Aceleração" value="a" />
            </RadioButton.Group>
            <TextInput
                style={Styles.input}
                label={text1}
                value={v2}
                onChangeText={distancia => setV2(distancia)}
                keyboardType='numeric'
            />
            <TextInput
                style={Styles.input}
                label={text2}
                value={v1}
                onChangeText={tempo => setV1(tempo)}
                keyboardType='numeric'
            />
            <Button
                icon="calculator"
                mode="contained"
                onPress={handleButton}>
                Calcular
            </Button>
            <HelperText type="error" visible={true}>
                {massage}
            </HelperText>
            <Text variant="displaySmall">{result}</Text>
        </View>
    );
}