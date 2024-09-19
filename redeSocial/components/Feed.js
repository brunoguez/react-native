import { Card, Text } from 'react-native-paper'
import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import * as FileSystem from 'expo-file-system';



const Feed = () => {

    const [posts, setPosts] = React.useState([])
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        // const copyJsonToEditableLocation = async () => {
        //     const jsonFromAssets = FileSystem.documentDirectory + 'db.json';
        //     try {
        //       // Verifica se o arquivo já foi copiado antes
        //       const fileExists = await FileSystem.getInfoAsync(jsonFromAssets);
        //       if (!fileExists.exists) {
        //         // Copia o arquivo da pasta assets
        //         await FileSystem.writeAsStringAsync(jsonFromAssets, JSON.stringify(db));
        //         console.log('Arquivo JSON copiado para um local editável!');
        //       }
        //     } catch (error) {
        //       console.error('Erro ao copiar o arquivo JSON:', error);
        //     }
        //   };

        //   copyJsonToEditableLocation()

        const checkModifiedJson = async () => {
            const path = FileSystem.documentDirectory + 'db.json';

            try {
                const fileContents = await FileSystem.readAsStringAsync(path);
                const jsonData = JSON.parse(fileContents);
                setPosts(jsonData.posts);
                setUsers(jsonData.users);
                console.log(2)

                //await FileSystem.writeAsStringAsync(path, JSON.stringify(jsonData));
                //console.log(JSON.stringify(jsonData, null, 2));
            } catch (error) {
                console.error('Erro ao ler o arquivo JSON modificado:', error);
            }
        };

        checkModifiedJson()
    }, [])

    const CardPost = (post) => {
        const { id, userId, texto, imagemURL, curtidas, comentarios } = post
        //const user = users.find(user => user.id == userId);
        console.log(post) 

        return (
            <Card style={styles.card}>
                <Card.Content>

                </Card.Content>
            </Card>
        )

        // return (
        //     <Card key={id} style={styles.card}>
        //         <Card.Content>
        //             <Text>{texto}</Text>
        //             <Text>{user.nome}</Text>
        //             <Text>👍 {curtidas}</Text>
        //             {comentarios.map(comentario => {
        //                 const userComentario = users.find(user => user.id == comentario.userId);
        //                 console.log(userComentario)
        //                     (
        //                         <View key={comentario.id}>
        //                             <Text>{comentario.texto}</Text>
        //                             {/* <Text>{userComentario.nome}</Text>  */}
        //                         </View>
        //                     )
        //             })}
        //         </Card.Content>
        //     </Card>
        // )
    }

    return (
        <SafeAreaView style={styles.container}>
            {posts.map(post =>
                <CardPost
                    key={post.id}
                    post={post}
                />)}
        </SafeAreaView>
    )
}

export default Feed

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