import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, Avatar, TextInput, RadioButton, Button, Snackbar } from 'react-native-paper';
import { Read, Write } from '../src/file';
import { AppContext } from './AppProvider';
import { useRoute } from '@react-navigation/native';

const Perfil = ({ navigateTo }) => {
    const route = useRoute();
    const params = route.params;
    const isCreate = params?.action == "create"
    const { usuarioLogado, setUsuarioLogado } = React.useContext(AppContext)
    const [nome, setNome] = React.useState(isCreate ? "" : usuarioLogado?.nome ?? "");
    const [email, setEmail] = React.useState(isCreate ? "" : usuarioLogado?.email ?? "");
    const [sexo, setSexo] = React.useState(isCreate ? "o" : usuarioLogado?.sexo ?? "o");
    const [senha, setSenha] = React.useState(isCreate ? "" : usuarioLogado?.senha ?? "");
    const [exibeSenha, setExibeSenha] = React.useState(true);
    const [snackVisible, setSnackVisible] = React.useState(false);

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
                    <Button icon={`account-${isCreate ? "plus" : "edit"}`} mode="contained" onPress={async () => {

                        if (!nome || !email || !senha) {
                            if (!snackVisible)
                                onToggleSnackBar()
                            return;
                        }
                        const data = await Read();
                        if (isCreate) {
                            console.log("create")
                            const novo = {
                                id: Math.max(...data.users.map(a => a.id)) + 1,
                                email,
                                nome,
                                sexo,
                                senha,
                                avatar: '../src/assets/avatar/003-cat.png'
                            }
                            data.users.push(novo)
                            await Write(data)
                            setUsuarioLogado(novo)

                            navigateTo("feed");
                            return
                        }

                        console.log("update")

                        const users = data.users.map(u => {
                            if (u.id == usuarioLogado.id) {
                                const usuario = { ...u, email, senha, sexo, nome }
                                setUsuarioLogado(usuario)
                                return usuario;
                            }
                            return { ...u }
                        })
                        data.users = users;
                        await Write(data)

                        //console.log(JSON.stringify(await Read(), null, 4))
                        //console.log(JSON.stringify({ users, usuarioLogado }, null, 4))

                        navigateTo("feed");
                    }}>
                        {isCreate ? "Criar" : "Alterar"}
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