import { Stack } from 'expo-router';
import { View } from 'react-native';
import { Styles } from '../src/styles'
import * as React from 'react';
import { TextInput, Button, HelperText, Text } from 'react-native-paper';

export default function Ex3() {
    const [massa, setMassa] = React.useState("");
    const [altura, setAltura] = React.useState("");
    const [massage, setMessage] = React.useState("");
    const [result, setResult] = React.useState("");

    const handleButton = () => {
        setMessage("");
        let messages = [];
        if (isNaN(massa) || massa <= 0) messages.push("Peso inválida");
        if (isNaN(altura) || altura <= 0) messages.push("Altura inválido");
        if (messages.length > 0) {
            setMessage(messages.join(" | "));
            setResult("");
            return;
        }
        const calculo = massa * altura * 9.8;
        setResult(calculo.toFixed(2) + " Joules")
    }

    return (
        <View style={Styles.container}>
            <Stack.Screen options={{ title: "Exercício 3" }} />
            <TextInput
                style={Styles.input}
                label='Peso em Kgs'
                value={massa}
                onChangeText={distancia => setMassa(distancia)}
                keyboardType='numeric'
            />
            <TextInput
                style={Styles.input}
                label='Altura em Metros'
                value={altura}
                onChangeText={tempo => setAltura(tempo)}
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