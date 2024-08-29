import { StyleSheet, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import Ex2 from './components/Ex2';
import Ex1 from './components/Ex1';
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