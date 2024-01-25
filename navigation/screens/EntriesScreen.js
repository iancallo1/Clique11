import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ToastAndroid, StatusBar } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import color from "../../assets/colors.js";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const {height, width} = Dimensions.get('window');

function EntriesScreen({ navigation }) {
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [sched, setSchedule] = useState("");
    const [link, setLink] = useState("");
    const handleSubmitPost = async ()=>{  
        if (groupName && description && sched && link) {
            try {
              // Save group information to Firestore
              const db = getFirestore();
              const groupsCollection = collection(db, 'posts');
      
              // Add a new document with a generated ID
              await addDoc(groupsCollection, {
                groupName: groupName,
                description: description,
                schedule: sched,
                link: link,
                // Add any other group information you want to store
              });

              console.log('Group successfully added!');
              setGroupName('');
              setDescription('');
              setSchedule('');
              setLink('');
      
              // Optionally, you can navigate to another screen after successful submission
              // navigation.navigate('SomeScreen');
            } catch (err) {
              console.log('Error:', err.message);
              // Handle error, show a message to the user, etc.
            }
          } else {
            // Handle the case when some fields are empty
            console.log('All fields are required');
          }
    }
    return (
        <LinearGradient
        style={{flex: 1}} colors={[color.first, color.white]}>
            <StatusBar backgroundColor={color.white} barStyle={"dark-content"}/>

            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.header1}>
                        <Text style={styles.logo}>.Clique</Text>
                    </View>
                    <View style={styles.header2}>
                        <Text style={styles.name}>Add Group</Text>
                    </View>
                </View>

                <View style={styles.main}>
                    <View style={styles.section1}>
                        <Text style={styles.head}>Be Clique!</Text>
                        <Text style={styles.text}>Post Your Group as a Clique!</Text>
                    </View>
                    <View style={styles.section2}>
                    <TextInput
            style={styles.input}
            placeholder=''
            label='Group Name'
            value={groupName}
            onChangeText={value=> setGroupName (value)} 
            />
            <TextInput
            style={styles.input}
            placeholder=''
            label='Group Description'
            value={description}
            onChangeText={value=> setDescription(value)}
        
            />
            <TextInput
            style={styles.input}
            placeholder=''
            label='Schedule'
            value={sched}
            onChangeText={value=> setSchedule(value)}
 
            
            />
            <TextInput
            style={styles.input}
            placeholder=''
            label='Group-Link'
            value={link}
            onChangeText={value=> setLink(value)}
            />

            <TouchableOpacity style={styles.button1} onPress={handleSubmitPost}>
                <Text style={styles.btntext1}>
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footer}></View>
            </View>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    /* Container and Sections */
    container: {
        height: hp(100),
        backgroundColor: 'transparent',
    },
    header: {
        height: hp(10),
        display: 'flex',
        flexDirection: 'row',
    },
    header1: {
        width: wp(50),
        backgroundColor: color.white,
        justifyContent: 'center',
    },
    header2: {
        width: wp(50),
        backgroundColor: color.white,
        justifyContent: 'center',
    },
    main: {
        height: hp(80),
        backgroundColor: 'transparent',
    },
    section1: {
        height: hp(20),
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    section2: {
        height: hp(60),
        backgroundColor: 'transparent',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    footer: {
        height: hp(10),
        backgroundColor: 'transparent',
    },

    /* Header */
    logo: {
        fontSize: hp(3.4),
        color: color.first,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: hp(2),
    },
    name: {
        fontSize: hp(3.4),
        color: color.black,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: hp(2),
    },  
    head: {
        fontSize: hp(4),
        color: color.black,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: hp(2),
    },
    text: {
        fontFamily: 'sans-serif',
        fontSize: hp(2),
        color: color.black,
        textAlign: 'center',
        margin: 10,
    },

    /* Body */
    input: {
        fontFamily: 'sans-serif',
        fontSize: hp(2.2), 
        paddingVertical: 3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 3,
        borderColor: color.grey,
        backgroundColor: color.fifth,
        margin: 10,
        marginLeft: hp(2),
        marginRight: hp(2),
    },
    button1: {
        backgroundColor: color.first,
        borderRadius: 50,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: hp(1.6),
        marginLeft: 90,
        marginRight: 90,
    },
    btntext1: {
        fontFamily: 'sans-serif',
        fontSize: hp(2.6),
        fontWeight: 'bold',
        color: color.black,
        textAlign: 'center'
    },
});

export default EntriesScreen;