import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Dimensions,
  StatusBar, 
} from 'react-native';
import { LinearGradient } from'expo-linear-gradient';
import color from '../../assets/colors';
import { auth, database } from '../../config/firebase.js';
import { doc, getDocs, firestore, collection,query,where,} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const {height, width} = Dimensions.get('window');

function ProfileScreen(props) {
  const [userData, setUserData] = useState(null);

  // Function to get user data from Firestore
  const getUserData = async () => {
    const q = query(
      collection(database, 'users'),
      where('uid', '==', auth.currentUser.uid)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserData(doc.data());
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  
  
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User signed out successfully');
      props.navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={[color.first, color.white]}>
      <View style={styles.container}>
      <StatusBar backgroundColor={color.white} barStyle={"dark-content"}/>
        <View style={styles.header}>
          <View style={styles.header1}>
            <Text style={styles.logo}>.Clique</Text>
          </View>

          <View style={styles.header2}>
            <Text style={styles.name}>Settings</Text>
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.section1}>
            <Image style={styles.profileicon} source={require('../../assets/profile.png')}></Image>
            <Text style={styles.name}>Hello {userData?.name}!</Text>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text style={styles.text}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </Text>
          </View>

          <View style={styles.section2}>
            <TouchableOpacity
              style={styles.button1} onPress={handleLogout}>
                <Text style={styles.btntext1}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}></View>
      </View>
    </LinearGradient>
  );
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
    height: hp(50),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section2: {
    height: hp(30),
    backgroundColor: 'transparent',
  },
  footer: {
    height: hp(10),
    backgroundColor: color.white,
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
    fontSize: hp(6),
    color: color.black,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: hp(2),
  },
  text: {
    fontFamily: 'sans-serif',
    fontSize: hp(2),
    color: color.black,
    textAlign: 'center',
    margin: 10,
  },
  profileicon: {
    width: wp(20),
    height: hp(10),
    margin: hp(2),
  },
  
  /* Buttons */
  button1: {
    backgroundColor: color.white,
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

export default ProfileScreen;