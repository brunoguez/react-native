import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, Avatar, TextInput, RadioButton, Button, Snackbar } from 'react-native-paper';
import { Read, Write } from '../src/file';
import { AppContext } from './AppProvider';


const Perfil = ({ navigation, tipo }) => {
    const [tipoOperacao] = React.useState(tipo);
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [sexo, setSexo] = React.useState("o");
    const [exibeSenha, setExibeSenha] = React.useState(true);
    const [senha, setSenha] = React.useState("");
    const [snackVisible, setSnackVisible] = React.useState(false);
    const { usuarioLogado, setUsuarioLogado } = React.useContext(AppContext)

    const onToggleSnackBar = () => setSnackVisible(!snackVisible);
    const onDismissSnackBar = () => setSnackVisible(false);

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
                        <RadioButton.Item label="Masculino" value="m" />
                        <RadioButton.Item label="Feminino" value="f" />
                        <RadioButton.Item label="Outro" value="o" />
                    </RadioButton.Group>
                    <Button icon="plus" mode="contained" onPress={async () => {
                        if (!nome || !email || !senha) {
                            if (!snackVisible)
                                onToggleSnackBar()
                            return;
                        }
                        const data = await Read();
                        if (tipoOperacao == "criar") {
                            data.users.push({
                                id: Math.max(...data.users.map(a => a.id)) + 1,
                                email,
                                nome,
                                sexo,
                                senha,
                                avatar: '../src/assets/avatar/003-cat.png'
                            })

                            await Write(data)
                            navigation.replace('Principal');
                            return
                        }

                        const users = data.users.map(u => {
                            if (u.id == usuarioLogado.id) {
                                return { ...u, email, senha, sexo, nome }
                            }
                            return { ...u }
                        })
                        data.users = users;
                        await Write(data)
                        
                        console.log(await Read())
                        
                        navigation.replace('Principal');
                    }}>
                        Criar
                    </Button>
                </Card.Content>
            </Card>
            <Snackbar
                visible={snackVisible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Voltar',
                    onPress: onDismissSnackBar,
                }}>
                Faltando informações
            </Snackbar>
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