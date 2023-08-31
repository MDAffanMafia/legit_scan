import {Stack} from 'expo-router';
const layout = ()=>{
    return <Stack
    screenOptions={{
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
    <Stack.Screen
        name="index"
        options={{
          title: "Welcome",
        }}
      />
    </Stack>
    
    
}
export default layout;