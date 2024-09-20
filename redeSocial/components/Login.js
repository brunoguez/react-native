import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { Read } from '../src/file';
import { AppContext } from './AppProvider';


const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [exibeSenha, setExibeSenha] = React.useState(true);
  const [senha, setSenha] = React.useState("");
  const [snackVisible, setSnackVisible] = React.useState(false);

  const onToggleSnackBar = () => setSnackVisible(!snackVisible);
  const onDismissSnackBar = () => setSnackVisible(false);
  const { setUsuarioLogado } = React.useContext(AppContext)

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Login</Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={[styles.m(10), styles.input]}
          />
          <TextInput
            label="Senha"
            secureTextEntry={exibeSenha}
            value={senha}
            right={
              <TextInput.Icon icon="eye" onPress={() => setExibeSenha(atual => !atual)} />
            }
            onChangeText={text => setSenha(text)}
            style={[styles.m(20), styles.input]}
          />
          <Button style={styles.m(10)} icon="login" mode="contained" onPress={async () => {
            const data = await Read();
            const userLogar = data.users.find(user => user.email == email && user.senha == senha)
            if (userLogar) {
              setUsuarioLogado(userLogar)
              navigation.navigate('Principal');
              return
            }
            if (!snackVisible)
              onToggleSnackBar()
          }}>
            Entrar
          </Button>
          <Button icon="plus" mode="text" onPress={() => navigation.navigate('Perfil')}>
            Criar conta
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
        Usuário inválido
      </Snackbar>
    </SafeAreaView>
  );
};

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
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: 300,
  },
  m(value) {
    return {
      marginBottom: value
    }
  }
});

export default Login;
