import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { Styles } from '../src/styles'


export default function Home() {
  const router = useRouter();
  const Botao = ({ exercicio }) => <Button
    style={Styles.m("b", 10)}
    icon="clock-fast"
    mode="contained"
    onPress={() => router.push({ pathname: 'ex' + exercicio })}>
    {"Exercício " + exercicio}
  </Button>
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'My home',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: props => <Image style={styles.image} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />,
        }}
      />
      <Botao exercicio={1} />
      <Botao exercicio={2} />
      <Botao exercicio={3} />
      <Botao exercicio={4} />
      <Botao exercicio={5} />
      <Botao exercicio={6} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});

// export default function Index() {
//   const navigation = useNavigation();

//   useEffect(() => {
//     navigation.setOptions({ headerShown: false });
//   }, [navigation]);

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );


//   // const markers = [
//   //   {
//   //     title: 'Marcador 1', description: 'Descrição do Marcador 1',
//   //     coordinate: { latitude: -23.5505, longitude: -46.6333 }
//   //   },
//   //   {
//   //     title: 'Marcador 2', description: 'Descrição do Marcador 2',
//   //     coordinate: { latitude: -23.5605, longitude: -46.6433 }
//   //   },
//   //   {
//   //     title: 'Marcador 3', description: 'Descrição do Marcador 3',
//   //     coordinate: { latitude: -23.5405, longitude: -46.6233 }
//   //   },
//   // ];
//   // return (
//   //   <View style={styles.container}>
//   //     <MapView style={styles.map} initialRegion={{
//   //       latitude: -23.5505, longitude: -46.6333, latitudeDelta: 0.0922,
//   //       longitudeDelta: 0.0421,
//   //     }}
//   //     >
//   //       {markers.map((marker, index) => (
//   //         <Marker key={index} coordinate={marker.coordinate}
//   //           title={marker.title} description={marker.description}
//   //         />
//   //       ))}
//   //     </MapView>
//   //   </View>
//   // );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });