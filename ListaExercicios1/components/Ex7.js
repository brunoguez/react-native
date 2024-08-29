import { StyleSheet, View, ScrollView, Image, ActivityIndicator } from 'react-native'
import { Divider, Text, Checkbox, Button, } from 'react-native-paper';
import * as React from 'react'
import estilos from '../templates'
import { trip } from '../db'
import { sort_by } from '../util'

const Ex7 = () => {
    const urlImagem = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&sort=interestingness-desc&per_page=5&page=1&extras=o_dims,url_sq,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o,description,geo,date_upload,date_taken,owner_name&per_page=1&api_key=27026c62cee701ec73c9d95f0f4ca3f1&text="
    const tipos = Array.from(new Set(trip.map(a => a.tipo))).map(a => [a, false]);

    const [loading, setLoading] = React.useState(true);

    const [preferencias, setPreferencias] = React.useState(Object.fromEntries(tipos));
    const [textButton, setTextButton] = React.useState('Planejar Viagem');
    const [locais, setLocais] = React.useState([]);
    const [mostrar, setMostrar] = React.useState(false);

    const handlePreferencia = (nome) => {
        const atual = preferencias[nome];
        setPreferencias({ ...preferencias, [nome]: !atual });
    }
    const handleFiltrar = () => {
        const selecionados = Object.entries(preferencias).filter(([nome, valor]) => valor).map(a => a[0]);
        setLocais(trip.filter(a => selecionados.length == 0 ? true : selecionados.includes(a.tipo)))
        setMostrar(atual => !atual);
        setTextButton(atual => atual == "Voltar" ? "Planejar Viagem" : "Voltar")
    }
    React.useEffect(() => {

        const promises = [];
        trip.forEach(t => {
            const p = fetch(`${urlImagem}${t.nome}-${t.estado}`)
                .then(a => a.json())
                .then(a => t.imagem = a.photos?.photo[0]?.url_n)
            promises.push(p);
        });

        const awaitFetchData = async () => {
            try {
                await Promise.allSettled(promises);
            }
            finally {
                setLoading(false);
            }
        }
        awaitFetchData();
    }, []);

    if (loading)
        return <ActivityIndicator size="large" color="#0000ff" />;

    return (
        <View style={[styles.pl, styles.pr, styles.w100, styles.h100, { backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={styles.text}><Text style={styles.titleText}>Exercício 7: </Text>Aplicativo de Planejamento de Viagens</Text>
            {!mostrar ? <View style={{ width: '100%' }}>
                <Text style={styles.title} variant="headlineSmall">Preferências</Text>
                {tipos.map(tipo => (
                    <View key={tipo[0] + "view"}>
                        <Divider />
                        <Checkbox.Item
                            status={preferencias[tipo[0]] ? "checked" : "unchecked"}
                            onPress={() => handlePreferencia(tipo[0])}
                            key={tipo[0]}
                            label={tipo[0].charAt(0).toUpperCase() + tipo[0].slice(1)}
                        />
                    </View>
                ))}
            </View> : null}
            <Button
                icon="shoe-sneaker"
                mode="contained"
                onPress={handleFiltrar}>
                <Text style={{ color: 'white' }}>{textButton}</Text>
            </Button>
            {mostrar ? <ScrollView style={[styles.mt, { maxHeight: '85vh' }]}>
                {locais
                    .sort(sort_by('tipo', false, (value) => value.toUpperCase()))
                    .map(({ nome, atracoes, atividades, estado, tipo, imagem, promise }, index) => {
                        console.log(imagem)
                        return (
                            <View key={nome + index} style={styles.card}>
                                <Image
                                    source={{ uri: imagem }}
                                    style={styles.poster}
                                />
                                <Text style={styles.titleCard}>{nome} - {estado}</Text>
                                <Text style={[styles.p, styles.mt]}>ATIVIDADES: {atividades.join(' | ')}</Text>
                                <Text style={[styles.p, styles.mt, styles.w100]}>ATRAÇÕES:</Text>
                                {atracoes.map((atracao, index) => (
                                    <View style={[styles.w100]} key={"atr" + index}>
                                        <Text style={styles.p}>- {atracao}</Text>
                                    </View>
                                ))}
                            </View>
                        )
                    })}
            </ScrollView> : null}

        </View>
    )
}

export default Ex7;

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