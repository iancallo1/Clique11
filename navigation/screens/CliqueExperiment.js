import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, StatusBar,ScrollView } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import color from "../../assets/colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { doc, getDocs, firestore, collection,query,where,} from 'firebase/firestore';
import { auth, database } from '../../config/firebase.js';
import { Linking } from 'react-native';


const {height, width} = Dimensions.get('window');

const Clique = () => {

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const querySnapshot = await getDocs(collection(database, 'posts'));
      const newPosts = [];
      querySnapshot.forEach((doc) => {
        newPosts.push({ id: doc.id, ...doc.data() });
      });
      setAllPosts(newPosts);
    };
    fetchAllPosts();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <LinearGradient style={{ flex: 1 }} colors={[color.second, color.white]}>
        {/* ... (rest of your existing code) */}

        <View style={styles.activityContent}>
          {/* Display all user's posts */}
          {allPosts.map((post) => (
            <View key={post.id} style={styles.postContainer}>
              <Text style={styles.groupName}>{post.groupName}</Text>
              <Text style={styles.groupDesc}>{post.description}</Text>
              <Text style={styles.schedule}>{post.schedule}</Text>
              <Text style={styles.link}>{post.link}</Text>
              {/* Add more Text components for other post details */}
            </View>
          ))}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: color.white,
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
      backgroundColor: color.white,
      gap: hp(0.4),
  },
  section1: {
      height: hp(10),
      backgroundColor: color.third,
      justifyContent: 'center',
      alignItems: 'center',
  },
  section2: {
      height: hp(60),
      backgroundColor: color.third,
      justifyContent: 'center',
      alignItems: 'center',
  },
  section3: {
    height: hp(10),
    backgroundColor: color.third,
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

  /* Body */
  time: {
    fontSize: hp(4),
    fontWeight: 'bold',
    color: color.black,
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
  group: {
    backgroundColor: color.first,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  groupName: {
    fontSize: hp(2.6),
    fontWeight: 'bold',
    marginBottom: 5,
    color: color.black,
  },
  groupDesc: {
    fontSize: hp(1.8),
    color: color.black,
  },
    schedule: {
    fontSize: hp(1.8),
    color: color.black,
  },
    link: {
    fontSize: hp(1.8),
    color: color.black,
  },
  postContainer: {
    borderBottomWidth: 1, // Add this line to add a border
    borderBottomColor: color.black, // Set the border color as per your design
    marginBottom: hp(1), // Add some margin to separate posts
    paddingBottom: hp(1), // Add padding to give space after the border
    marginLeft:hp(3),
  },
});


export default Clique;
