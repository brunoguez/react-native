import { StyleSheet, SafeAreaView, View, Image, ScrollView } from 'react-native'
import { RadioButton, Divider, Text, Checkbox, Button, FAB, } from 'react-native-paper';
import * as React from 'react'
import { exercises } from '../db';
import estilos from '../templates';

// const axios = require('axios').default;
// const { v4: uuidv4 } = require('uuid');

// const key = "ff680ed96ef94e74ba3137bcdb7bb405";
// const endpoint = "https://api.cognitive.microsofttranslator.com";
// const location = "eastus";
// const options = {
//     baseURL: endpoint,
//     url: '/translate',
//     method: 'post',
//     headers: {
//         'Ocp-Apim-Subscription-Key': key,
//         'Ocp-Apim-Subscription-Region': location,
//         'Content-type': 'application/json',
//         'X-ClientTraceId': uuidv4().toString()
//     },
//     params: {
//         'api-version': '3.0',
//         'from': 'en',
//         'to': 'pt-BR'
//     },
//     responseType: 'json'
// }
// const traduzir = async (valor) => new Promise((resolve) => {
//     try {
//         if(!valor){
//             resolve(null);
//             return;
//         }

//         axios({
//             ...options,
//             data: [{ 'text': valor }],
//         }).then((response) => {
//             resolve(response.data[0].translations[0].text);
//         }).catch(error => {
//             console.log({ error, valor });
//             console.trace();
//         })
//     } catch (error) {
//         console.error(error)
//     }
// });

// for (const exercise of exercises) {
//     const primaryMuscles = [], secondaryMuscles = [], instructions = [];
//     for (p of exercise.primaryMuscles) {
//         primaryMuscles.push(await traduzir(p));
//     }
//     for (s of exercise.secondaryMuscles) {
//         secondaryMuscles.push(await traduzir(s));
//     }
//     for (ins of exercise.instructions) {
//         instructions.push(await traduzir(ins));
//     }

//     const taskName = traduzir(exercise.name),
//         taskForce = traduzir(exercise.force),
//         taskLevel = traduzir(exercise.level),
//         taskMechanic = traduzir(exercise.mechanic),
//         taskEquipment = traduzir(exercise.equipment),
//         taskCategory = traduzir(exercise.category)

//     exercise.traducao = {
//         name: await taskName,
//         force: await taskForce,
//         level: await taskLevel,
//         mechanic: await taskMechanic,
//         equipment: await taskEquipment,
//         primaryMuscles,
//         secondaryMuscles,
//         instructions,
//         category: await taskCategory,
//         images: exercise.images,
//         id: exercise.id
//     }
//     console.log(exercise.id)
// }
const ex = exercises.map(e => e.traducao);
const mapear = (valor) => new Set(ex.filter(e => e[valor]).map(e => e[valor]));
const dict = {
    force: mapear('force'),
    category: mapear('category'),
    equipment: mapear('equipment'),
    level: mapear('level'),
    mechanic: mapear('mechanic'),
}

const Ex6 = () => {

    const [level, setLevel] = React.useState('iniciante');
    const [categorias, setCategorias] = React.useState(
        Object.fromEntries(Array.from(dict.category)
            .map(a => [a, false]))
    );
    const [equipamentos, setEquipamentos] = React.useState(
        Object.fromEntries(Array.from(dict.equipment)
            .map(a => [a, false]))
    );
    const [show, setShow] = React.useState(false);
    const [treinos, setTreinos] = React.useState([]);
    const [textButton, setTextButton] = React.useState('Mostrar Treinos')

    const handleCategoria = (cat) => {
        const atual = categorias[cat];
        setCategorias(({ ...categorias, [cat]: !atual }))
    }
    const handleEquipameto = (eq) => {
        const atual = equipamentos[eq];
        setEquipamentos(({ ...equipamentos, [eq]: !atual }))
    }
    const handleFiltrar = () => {
        const formatCategorias = Object.entries(categorias)
            .filter(a => a[1])
            .map(a => a[0]);
        const formatEquipamentos = Object.entries(equipamentos)
            .filter(a => a[1])
            .map(a => a[0]);

        const filteredExercises = ex.filter(a => a.level == level &&
            (formatCategorias.length > 0 ? formatCategorias.includes(a.category) : true) &&
            (formatEquipamentos.length > 0 ? formatEquipamentos.includes(a.equipment) : true))

        setTreinos(filteredExercises);

        setShow((atual) => !atual)
        setTextButton((atual) => atual == 'Mostrar Treinos' ? 'Voltar' : 'Mostrar Treinos')
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 15 }}>
            <Text style={styles.text}>Exercício 6: Aplicativo de Rastreamento de Exercício</Text>
            <Button
                icon="shoe-sneaker"
                mode="contained"
                onPress={handleFiltrar}>
                <Text style={{ color: 'white' }}>{textButton}</Text>
            </Button>
            {!show && <View>
                <ScrollView style={{ height: '80%' }}>
                    <Divider />
                    <Text style={styles.title} variant="headlineSmall">Level</Text>
                    <RadioButton.Group onValueChange={value => setLevel(value)} value={level}>
                        <RadioButton.Item label="Iniciante" value="iniciante" />
                        <RadioButton.Item label="Intermediário" value="intermediário" />
                        <RadioButton.Item label="Especialista" value="especialista" />
                    </RadioButton.Group>
                    <Divider />
                    <Text style={styles.title} variant="headlineSmall">Categoria</Text>
                    {Array.from(dict.category).map(cat => (
                        <Checkbox.Item
                            status={categorias[cat] ? "checked" : "unchecked"}
                            onPress={() => handleCategoria(cat)}
                            key={cat}
                            label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                        />
                    ))}
                    <Divider />
                    <Text style={styles.title} variant="headlineSmall">Equipamento</Text>
                    {Array.from(dict.equipment).map(eq => (
                        <Checkbox.Item
                            status={equipamentos[eq] ? "checked" : "unchecked"}
                            onPress={() => handleEquipameto(eq)}
                            key={eq}
                            label={eq.charAt(0).toUpperCase() + eq.slice(1)}
                        />
                    ))}
                </ScrollView>
            </View>}
            {show && <View>
                <ScrollView style={{ height: '80%' }}>
                    {treinos.map((treino, index) => (
                        <View key={`${treino.id}_view${index}`} style={styles.card}>
                            <Image
                                source={{ uri: `https://github.com/yuhonas/free-exercise-db/blob/main/exercises/${treino.images[0]}?raw=true` }}
                                style={styles.poster}
                                key={`${treino.id}_img${index}`}
                            />
                            <Text style={styles.title} key={`${treino.id}_txt${index}`}>{treino.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    ...estilos,
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    poster: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    titleCard: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default Ex6;