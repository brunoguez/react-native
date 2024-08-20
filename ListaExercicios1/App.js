import { StyleSheet, Text, SafeAreaView, ScrollView, TextInput } from 'react-native';
import Ex1 from './components/Ex1';

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Ex1/>
                <Text style={styles.text}><b>Exercício 2:&nbsp;</b>Teste</Text>
                <Text style={styles.text}><b>Exercício 3:&nbsp;</b>Teste</Text>
                <Text style={styles.text}><b>Exercício 4:&nbsp;</b>Teste</Text>
                <Text style={styles.text}><b>Exercício 5:&nbsp;</b>Teste</Text>
                <Text style={styles.text}><b>Exercício 6:&nbsp;</b>Teste</Text>
                <Text style={styles.text}><b>Exercício 7:&nbsp;</b>Teste</Text>
                <Text style={styles.text}><b>Exercício 8:&nbsp;</b>Teste</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
        width: 400,
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

