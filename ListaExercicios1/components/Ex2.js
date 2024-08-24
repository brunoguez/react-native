import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, TextInput, StyleSheet, Pressable } from 'react-native'

export default function Ex2() {
    const [peso, setPeso] = React.useState('');
    const [altura, setAltura] = React.useState('');
    const [result, setResult] = React.useState('');
    const [viewResultado, onChangeResultado] = React.useState(false);

    const [generos, setGeneros] = useState([]);

    const urlBase = "https://api.themoviedb.org",
        bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTZlYWFjNGFmZmU1N2E2ZDNiZTdkNjAyNGE4OWQxOCIsIm5iZiI6MTcyNDUwMjUyNi4zNDY0ODYsInN1YiI6IjY2YzkzYmVmNmMzOWRmOThhMGE2ZmMyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OrVpNmjMw6-BikfmqnCAR10nN-ZP6RsQYeJ2n8EhTiE";

    useEffect(() => {
        fetch(`${urlBase}/3/genre/movie/list?language=pt-br`, {
            headers: { 'Authorization': 'Bearer ' + bearerToken },
        }).then(a => a.json())
        .then(a => console.log(a))
    }, []);
    return (
        <SafeAreaView>
            <Text style={styles.text} > <b>Exercício 2:&nbsp;</b>Gerador de recomendação de Filmes</Text>
            <TextInput
                style={styles.input}
                value={peso}
                onChangeText={(text) => setPeso(text.replace(",", "."))}
                placeholder="Insira seu peso"
                inputMode='decimal'
                keyboardType='numeric'
            />
            <TextInput
                style={styles.input}
                value={altura}
                onChangeText={(text) => setAltura(text.replace(",", "."))}
                placeholder="Insira sua altura"
                inputMode='decimal'
                keyboardType='numeric'
            />
            <Pressable style={styles.button} onPress={() => {
                let res = [];
                if (!peso) {
                    res.push("peso");
                }
                if (!altura) {
                    res.push("altura");
                }
                onChangeResultado(true);
                if (res.length > 0) {
                    setResult("Erro: Faltando " + res.join(" / "));
                    return;
                }

                res = (peso / (altura ** 2));

                let imc = (() => {
                    if (res > 16.9 && res < 18.4)
                        return "Abaixo do peso";
                    if (res > 18.4 && res < 24.9)
                        return "Peso normal";
                    if (res > 24.9 && res < 29.9)
                        return "Acima do peso";
                    if (res > 29.9 && res < 34.9)
                        return "Obesidade grau 1";
                    if (res > 34.9 && res < 40)
                        return "Obesidade grau 2";
                    if (res > 40)
                        return "Obesidade grau 3";
                    return "Muito abaixo do peso"
                })()

                setResult("Resultado: " + res.toFixed(2) + " - " + imc);
            }}>
                <Text style={styles.textButton}>Calcular!</Text>
            </Pressable>
            {viewResultado && <Text style={styles.text}>{result}</Text>}
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