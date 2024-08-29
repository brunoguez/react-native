import { StyleSheet, View } from 'react-native'
import { Text, Button, TextInput, RadioButton } from 'react-native-paper';
import * as React from 'react'
import estilos from '../templates'

const Ex8 = () => {

    const [valor, setValor] = React.useState("");
    const [quantidade, setQuantidade] = React.useState("");
    const [resultado, setResultado] = React.useState("");
    const [desconto, setDesconto] = React.useState('25');

    const onPress = () => {
        const nValor = Number(valor);
        const nQuantidade = Number(quantidade);
        const falhas = [];
        if (!valor || Number.isNaN(nValor))
            falhas.push("Valor do Produto")
        if (!quantidade || Number.isNaN(nQuantidade))
            falhas.push("Quantidade")
        if (falhas.length > 0) {
            setResultado("ERRO: Faltando " + falhas.join(' / '))
            return;
        }
        const nDesconto = Number(desconto);
        const sub = nQuantidade * nValor;
        const total = sub - (sub * (nDesconto / 100))
        setResultado("TOTAL: R$ " + total.toFixed(2))
    }

    return (
        <View style={[styles.container, styles.pl, styles.pr, { width: '90%' }]}>
            <TextInput
                label='Valor do Produto'
                inputMode='decimal'
                placeholder='R$'
                value={valor}
                onChangeText={text => setValor(text)}
            />
            <TextInput
                style={styles.mt}
                label='Quantidade'
                inputMode='decimal'
                value={quantidade}
                onChangeText={text => setQuantidade(text)}
            />
            <RadioButton.Group onValueChange={value => setDesconto(value)} value={desconto}>
                <RadioButton.Item label="A VISTA" value="25" />
                <RadioButton.Item label="Cheque (30 dias)" value="20" />
                <RadioButton.Item label="Cartão Crédito (2x)" value="10" />
                <RadioButton.Item label="Cartão Crédito (3x)" value="5" />
                <RadioButton.Item label="Negociado com o Vendedor" value="0" />
            </RadioButton.Group>
            <Button style={styles.mt} icon="cash" mode="contained" onPress={onPress}>
                Calcular valor
            </Button>
            <Text style={[styles.mt, styles.title]}>{resultado}</Text>
        </View>
    );
}

export default Ex8

const styles = StyleSheet.create({
    ...estilos,
    h100: {
        height: '100%'
    },
    w100: {
        width: '100%'
    },
    pr: {
        paddingRight: '1em'
    },
    pl: {
        paddingLeft: '1em'
    },
    p: {
        textAlign: 'justify'
    },
    titleText: {
        fontWeight: 'bold',
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