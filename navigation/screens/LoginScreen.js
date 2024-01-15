import { Platform } from 'react-native';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ToastAndroid,KeyboardAvoidingView } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import color from "../../assets/colors";
import { TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase.js';




function LoginScreen({ navigation }) {
  const [showPass, setShowPass] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState("");

  const showToast = (message = 'Something went wrong') => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleLogin = async () => {
    if (email && password) {
            
           
          
      try {
        await signInWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
        navigation.navigate('MainContainer');
      } catch (err) {
        console.log('got error', err.message);
        showToast('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <LinearGradient
      style={{ flex: 1 }} colors={[color.white, color.second]}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center' }}
      >
      <View style={styles.container}>
        <Text style={styles.head}>Log In</Text>
        <Text style={styles.text}>welcome back!</Text>

        <TextInput
          style={styles.input}
          placeholder=''
          label='Email'
          value={email}
          onChangeText={setEmail}
          error={errors?.email}
        />
        <TextInput
          style={styles.input}
          placeholder=''
          label='Password'
          secureTextEntry={!showPass}
          right={
            <TextInput.Icon
              icon={!showPass ? "eye" : "eye-off"}
              onPress={() => setShowPass(!showPass)}
            />
          }
          value={password}
          onChangeText={setPassword}
          error={errors?.password}
        />

       

        <TouchableOpacity style={styles.button1} onPress={handleLogin}>
          <Text style={styles.btntext1}>
            Log In
          </Text>
        </TouchableOpacity>

           <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Recovery')}>
          <Text style={styles.btntext2}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.btntext2}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    padding: 20, // Increased padding
  },
  head: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
    margin: 20,
  },
    text: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginBottom: 25,
    },
    button1: {
        backgroundColor: '#164863',
        borderRadius: 6,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 100,
        marginRight: 100,
    },
    button2: {
        backgroundColor: '#427D9D',
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
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    btntext2: {
        fontFamily: 'sans-serif',
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white',
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

export default LoginScreen;