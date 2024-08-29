import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import estilos from '../templates';
import { Button, TextInput } from 'react-native-paper';

const data = {
    [3.5]: {
        energia: "Seu nível de energia está baixo. Considere aumentar a ingestão de água e fazer pequenas pausas durante o dia.",
        sono: "Sua qualidade de sono está abaixo do ideal. Tente estabelecer uma rotina de sono consistente e evitar cafeína à noite.",
        estresse: "Seu nível de estresse está baixo. Continue praticando as atividades que lhe trazem tranquilidade.",
    },
    [7]: {
        energia: "Seu nível de energia é moderado. Um lanche saudável ou um pouco de exercício pode ajudar a melhorar.",
        sono: "Sua qualidade de sono é razoável. Para melhorar ainda mais, tente reduzir o ruído e a luz no quarto.",
        estresse: "Seu nível de estresse é moderado. Manter um diário ou praticar gratidão pode ajudar a equilibrá-lo.",
    },
    [10]: {
        energia: "Seu nível de energia está ótimo! Continue com sua rotina atual e considere compartilhar suas dicas com outras pessoas.",
        sono: "Você tem dormido bem. Mantenha essa consistência para continuar descansando e recuperando.",
        estresse: "Seu nível de estresse está elevado. Experimente técnicas de meditação ou atividades relaxantes para aliviar o estresse.",
    },
}
const getData = (value, tipo) => {
    const sorted = Object.entries(data).toSorted((a, b) => Number(a[0]) - Number(b[0]));
    for (const obj of sorted) {
        if (Number(value) <= Number(obj[0])) {
            return obj[1][tipo];
        }
    }
    return data[10][tipo];
}

export default function Ex4() {
    const [energia, setEnergia] = React.useState("");
    const [sono, setSono] = React.useState("");
    const [estresse, setEstresse] = React.useState("");
    const [viewResultado, setViewResultado] = React.useState(false);
    const [result, setResult] = React.useState('');

    const handleCalculo = () => {
        setViewResultado(true);
        if (!energia && !sono && !estresse) {
            setResult("Faltando dados para verificar");
            return;
        }

        const textResult = [];
        if (energia) {
            textResult.push("Energia: " + getData(energia, 'energia'));
        }
        if (sono) {
            textResult.push("Sono: " + getData(sono, 'sono'));
        }
        if (estresse) {
            textResult.push("Estresse: " + getData(estresse, 'estresse'));
        }
        setResult("Resultado:\n" + textResult.join('\n'));
    }

    return (
        <View>
            <Text style={styles.text}><b>Exercício 4: </b>Aplicativo de Monitoramento de Saúde</Text>
            <TextInput
                style={styles.mb}
                label="Nível de Energia"
                value={energia}
                onChangeText={text => setEnergia(text.replace(',', '.'))}
                inputMode='decimal'
                keyboardType='numeric'
            />
            <TextInput
                style={styles.mb}
                label="Qualidade de Sono"
                value={sono}
                onChangeText={text => setSono(text.replace(',', '.'))}
                inputMode='decimal'
                keyboardType='numeric'
            />
            <TextInput
                style={styles.mb}
                label="Nível de Estresse"
                value={estresse}
                onChangeText={text => setEstresse(text.replace(',', '.'))}
                inputMode='decimal'
                keyboardType='numeric'
            />
            <Button
                icon="calculator"
                mode="contained"
                onPress={handleCalculo}>
                Monitore sua Saúde aqui
            </Button>
            {viewResultado && <Text style={styles.textResult}>{result}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    ...estilos,
    textResult: {
        fontSize: 15,
        textAlign: 'justify',
        paddingTop: 10,
        paddingBottom: 10
    },
});
