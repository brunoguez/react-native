import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Jobs(props) {
    return (
        <View>
            <Image
                source={{ uri: props.img }}
                style={{ width: props.largura, height: props.altura }}
            />
            <Text>{props.fulano}</Text>
        </View>
    )
}