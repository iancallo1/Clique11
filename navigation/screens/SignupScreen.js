import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid,  } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import color from "../../assets/colors.js";
import { TextInput } from "react-native-paper";
import fetchServices from '../../services/fetchServices.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase.js';
import { useState } from "react";


function SignupScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const handleSubmit = async ()=>{
        if(email && password){
            try{
                await createUserWithEmailAndPassword(auth, email, password);
                navigation.navigate('Login');
            }catch(err){
                console.log('got error', err.message);
            }
        }
    }
    return (
        <LinearGradient
        style={{flex: 1}} colors={[color.first, color.second]}>
            <View style={styles.container}>
                <Text style={styles.head}>Sign Up</Text>
                <Text style={styles.text}>hello there stranger!</Text>
            
            <TextInput
            style={styles.input}
            placeholder=''
            label='Name'
            />
            <TextInput
            style={styles.input}
            placeholder=''
            label='Email'
            value={email}
            onChangeText={value=> setEmail(value)}
        
            />
            <TextInput
            style={styles.input}
            placeholder=''
            label='Enter Password'
            value={password}
            onChangeText={value=> setPassword(value)}
 
            
            />
            <TextInput
            style={styles.input}
            placeholder=''
            label='Retype Password'
            value={repassword}
            onChangeText={value=> setRepassword(value)}
 
            
            />

            <TouchableOpacity style={styles.button1} onPress={handleSubmit}>
                <Text style={styles.btntext1}>
                    Sign Up
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Landing')}>
                <Text style={styles.btntext2}>
                    Go Back
                </Text>
            </TouchableOpacity>
            
            </View>
        </LinearGradient>
    )
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
        fontSize: 50,
        color: 'white',
        textAlign: 'center',
        marginTop: 40,
        margin: 20,
    },
    text: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        margin: 10,
    },
    button1: {
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
    button2: {
        backgroundColor: '#9BBEC8',
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 100,
        marginRight: 100,
    },
    btntext1: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    btntext2: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#164863',
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

export default SignupScreen;