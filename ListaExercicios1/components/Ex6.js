import { StyleSheet, SafeAreaView } from 'react-native'
import { RadioButton, Divider, Text, Checkbox } from 'react-native-paper';
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

const Ex6 = ({ viewStyle }) => {
    const [level, setLevel] = React.useState('iniciante');
    const [categorias, setCategorias] = React.useState();

    const handleCategoria = (...a) => {
        setCategorias(new Map())
    }

    React.useState(() => {
        console.log(dict)
    }, []);

    return (
        <SafeAreaView style={viewStyle}>
            <Text style={styles.text}><b>Exercício 6: </b>Aplicativo de Rastreamento de Exercício</Text>
            <Divider />
            <Text style={styles.title} variant="headlineSmall">Level</Text>
            <RadioButton.Group onValueChange={value => setLevel(value)} value={level}>
                <RadioButton.Item label="Iniciante" value="iniciante" />
                <RadioButton.Item label="Intermediário" value="intermediario" />
                <RadioButton.Item label="Especialista" value="especialista" />
            </RadioButton.Group>
            {Array.from(dict.category).map(cat => (
                <Checkbox
                    status={categorias.includes(cat) ? "checked" : "unchecked"}
                    onPress={(a) => handleCategoria(a,cat)}
                    key={cat}
                />
            ))}
            <Divider />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ...estilos,
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center'
    }
})

export default Ex6;