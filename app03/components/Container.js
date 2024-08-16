import React from 'react';
import { View } from 'react-native';
export default function Container(props) {
    return (
        <View style={{ flex: props.valor, backgroundColor: props.cor }} />
    )
}