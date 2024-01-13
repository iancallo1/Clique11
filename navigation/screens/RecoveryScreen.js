import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {LinearGradient} from "expo-linear-gradient";
import color from "../../assets/colors";
import { TextInput } from "react-native-paper";

function RecoveryScreen(props) {
    console.log(props);

    return (
        <LinearGradient
        style={{flex: 1}} colors={[color.first, color.third]}>

        <View style={styles.container}>
            <Text style={styles.head}>Recover your account</Text>
            <Text style={styles.text}>a password reset will sent to your email</Text>

            <TextInput
            style={styles.input}
            placeholder=''
            label='Email'
            />

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.btntext}>
                    Recover Account
                </Text>
            </TouchableOpacity>
        </View>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        padding: 20,
        marginTop: 20,
    },
    head: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 45,
        color: 'white',
        textAlign: 'center',
        marginTop: 280,
        marginBottom: 20,
    },
    text: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#164863',
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 100,
        marginRight: 100,
    },
    btntext: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: '#DDF2FD',
        textAlign: 'center'
    },
    input: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderWidth: 3, 
        borderColor: '#9BBEC8', 
        borderRadius: 6,
        margin: 8,
        fontFamily: 'sans-serif',
        fontSize: 20, 
        backgroundColor: 'white',
    }
});

export default RecoveryScreen;