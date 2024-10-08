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