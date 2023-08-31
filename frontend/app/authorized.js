import {useState} from 'react';
import {View,ScrollView,SafeAreaView,Text,TouchableOpacity,StyleSheet,TextInput} from 'react-native';
import { Stack,useRouter ,Link} from 'expo-router';
import {COLORS,images,icons,SIZES} from '../constants';
import { Camera } from 'expo-camera';
const Login=()=>{
    const navigation=useRouter();
    return (
        <>
      <Stack.Screen
        options={{
          title: "Authorized Medicines",
        }}
      />
         <View>
                     <ScrollView>
                     <TouchableOpacity >
             
                  </TouchableOpacity>
                     </ScrollView>
                   
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
    textInput:{
      padding:20,
      margin:20,
      alignItems:'center'
    }
    ,
    countContainer: {
      alignItems: 'center',
      padding: 10,
    },
  });
export default Login ;