import {Alert,View,ScrollView,SafeAreaView,Text, TouchableOpacity,Image,StyleSheet} from 'react-native';
import { Stack,useRouter ,Link} from 'expo-router';
import {COLORS,images,icons,SIZES} from '../constants'
import {Camera} from 'expo-camera'
import { useEffect,useState } from 'react';
import CameraScan from './cameraScan'; // Replace with the correct path to your component

const pressed=()=>{
  Alert.alert('not counterfiet');
}
const npressed=()=>{
  Alert.alert('not coiunterfiet');
}
const MyScan = () => {
  return (
    <View style={{ flex: 1 }}>
      <CameraScan />
    </View>
  );
};
/*const MyScan=()=>{
    var val=0;
    const navigation=useRouter();
    const [hasCameraper,setCameraper]=useState(null);
    const[camera,setCamera]=useState(null);
    const[type,setType]=useState(Camera.Constants.Type.back);
    useEffect(()=>{
      (async()=>{
        const camStatus=await Camera.requestCameraPermissionsAsync();
        setCameraper(camStatus.granted);
      })()
    })
    
    return (
        <>
      <Stack.Screen
        options={{
          title: "Scan",
        }}
      />
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
              <Camera style={styles.camRatio} type={type} ratio={'1:1'} ref={(ref)=>setCamera(ref)}/>
            </View>
            <View style={{flex:0,flexDirection:'row', justifyContent: 'center'}}>
              <TouchableOpacity >
              <Image style={styles.button} source={require('../images/scanner.png')}/>
              </TouchableOpacity>
            </View>
            <View style={{flex:0,flexDirection:'row', justifyContent: 'center'}}>
              <TouchableOpacity  style={styles.uploadButton} onPress={()=>alert("non couterfiet")
}>
           <Text>upload</Text>
              </TouchableOpacity>
              </View>
        </View>
        </>
    );
};*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    width:50,
    height:50,
    backgroundColor: '#DDDDDD',
    padding: 20,
    margin :20
  },
  uploadButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20,
    margin :10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  cameraContainer:{
    flex:1,
    flexDirection:'row',
    margin:10
  }
  ,camRatio:{
    flex:1,
    aspectRatio:1,
  }
});

export default MyScan;