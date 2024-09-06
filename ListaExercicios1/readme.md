# Objetivo

Essa é a lista de exercícios 1 proposta pelo proferror Mario Baigon no curso de Desenvolvimento de Software Multiplataforma na disciplina de Desenvolvimento Mobile II.

# Arquitetura
App único onde cada elemento é correspondente ao exercício proposto.

### App.js

```js
    import { StyleSheet, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
    import Ex1 from './components/Ex1';
    import Ex2 from './components/Ex2';
    import Ex3 from './components/Ex3';
    import Ex4 from './components/Ex4';
    import Ex5 from './components/Ex5';
    import Ex6 from './components/Ex6';
    import Ex7 from './components/Ex7';
    import Ex8 from './components/Ex8';
    import * as React from 'react';
    import { BottomNavigation, Text } from 'react-native-paper';
    import { SafeAreaProvider } from 'react-native-safe-area-context';
    
    const Ex1Route = () => <Ex1 />;
    const Ex2Route = () => <Ex2 />;
    const Ex3Route = () => <Ex3 />;
    const Ex4Route = () => <Ex4 />;
    const Ex5Route = () => <Ex5 />;
    const Ex6Route = () => <Ex6 />;
    const Ex7Route = () => <Ex7 />;
    const Ex8Route = () => <Ex8 />;
    
    export default function App() {
        const [index, setIndex] = React.useState(0);
        const [routes] = React.useState([
            { key: 'ex1', title: '1', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
            { key: 'ex2', title: '2', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
            { key: 'ex3', title: '3', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
            { key: 'ex4', title: '4', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
            { key: 'ex5', title: '5', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
            { key: 'ex6', title: '6', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
            { key: 'ex7', title: '7', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
            { key: 'ex8', title: '8', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
        ]);
    
        const renderScene = BottomNavigation.SceneMap({
            ex1:Ex1Route,
            ex2:Ex2Route,
            ex3:Ex3Route,
            ex4:Ex4Route,
            ex5:Ex5Route,
            ex6:Ex6Route,
            ex7:Ex7Route,
            ex8:Ex8Route,
        });
    
        return (
            <View style={styles.container}>
                <SafeAreaProvider style={{ width: '100%' }}>
                    <BottomNavigation
                        navigationState={{ index, routes }}
                        onIndexChange={setIndex}
                        renderScene={renderScene}
                    />
                </SafeAreaProvider>
            </View>
        );
    }
    
    const styles = StyleSheet.create({
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
        },
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        scrollView: {
            backgroundColor: 'pink',
            marginHorizontal: 20,
            width: '100%',
            padding: 10,
        },
        text: {
            fontSize: 15,
            textAlign: 'center',
            paddingTop: 10,
            paddingBottom: 10
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
    });
```

## Ex1: Calculadora de IMC Interativa

Crie um aplicativo que permita aos usuários inserirem seu peso e altura e, com base nesses dados, calcular seu Índice de Massa Corporal (IMC). Em seguida, o aplicativo deve exibir uma mensagem indicando se o usuário está abaixo do peso, com peso normal, com sobrepeso ou obeso.

![Exercício 1](https://github.com/brunoguez/react-native/blob/aula1/ListaExercicios1/assets/ex1.png?raw=true)

### Ex1.js

```js
import React from 'react'
import { Text, SafeAreaView, TextInput, StyleSheet, Pressable, Image } from 'react-native'

export default function Ex1() {
    const [peso, setPeso] = React.useState('');
    const [altura, setAltura] = React.useState('');
    const [result, setResult] = React.useState('');
    const [viewResultado, onChangeResultado] = React.useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text} > Exercício 1: Calculadora de IMC Interativa</Text>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
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
```
## Ex2: Gerador de Recomendações de Filmes

Desenvolva um aplicativo que sugira filmes aos usuários com base em suas preferências. O aplicativo pode pedir aos usuários que indiquem seus gêneros de filmes favoritos e, em seguida, usar estruturas de decisão para selecionar filmes recomendados com base nessas preferências.
![ex2](https://github.com/brunoguez/react-native/blob/aula1/ListaExercicios1/assets/ex2_1.png?raw=true)
![enter image description here](https://github.com/brunoguez/react-native/blob/aula1/ListaExercicios1/assets/ex2_2.png?raw=true)
### Ex2.js

```js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { generos } from '../db';
import Botao from './Botao';
import MovieCarousel from './MovieCarousel';

const categories = generos;
export default function Ex2() {
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [viewGeneros, setViewGeneros] = useState(true);
    const [selectedGenero, setSelectedGenero] = useState([]);
    const getMapSelectedButtonsId = () => selectedButtons.map(a => a.id);

    const handlePress = (category) => {
        setSelectedButtons(prevSelected =>
            prevSelected.map(a => a.id).includes(category.id)
                ? prevSelected.filter(item => item.id !== category.id)
                : [...prevSelected, category]
        );
    };

    const handleProcurarFilmes = () => {
        setSelectedGenero(selectedButtons);
        setViewGeneros(false);
    }

    // useState(async () => {
    //     const url = "https://api.themoviedb.org";
    //     const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTZlYWFjNGFmZmU1N2E2ZDNiZTdkNjAyNGE4OWQxOCIsIm5iZiI6MTcyNDUwMjUyNi4zNDY0ODYsInN1YiI6IjY2YzkzYmVmNmMzOWRmOThhMGE2ZmMyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OrVpNmjMw6-BikfmqnCAR10nN-ZP6RsQYeJ2n8EhTiE";
    //     for (const cat of categories) {
    //         await fetch(url + `/3/discover/movie?language=pt-BR&with_genres=${cat.id}&include_adult=false&page=1`, {
    //             headers: {
    //                 Authorization: token
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(res => cat.filmes = res.results.filter(a => a.title[0].charCodeAt() < 400))
    //             // .then(res => cat.filmes = res.results)
    //     }
    //     console.log(categories);
    // }, []);

    return (
        <View style={[{ width: '100%', flex: 1, alignItems: 'center' }]}>
            {viewGeneros && <ScrollView style={{ height: '100%' }}>
                <View style={styles.colunas}>
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
            </ScrollView>}
            {viewGeneros && <Botao text={"Indicar Filmes!"} onPress={handleProcurarFilmes} />}
            {!viewGeneros && <ScrollView style={[{ height: 500 }]}>
                {selectedGenero.map((category) => (
                    <View key={category.id}>
                        <Text style={styles.genreTitle}>{category.name}</Text>
                        <MovieCarousel movies={category.filmes} />
                    </View>
                ))}
            </ScrollView>}
            {!viewGeneros && <Botao text={"Voltar!"} onPress={() => setViewGeneros(true)} />}

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
        width: '100%'
    },
    colunas: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 20,
    },
    button: {
        width: '32%',
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
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
    },
    buttonTextSelected: {
        color: 'white',
    },
    genreTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
});
```

## Ex3: 

Desenvolva um aplicativo que sugira filmes aos usuários com base em suas preferências. O aplicativo pode pedir aos usuários que indiquem seus gêneros de filmes favoritos e, em seguida, usar estruturas de decisão para selecionar filmes recomendados com base nessas preferências.

## Ex4: Gerador de Recomendações de Filmes

Desenvolva um aplicativo que sugira filmes aos usuários com base em suas preferências. O aplicativo pode pedir aos usuários que indiquem seus gêneros de filmes favoritos e, em seguida, usar estruturas de decisão para selecionar filmes recomendados com base nessas preferências.

## Ex5: Gerador de Recomendações de Filmes

Desenvolva um aplicativo que sugira filmes aos usuários com base em suas preferências. O aplicativo pode pedir aos usuários que indiquem seus gêneros de filmes favoritos e, em seguida, usar estruturas de decisão para selecionar filmes recomendados com base nessas preferências.
## Ex6: Gerador de Recomendações de Filmes

Desenvolva um aplicativo que sugira filmes aos usuários com base em suas preferências. O aplicativo pode pedir aos usuários que indiquem seus gêneros de filmes favoritos e, em seguida, usar estruturas de decisão para selecionar filmes recomendados com base nessas preferências.
## Ex7: Gerador de Recomendações de Filmes

Desenvolva um aplicativo que sugira filmes aos usuários com base em suas preferências. O aplicativo pode pedir aos usuários que indiquem seus gêneros de filmes favoritos e, em seguida, usar estruturas de decisão para selecionar filmes recomendados com base nessas preferências.
## Ex8: Gerador de Recomendações de Filmes

Desenvolva um aplicativo que sugira filmes aos usuários com base em suas preferências. O aplicativo pode pedir aos usuários que indiquem seus gêneros de filmes favoritos e, em seguida, usar estruturas de decisão para selecionar filmes recomendados com base nessas preferências.
