import { StyleSheet, Text, SafeAreaView, ScrollView, TextInput } from 'react-native';
import Ex2 from './components/Ex2';
import Ex1 from './components/Ex1';
import Ex3 from './components/Ex3';
import Ex4 from './components/Ex4';
import Ex5 from './components/Ex5';
import Ex6 from './components/Ex6';

export default function App() {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Ex1 viewStyle={{ display: 'none' }} />
                <Ex2 viewStyle={{ display: 'none' }} />
                <Ex3 viewStyle={{ display: 'none' }} />
                <Ex4 viewStyle={{ display: 'none' }} />
                <Ex5 viewStyle={{ display: 'none' }} />
                <Ex6 viewStyle={{ display: 'none' }} />
                <Text style={styles.text}><b>Exercício 7:&nbsp;</b>Teste</Text>
                <Text style={styles.text}><b>Exercício 8:&nbsp;</b>Teste</Text>
                <Text style={styles.text}><b>Exercício 9:&nbsp;</b>Teste</Text>
            </ScrollView>
        </SafeAreaView>
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