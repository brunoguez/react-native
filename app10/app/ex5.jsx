import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as React from 'react'
import {
    Text,
    TextInput,
    Button,
    HelperText,
    PaperProvider,
    Portal,
    Dialog
} from 'react-native-paper';
import axios from "axios";

export default function Ex5() {
    // const [center, setCenter] = React.useState({
    //     latitude: -23.607279750160373,
    //     longitude: -46.844052378019235
    // });

    // React.useEffect(() => {
    //     setTimeout(() => {
    //         setCenter({
    //             latitude: -23.607279750160373,
    //             longitude: -46.74
    //         })
    //     }, 4000)
    // })
    const mapRef = React.useRef(null);
    const [region, setRegion] = React.useState({
        latitude: -23.6072,
        longitude: -46.844,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
    });

    const [lat, setLat] = React.useState("");
    const [long, setLong] = React.useState("");
    const [messageLatitude, setMessageLatitude] = React.useState("");
    const [messageLongitude, setMessageLongitude] = React.useState("");
    const [cityDialog, setCityDialog] = React.useState("");

    const [visibleDialog, setVisibleDialog] = React.useState(false);
    const showDialog = () => setVisibleDialog(true);
    const hideDialog = () => setVisibleDialog(false);

    const markers = [
        {
            title: 'Cemucam',
            description: 'Parque com árvores',
            coordinate: {
                latitude: -23.60727,
                longitude: -46.8440
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

    return (
        <PaperProvider>
            <View style={styles.container} onLayout={() => mapRef.current?.animateToRegion({
                latitude: -23.6072,
                longitude: -46.844,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
            }, 1000)}>
                <Stack.Screen options={{ title: "Exercício 5" }} />
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    onRegionChangeComplete={newRegion => setRegion(newRegion)}
                >
                    {markers.map((m, index) => (
                        <Marker
                            key={index}
                            coordinate={m.coordinate}
                            title={m.title}
                            description={m.description}
                        />
                    ))}
                </MapView>
                <View style={{ ...StyleSheet.absoluteFillObject }}>
                    <Text>Latitude Atual: {region.latitude}</Text>
                    <Text>Longitude Atual: {region.longitude}</Text>
                </View>
                <View style={styles.myView}>
                    <View style={{ alignItems: 'center', width: '70%' }}>
                        <TextInput
                            style={{ ...styles.input, marginBottom: 0 }}
                            label='* Latitude'
                            value={lat.toString()}
                            onChangeText={value => setLat(value)}
                            keyboardType='numeric'
                            error={messageLatitude}
                        />
                        <HelperText type="error" padding="none" visible={messageLatitude}>
                            {messageLatitude}
                        </HelperText>
                        <TextInput
                            style={{ ...styles.input, marginTop: 0, marginBottom: 0 }}
                            label='* Longitude'
                            value={long.toString()}
                            onChangeText={value => setLong(value)}
                            keyboardType='numeric'
                            error={messageLongitude}
                        />
                        <HelperText type="error" padding="none" visible={messageLongitude}>
                            {messageLongitude}
                        </HelperText>
                    </View>
                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <Button
                            icon="map-marker-right"
                            mode="contained"
                            onPress={async () => {
                                setMessageLatitude("");
                                setMessageLongitude("");
                                let isError = false;
                                if (isNaN(lat) || !lat) {
                                    isError = true;
                                    setMessageLatitude("Latitude inválida");
                                }
                                if (isNaN(long) || !long) {
                                    isError = true;
                                    setMessageLongitude("Longitude inválida");
                                }
                                console.log({ isError, region })
                                if (isError) return;
                                try {
                                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`, {
                                        headers: { "User-Agent": "as (brunomguez)" },
                                    });
                                    console.log(response?.data?.address?.city); // Aqui você acessa os dados retornados pela API
                                    if (response?.data?.address?.city?.toLowerCase() !== "cotia") {
                                        setCityDialog(response?.data?.address?.city);
                                        showDialog();
                                        return;
                                    }
                                    setRegion(() => {
                                        console.log()
                                        const newRegion = {
                                            latitudeDelta: 0.025,
                                            longitudeDelta: 0.025,
                                            latitude: parseFloat(lat),
                                            longitude: parseFloat(long),
                                        };
                                        mapRef.current?.animateToRegion(newRegion, 1000);
                                        return newRegion;
                                    })
                                } catch (error) {
                                    console.error("Erro na requisição:", error);
                                }
                            }}>
                            Ir
                        </Button>
                        <Portal>
                            <Dialog visible={visibleDialog} onDismiss={hideDialog}>
                                <Dialog.Title>Fora dos limites de Cotia</Dialog.Title>
                                <Dialog.Content>
                                    <Text variant="bodyMedium">As coordenadas inseridas são de {cityDialog}, insira uma região em Cotia</Text>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={hideDialog}>Fechar</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                    </View>
                </View>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    myView: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        width: '80%',
        height: 50,
        marginTop: 10,
        marginBottom: 10,
    },
});
