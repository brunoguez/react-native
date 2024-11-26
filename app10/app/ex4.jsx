import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as React from 'react'

const markers = [
    {
        title: 'Cemucam',
        description: 'Parque com árvores',
        coordinate: {
            latitude: -23.607279750160373,
            longitude: -46.844052378019235
        }
    },
    {
        title: 'Templo Zu Lai',
        description: 'Templo Budista',
        coordinate: {
            latitude: -23.585464972331504,
            longitude: -46.88195124464934
        }
    },
    {
        title: 'Granja Vianna',
        description: 'Centro comercial de Cotia',
        coordinate: {
            latitude: -23.588511178433745,
            longitude: -46.82918811563665
        }
    },
];

export default function Ex4() {
    console.log({ markers })
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Exercício 4" }} />
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -23.607279750160373,
                    longitude: -46.844,
                    latitudeDelta: 0.0822,
                    longitudeDelta: 0.0921,
                }}
                region={{
                    latitude: -23.607279750160373,
                    longitude: -46.844052378019235,
                    latitudeDelta: 0.0822,
                    longitudeDelta: 0.0921,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: -23.588511178433745,
                        longitude: -46.82918811563665
                    }}
                />
                {markers.map((marker, index) =>
                    <Marker
                        key={index}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                    />
                )}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});


