import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Text, TextInput } from 'react-native-paper';

const Login = () => {
  const [user, setUser] = React.useState("");

  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#b2ddee',
      borderWidth: 1
    }}>
      <Card style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
        <Card.Content >
          <Text>Login</Text>
          <TextInput
            label="Email"
            value={user}
            onChangeText={text => setUser(text)}
          />
        </Card.Content>
      </Card>
    </SafeAreaView>
  )
}

export default Login

// const styles = StyleSheet.create({})