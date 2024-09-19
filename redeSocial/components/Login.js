import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Card, Text, TextInput, Button } from 'react-native-paper';

const Login = () => {
  const [user, setUser] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Login</Text>
          <TextInput
            label="Email"
            value={user}
            onChangeText={text => setUser(text)}
            style={[styles.m(10), styles.input]}
          />
          <TextInput
            label="Senha"
            secureTextEntry
            value={user}
            right={
              <TextInput.Icon icon="eye" onPress={(a) => console.log(console.log(JSON.stringify(a, null, 2)))}/>
            }
            onChangeText={text => setUser(text)}
            style={[styles.m(20), styles.input]}
          />
          <Button style={styles.m(10)} icon="login" mode="contained" onPress={() => console.log('Pressed')}>
            Entrar
          </Button>
          <Button icon="plus" mode="text" onPress={() => console.log('Pressed')}>
            Criar conta
          </Button>
        </Card.Content>
      </Card>
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
