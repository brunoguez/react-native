import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCarousel({ movies }) {
    console.log(movies)
    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Image
                    source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                    style={styles.poster}
                />
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    };

    return (
        <Carousel
            data={movies}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width * 0.7}
            loop={true}
            loopClonesPerSide={movies.length}
            enableMomentum={true}
            layout="default"
        />
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    poster: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    title: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
