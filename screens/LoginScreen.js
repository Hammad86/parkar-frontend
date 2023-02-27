import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import HomeScreen from './HomeScreen';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
    // const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(false);
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const [val,setVal] = useState('')
   
    const getValue = (email) =>{
        AsyncStorage.getItem(email)
       .then((val)=>{
        
        
        setVal(val);       
    console.log(val);
       })
    }
    
    const loginUser = async () => {
        
        if (email.trim() === '' || password.trim() === '' ) return alert('Email or Password empty!') 
        
        if(val){

         
        const config = {
            headers: { Authorization: `Bearer ${val}` }
        };
        
        const bodyParameters = {
            email: email,
            password:password,
        };
        
        let data = await axios.post( 
          'https://rich-red-reindeer-garb.cyclic.app/api/v1/auth/login',
          bodyParameters,
          config
        ).then((data)=>{
            userData = data.data['data']['user']
            console.log(userData.email);
            
            if (userData.email === 'admin@mail.com'){
                navigation.navigate('AdminScreen');
            }
            else{
                navigation.navigate('HomeScreen',{userData:userData});
            }
            setEmail('');
            setPassword('')
        })
        .catch((e)=>{
            alert('Invalid Credentials!');
            setEmail('')
            setPassword('')
            console.log('err',e);
        }) 
    }
    else{
        alert('Email does not exist!')
    }
    
      }



    return (
        
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor="#000"
                    placeholder='Email'
                    value={email}
                    onChangeText={val => {setEmail(val); getValue(val);}}
                    autoComplete={'off'}
                    autoCorrect ={false}
                    style={styles.input}
                />
                <TextInput
                placeholderTextColor="#000"
                    placeholder='Password'
                    value={password}
                    onChangeText={val => setPassword(val) }
                    autoCorrect ={false}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={loginUser}
                >

                <Text
                    style={styles.buttonText}
                >Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={() => navigation.navigate('SignUpScreen')}
            >

            <Text
                style={styles.buttonOutlineText}
            >Sign Up
            </Text>
            </TouchableOpacity>
        </View>

        </KeyboardAvoidingView >
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        color:'#000',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#ffd235',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems:'center',
    },
    buttonOutline: {
        backgroundColor:'#000',
        marginTop:5,
        borderColor:'#ffd235',
        borderWidth:2,
    },
    buttonText: {
        color: '#000',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#ffd235',
        fontWeight: '700',
        fontSize: 16,
    }

})