# Rede Social!

Este é um projeto para obteção de nota na matéria de Programação para dispositivos móveis II na Fatec de Cotia.


# Sobre

Abaixo estão descritas algumas especificações de como o projeto foi desenvolvido.

## Principais bibliotecas utilizadas

 - react-native-paper
 - expo-file-system
 - react-native-safe-area-context

## App
![enter image description here](https://img001.prntscr.com/file/img001/lpm_BM1xRlu084DQP-LqVQ.png)

### Código

```javascript
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native'
import Navigation from './components/Navigation';
import Login from './components/Login';
import Perfil from './components/Perfil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { AppProvider } from './components/AppProvider';
import { Create, Existe } from './src/file';


SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const existe = await Existe()
        if (!existe)
          await Create()
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <PaperProvider>
      <AppProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="#b2ddee"
            />
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                <Stack.Screen options={{ headerShown: false }} name="Principal" component={Navigation} />
                <Stack.Screen options={{ headerShown: false }} name="Perfil" component={Perfil} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </AppProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2ddee',
  },
});
```

## Login
![enter image description here](https://i.ibb.co/qRbW7By/Screenshot-3.png)

### Código

```javascript
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
          <Button icon="plus" mode="text" onPress={() => navigation.navigate('Perfil', { action: "create" })}>
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

```

## Navegação

![enter image description here](https://img001.prntscr.com/file/img001/vqFpbXfVT1Wpttf5E3Rj0g.png)

### Código
```javascript
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Perfil from './Perfil';
import Feed from './Feed';
import Postar from './Postar';

const Navigation = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'feed', title: 'Feed', focusedIcon: 'image-text', unfocusedIcon: 'image-area' },
        { key: 'post', title: 'Postar', focusedIcon: 'plus-circle', unfocusedIcon: 'plus-circle-outline' },
        { key: 'notifications', title: 'Notificações', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
        { key: 'config', title: 'Configurações', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
    ]);

    const navigateTo = (key) => {
        console.log(key)
        const indexKey = routes.findIndex(a => a.key == key) ?? 0
        setIndex(indexKey)
    }

    const FeedRoute = () => <Feed />;
    const PostRoute = () => <Postar navigate={navigateTo} />;
    const ConfiguracaoRoute = () => <Perfil navigate={navigateTo} />;

    const renderScene = BottomNavigation.SceneMap({
        feed: FeedRoute,
        post: PostRoute,
        config: ConfiguracaoRoute,
    });

    return (
        <BottomNavigation
            style={{ width: '100%' }}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default Navigation;
```

## Feed
![enter image description here](https://img001.prntscr.com/file/img001/blBfaM-XSeqvVoU-qDHHdQ.png)

### Código
```js
import { Card, Text, IconButton, Modal, Portal, PaperProvider, TextInput, HelperText } from 'react-native-paper';
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, View } from 'react-native';
import { Write, Read } from '../src/file'
import { AppContext } from './AppProvider';

const Feed = () => {

    const { usuarioLogado } = React.useContext(AppContext);
    const [posts, setPosts] = React.useState(null);
    const [users, setUsers] = React.useState(null);
    const [postComentarios, setPostComentarios] = React.useState(null)

    const [visible, setVisible] = React.useState(false);

    const showModal = (post) => {
        setPostComentarios(post)
        setVisible(true);
    }
    const hideModal = () => setVisible(false);

    React.useEffect(() => {
        const checkModifiedJson = async () => {

            try {
                const jsonData = await Read();

                if (!users) {
                    setUsers(jsonData.users);
                }
                if (!posts) {
                    setPosts(jsonData.posts);
                }
            } catch (error) {
                console.error('Erro ao ler o arquivo JSON modificado:', error);
            }
        };

        checkModifiedJson();
    }, [posts, users]);

    const CardPost = ({ post }) => {

        const handleCurtida = async (idPost) => {
            try {
                const jsonData = await Read();

                const updatedPosts = jsonData.posts.map(post => {
                    if (post.id === idPost) {
                        return { ...post, curtidas: post.curtidas + 1 };
                    }
                    return post;
                });
                const updatedData = { ...jsonData, posts: updatedPosts };
                setPosts(updatedPosts);
                Write(updatedData);
            } catch (error) {
                console.error('Erro ao ler o arquivo JSON modificado:', error);
            }
        }

        const { id, texto, imagemURL, userId, curtidas, comentarios } = post;
        const user = users.find(u => u.id == userId)
        return (
            <Card style={styles.card}>
                <Card.Content>
                    <Image
                        source={{ uri: imagemURL }}
                        style={styles.image}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.userName}>{user.nome}</Text>
                        <Text style={styles.postText}>{texto}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={[styles.textContainer, { width: '50%' }]}>
                            <IconButton
                                icon="thumb-up"
                                iconColor="#f2be00"
                                mode="contained"
                                size={20}
                                onPress={() => handleCurtida(id)}
                                style={{ marginLeft: 0 }}
                            />
                            <Text>{curtidas} curtidas</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            width: '50%'
                        }}>
                            <IconButton
                                icon="comment-plus"
                                iconColor="#f20eff"
                                mode="contained"
                                size={20}
                                onPress={() => showModal(post)}
                                style={{ marginLeft: 0 }}
                            />
                            <Text>{comentarios.length} Comentários</Text>

                        </View>
                    </View>
                </Card.Content>
            </Card >
        );
    };

    const ModalContent = () => {

        const [comentario, setComentario] = React.useState("");
        const [helperVisible, setHelperVisible] = React.useState(false);

        const handleComment = async () => {
            if (!comentario) {
                setHelperVisible(value => !value);
                return;
            }
            try {
                const jsonData = await Read();

                const updatedPosts = jsonData.posts.map(p => {
                    if (p.id === postComentarios.id) {
                        p.comentarios.push({
                            id: p.comentarios.length + 1,
                            texto: comentario,
                            userId: usuarioLogado.id
                        });
                    }
                    return p;
                });
                const updatedData = { ...jsonData, posts: updatedPosts };
                setPosts(updatedPosts);
                Write(updatedData);
                hideModal();
            } catch (error) {
                console.error('Erro ao ler o arquivo JSON modificado:', error);
            }
        };

        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Comentários</Text>
                {!postComentarios && <Text>Sem comentários ainda. Insira o primeiro! 😍</Text>}

                <ScrollView style={{ flex: 1 }}>
                    {postComentarios?.comentarios
                        .map(c => {
                            const user = users.find(u => u.id == c.userId);
                            return (
                                <View key={c.id} style={{ marginBottom: 10 }}>
                                    <Card>
                                        <Card.Content>
                                            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{user.nome}</Text>
                                            <Text>{c.texto}</Text>
                                        </Card.Content>
                                    </Card>
                                </View>
                            );
                        })}
                </ScrollView>

                <TextInput
                    label="Comentário"
                    mode="outlined"
                    value={comentario}
                    onChangeText={text => setComentario(text)}
                    multiline={true}
                    right={<TextInput.Icon icon="comment-plus" onPress={handleComment} />}
                />
                <HelperText type="error" visible={helperVisible}>
                    Insira um comentário!
                </HelperText>
                <Text style={{ alignSelf: 'flex-end' }} onPress={hideModal}>Clique aqui ou fora para sair</Text>
            </View>
        );
    };


    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                        <ModalContent />
                    </Modal>
                </Portal>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {posts && posts.map(post => <CardPost key={post.id} post={post} />)}
                </ScrollView>
            </SafeAreaView>
        </PaperProvider>
    );
};

export default Feed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b2ddee',
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    card: {
        width: '90%',
        marginVertical: 10,
        padding: 15,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginBottom: 10,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    userName: {
        fontWeight: 'bold',
    },
    postText: {
        textAlign: 'right',
        flex: 1,
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        width: '90%',
        alignSelf: 'center',
        height: '90%'
    },
    title: {
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
```

## Postar
![enter image description here](https://img001.prntscr.com/file/img001/qZN3SsXJQ2WA8XzQiNxJ8A.png)

```js
import {
    Card,
    Portal,
    PaperProvider,
    Snackbar,
    Button,
    Text,
    IconButton,
    Modal,
    TextInput,
    HelperText
} from 'react-native-paper';
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, View } from 'react-native';
import { Write, Read } from '../src/file'
import { AppContext } from './AppProvider';

const IMAGEM_PADRAO = "https://c.tenor.com/LMz_TrIOxV8AAAAd/tenor.gif"

const Postar = ({ navigate }) => {
    const [post, setPost] = React.useState({})
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const { usuarioLogado } = React.useContext(AppContext);
    const [snackVisible, setSnackVisible] = React.useState(false);
    const [snackbarText, setSnackbarText] = React.useState("");

    const onToggleSnackBar = () => setSnackVisible(!snackVisible);

    const onDismissSnackBar = () => setSnackVisible(false);

    return (
        <PaperProvider>
            <SafeAreaView style={[styles.container, styles.bc]}>
                <Card style={styles.card}>
                    <Card.Content style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {previewVisible &&
                            <Image
                                style={styles.image}
                                source={{ uri: post?.imagemURL || IMAGEM_PADRAO }}
                                onError={a => console.log(a)}
                            />
                        }
                        <TextInput
                            label="URL imagem"
                            value={post.imagemURL}
                            onChangeText={imagemURL => {
                                setPost(atual => ({ ...atual, imagemURL }))
                                setPreviewVisible(true)
                            }}
                            style={[styles.mb(10), styles.input]}
                        />
                        <TextInput
                            label="Texto"
                            value={post.texto}
                            multiline
                            onChangeText={texto => setPost(atual => ({ ...atual, texto }))}
                            style={[styles.mb(20), styles.input]}
                        />
                        <Button icon="image-plus" mode="contained" onPress={async () => {
                            if (!post || !post?.texto || !post?.imagemURL || post?.imagemURL == IMAGEM_PADRAO) {
                                setSnackbarText("Faltando informações para postar");
                                onToggleSnackBar();
                                return;
                            }
                            const jsonData = await Read();
                            console.log(JSON.stringify({ post, jsonData }, null, 2))
                            jsonData.posts.push({
                                ...post,
                                id: jsonData.posts.length + 1,
                                userId: usuarioLogado.id,
                                curtidas: 0,
                                comentarios: [],
                            })
                            await Write(jsonData);
                            navigate("feed");
                        }}>
                            Postar
                        </Button>
                    </Card.Content>
                </Card>
                <Snackbar
                    visible={snackVisible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Undo',
                        onPress: onDismissSnackBar,
                    }}>
                    {snackbarText}
                </Snackbar>
            </SafeAreaView>
        </PaperProvider>
    );
}

export default Postar

const styles = StyleSheet.create({
    bc: {
        backgroundColor: '#b2ddee',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '90%',
        marginVertical: 10,
        flexShrink: 1,
        padding: 15
    },
    mb(value) {
        return {
            marginBottom: value
        }
    },
    input: {
        width: 300
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginBottom: 10,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    userName: {
        fontWeight: 'bold',
    },
    postText: {
        textAlign: 'right',
        flex: 1,
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        width: '90%',
        alignSelf: 'center',
        height: '90%'
    },
    title: {
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
```

## Postar / Novo Usuário
![enter image description here](https://img001.prntscr.com/file/img001/E6c1WKAFTPuH0qVzDFPIrw.png)

### Código
```js
import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, Avatar, TextInput, RadioButton, Button, Snackbar } from 'react-native-paper';
import { Read, Write } from '../src/file';
import { AppContext } from './AppProvider';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const Perfil = ({ navigate }) => {
    const navigation = useNavigation();
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
                            if (!navigate) {
                                return navigation.navigate("Principal");
                            }
                            navigate('feed');
                            return;
                        }

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

                        if (!navigate) {
                            return navigation.navigate("Principal");
                        }
                        navigate('feed');
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
```

## AppProvider
### Código
```js
import * as React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = React.useState({});

    return (
        <AppContext.Provider value={{ usuarioLogado, setUsuarioLogado }}>
            {children}
        </AppContext.Provider>
    );
};

```