import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid,  } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import color from "../../assets/colors.js";
import { TextInput } from "react-native-paper";
import fetchServices from '../../services/fetchServices.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase.js';
import { useState } from "react";
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

function SignupScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [showPass, setShowPass] = React.useState(false);
    const [errors, setErrors] = React.useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const handleSubmit = async () => {
        if (email && password) {
          try {
            // Create a user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
      
            // Save additional user information to Firestore
            const db = getFirestore(); 
            const usersCollection = collection(db, 'users');
      
            // Add a new document with a generated ID
            await addDoc(usersCollection, {
              uid: user.uid,
              name: name, // Add user's name here
              email: email,
              // Add any other user information you want to store
            });

            setName('');
            setEmail('');
            setPassword('');
            setRepassword('');
      
            navigation.navigate('Login');
          } catch (err) {
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
            value={name}
            onChangeText={(value) => setName(value)}
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
          label='Password'
          secureTextEntry={!showPassword }
          right={
            <TextInput.Icon
              icon={!showPassword  ? "eye" : "eye-off"}
              onPress={() => setShowPassword(!showPassword )}
            />
          }
          value={password}
          onChangeText={setPassword}
          error={errors?.password}
        />
             <TextInput
          style={styles.input}
          placeholder=''
          label='Repassword'
          secureTextEntry={!showRePassword}
          right={
            <TextInput.Icon
              icon={!showRePassword ? "eye" : "eye-off"}
              onPress={() => setShowRePassword(!showRePassword)}
            />
          }
          value={repassword}
          onChangeText={setRepassword}
          error={errors?.repassword}
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