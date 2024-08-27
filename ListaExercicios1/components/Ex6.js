import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { exercises } from '../db';

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

const Ex6 = ({ viewStyle }) => {
    useState(async () => {
        const ex = exercises.map(e => e.traducao);

        console.log({ forces: new Set(ex.map(e => e.equipment)), ex })
    }, []);
    return (
        <View style={viewStyle}>
            <Text>Ex6</Text>
        </View>
    )
}

export default Ex6

const styles = StyleSheet.create({})