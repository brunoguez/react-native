import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Botao from './Botao';
import estilos from '../templates';

export default function Ex3({ viewStyle }) {
    const [despesas, setDespesas] = useState(0);
    const [receitas, setReceitas] = useState(0);
    const [viewResultado, setViewResultado] = useState(false);
    const [result, setResult] = React.useState('');

    const handleCalculo = () => {
        let res = [];
        if (!despesas) {
            res.push("despesas");
        }
        if (!receitas) {
            res.push("receitas");
        }
        setViewResultado(true);
        if (res.length > 0) {
            setResult("Erro: Faltando " + res.join(" / "));
            return;
        }
        const diff = receitas - despesas;
        const lucro = (diff / receitas) * 100;
        const formatLucro = lucro.toFixed(2);
        const formatDiff = diff.toFixed(2);
        const formarVirgula = (valor) => valor.replace('.', ',');
        setResult(lucro);

        if (lucro > 15) {
            setResult(`Diferença: R$${formarVirgula(formatDiff)} | Lucro: ${formarVirgula(formatLucro)}%\nInvista seu dinheiro`);
            return;
        }

        if (lucro <= 15 && lucro >= 10) {
            setResult(`Diferença: R$${formarVirgula(formatDiff)} | Lucro: ${formarVirgula(formatLucro)}%\nInvista no próximo mês`);
            return;
        }

        setResult(`Diferença: R$${formarVirgula(formatDiff)} | ${lucro < 0 ? "Deficit" : "Lucro"}: ${formarVirgula(formatLucro)}%\nVamos continuar tentando`);
    }

    return (
        <View style={viewStyle}>
            <Text style={styles.text} > <b>Exercício 3:&nbsp;</b>Aplicativo de Controle de Despesas</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setDespesas(text.replace(",", "."))}
                placeholder="Insira o total de Despesas"
                inputMode='decimal'
                keyboardType='numeric'
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setReceitas(text.replace(",", "."))}
                placeholder="Insira o total de Receitas"
                inputMode='decimal'
                keyboardType='numeric'
            />
            <Botao text={"Calcular suas economias!"} onPress={handleCalculo} />
            {viewResultado && <Text style={styles.text}>{result}</Text>}
            <Botao text={"Voltar"} />
        </View>
    )
}

const styles = StyleSheet.create(estilos);