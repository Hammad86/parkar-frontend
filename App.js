import React,{useState,useEffect} from 'react';
// import SplashScreen from 'react-native-splash-screen'
import { createStackNavigator } from '@react-navigation/stack';
import Header from './components/Header';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {StyleSheet,Text, View} from 'react-native';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';

const Stack = createStackNavigator();
const App = () => {
  
  const [initilizing, setInitializing] = useState(true);
  const [user,setUser] = useState(true);
  const [userID,setUserId] = useState()
  
  // Handle User State Change
  // const onAuthStateChange = (user) =>{ 
  //   setUser(user);
  //   if (initilizing){
  //     setInitializing(false);
  //   }
  // }

  useEffect(()=>{
    
  
  },[]);

  
  
  return (
    
    <NavigationContainer style={styles.container}>
       
    <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{gestureEnabled: false}}>
    <Stack.Screen 
        options={{ headerTitle: () => <Header   />,
        headerStyle:{
          height:150,
          borderBottomLeftRadius:50,
          borderBottomRightRadius:50,
          backgroundColor:'#ffd235',
          shadowColor:'#000',
          elevation:25,
        },

      }}
         name="LoginScreen" 
         component={LoginScreen} />

    <Stack.Screen 
        options={{ headerTitle: () => <Header />,
        headerStyle:{
          
          height:150,
          borderBottomLeftRadius:50,
          borderBottomRightRadius:50,
          backgroundColor:'#ffd235',
          shadowColor:'#000',
          elevation:25,
        }
      }}
         name="SignUpScreen" 
         component={SignUpScreen} />

    <Stack.Screen 
        
        options={{ headerTitle: () => <Header />,
        headerLeft: ()=> null,
        gestureEnabled: false,
        
        headerStyle:{
          height:150,
          borderBottomLeftRadius:50,
          borderBottomRightRadius:50,
          backgroundColor:'#ffd235',
          shadowColor:'#000',
          elevation:25,
        }
      }}
         name="HomeScreen" 
         component={HomeScreen} />

<Stack.Screen 
        
        options={{ headerTitle: () => <Header />,
        headerLeft: ()=> null,
        gestureEnabled: false,
        
        headerStyle:{
          height:150,
          borderBottomLeftRadius:50,
          borderBottomRightRadius:50,
          backgroundColor:'#ffd235',
          shadowColor:'#000',
          elevation:25,
        }
      }}
         name="AdminScreen" 
         component={AdminScreen} />
    </Stack.Navigator>

    </NavigationContainer>
   
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  head:{
    color:'#000'
  }
  });