import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        height: 50,
        marginBottom: 10,
    },
    m(type, value) {
        const margin = {
            b: "marginBottom",
            t: "marginTop",
            l: "marginLeft",
            r: "marginBottom",
        }[type];
        return { [margin ?? "margin"]: value };
    },
})