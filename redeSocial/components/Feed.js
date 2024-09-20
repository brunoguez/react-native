import { Card, Text, IconButton, Modal, Portal, PaperProvider, TextInput, HelperText } from 'react-native-paper';
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, View } from 'react-native';
import { Write, Read } from '../src/file'
import { AppContext } from './AppProvider';

const Feed = () => {
    const { usuarioLogado } = React.useContext(AppContext);

    console.log(usuarioLogado)

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
            showModal(post)

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
                    <View style={styles.textContainer}>
                        <IconButton
                            icon="thumb-up"
                            iconColor="#f2be00"
                            mode="contained"
                            size={20}
                            onPress={() => handleCurtida(id)}
                            style={{ marginLeft: 0 }}
                        />
                        <Text>{curtidas} curtidas</Text>
                        <Text style={styles.postText}>📝 {comentarios.length} Comentários</Text>
                    </View>
                </Card.Content>
            </Card>
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
                            userId: 2
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
        flexDirection: 'row',  // Alinha os itens na horizontal
        justifyContent: 'space-between',  // Espaça os textos
        alignItems: 'center',  // Alinha verticalmente no centro
        width: '100%',
    },
    userName: {
        fontWeight: 'bold',
    },
    postText: {
        textAlign: 'right',
        flex: 1,  // Faz com que o texto ocupe o espaço restante
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
