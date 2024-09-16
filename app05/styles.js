import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    cronometro: {
        width: 200,
        height: 200,
    },
    timer: {
        marginTop: -160,
        color: '#FFF',
        fontSize: 65,
        fontWeight: 'bold'
    },
    btnArea: {
        flexDirection: 'row',
        marginTop: 70,
        height: 40
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 40,
        margin: 17,
        borderRadius: 9
    },
    btnTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    },
    areaUltima: {
        marginTop: 40,
    },
    textoCorrida: {
        fontSize: 25,
        fontStyle: 'italic',
        color: '#FFF'
    }
});
export default styles;