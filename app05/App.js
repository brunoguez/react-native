import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
export default function App() {
  const [numero, setNumero] = useState(0);
  const [botao, setBotao] = useState('VAI');
  const [ultimo, setUltimo] = useState(null);
  const timerRef = useRef(null);
  const vai = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setBotao('VAI');
    } else {
      timerRef.current = setInterval(() => {
        setNumero((prevNumero) => prevNumero + 0.1);
      }, 100);
      setBotao('PARAR');
    }
  };
  const limpar = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setUltimo(numero);
    setNumero(0);
    setBotao('VAI');
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('./src/cronometro.png')}
        style={styles.cronometro}
      />
      <Text style={styles.timer}>{numero.toFixed(1)}</Text>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={vai}>
          <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}>LIMPAR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrida}>
          {ultimo > 0 ? 'Ultimo tempo: ' + ultimo.toFixed(2) + 's' : ''}
        </Text>
      </View>
    </View>
  );
};
