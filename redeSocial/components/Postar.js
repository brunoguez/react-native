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