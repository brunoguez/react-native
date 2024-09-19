import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, Avatar, TextInput, RadioButton, Button } from 'react-native-paper';


const Perfil = ({ navigation }) => {
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [sexo, setSexo] = React.useState("");
    const [exibeSenha, setExibeSenha] = React.useState(true);
    const [senha, setSenha] = React.useState("");

    return (
        <SafeAreaView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content >
                    <Avatar.Image style={[styles.mb(20), { alignSelf: 'center' }]} size={200} source={require('../src/assets/avatar/003-cat.png')} />
                    <TextInput
                        label="Nome"
                        value={nome}
                        onChangeText={text => setNome(text)}
                        style={[styles.mb(10), styles.input]}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={[styles.mb(10), styles.input]}
                    />
                    <TextInput
                        label="Senha"
                        secureTextEntry={exibeSenha}
                        value={senha}
                        right={
                            <TextInput.Icon icon="eye" onPress={() => setExibeSenha(atual => !atual)} />
                        }
                        onChangeText={text => setSenha(text)}
                        style={[styles.mb(10), styles.input]}
                    />
                    <RadioButton.Group onValueChange={value => setSexo(value)} value={sexo}>
                        <RadioButton.Item label="Maculino" value="m" />
                        <RadioButton.Item label="Feminino" value="f" />
                        <RadioButton.Item label="Outro" value="o" />
                    </RadioButton.Group>
                    <Button icon="plus" mode="contained" onPress={() => {
                        console.log('cadastrar');
                        navigation.replace('Principal');
                    }}>
                        Criar
                    </Button>
                </Card.Content>
            </Card>
        </SafeAreaView>
    )
}

export default Perfil

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b2ddee',
    },
    card: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        flexShrink: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        width: 300,
    },
    mb(value) {
        return {
            marginBottom: value
        }
    }
});