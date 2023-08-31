import {useState} from 'react';
import {View,ScrollView,SafeAreaView,Text,TouchableOpacity,StyleSheet, TextInput} from 'react-native';
import { Stack,useRouter ,Link} from 'expo-router';
import {COLORS,images,icons,SIZES} from '../constants';
import { Camera } from 'expo-camera';
const Home=()=>{
    const navigation=useRouter();
    return (
        <>
      <Stack.Screen
        options={{
          title: "Legit Scan",
        }}
      />
        <View>
            <TouchableOpacity style={styles.button} >
            <Link href="/myScan">Go to Camera</Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} >
            <Link href="/authorized">
            Authorized Medicines
            </Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} >
            <Link href="/login">
            login
            </Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} >
            <Link href="/signup">
            SignUp
            </Link>
      </TouchableOpacity>
        </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 20,
      margin :20
    },
    countContainer: {
      alignItems: 'center',
      padding: 10,
    },
  });
  
export default Home;