import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import Jobs from './components/Jobs';
import { useState } from 'react';
export default function App() {
	const [nome, setNome] = useState("Prof° Mário");
	let img = 'https://sujeitoprogramador.com/steve.png';
	const handleMudar = () => {
		setNome("Prof Mário d+");
	}
	return (
		<View style={styles.container}>
			<Text style={{
				color: '#FF0000', fontSize: 25, margin: 15
			}}>Programador</Text>
			<Jobs img={img} largura={100} altura={200} fulano="Steve Jobs" />
			<Text style={{ fontSize: 30 }}> {nome} </Text>
			<Button title="Entrar" onPress={handleMudar} accessibilityLabel='Entrar'  />
			<StatusBar style="auto" />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});