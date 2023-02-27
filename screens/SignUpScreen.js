import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { launchCamera} from 'react-native-image-picker';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaskedTextInput} from "react-native-mask-text";


// import { db, collection,setDoc ,createUserWithEmailAndPassword,auth,doc, addDoc} from '../config';
// import { firebase } from '../config';


const SignUpScreen = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [uri, setUri] = useState('https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png')
  const [pickerValue, setPickerValue] = useState("Bike");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [cnicNumber, setCnicNumber] = useState('');
  const [park, setpark] = useState('f')
  
  const [errorMsg, setErrorMsg] = useState(null)
  const [maskedValue, setMaskedValue] = useState("");
  
  
let reqBody = {email, password,name: fullName, vehicleNumber, cnicNumber,pickerValue,park,uri}
  const registerUser = async (reqBody) => {
    if (email.trim() === '' || password.trim() === '' || vehicleNumber.trim() === '' || fullName.trim() === '' || cnicNumber.trim() === ''
    || uri ==='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png')
     {
      setErrorMsg('All Fields Are required!');
      return;
    }
    try {
      let {data} = await axios({
        method: 'post',
        url: 'https://rich-red-reindeer-garb.cyclic.app/api/v1/auth/signup',
        data: reqBody
      });
      if(data.error){
        console.log('err',data.error);
      }
      else if(data.data){
        let token = data.data['token']
        
        let user = data.data['user']
        let storeData = token
        _storeData = async () => {
          try {
            await AsyncStorage.setItem(
              email,
              storeData
            );
            await AsyncStorage.setItem(
              fullName,
              uri
            );
            alert('success')
            navigation.navigate('LoginScreen')
          } catch (error) {
            console.log(error);
            // Error saving data
          }
        };
        _storeData();
        console.log('data',token) ;
        console.log('user',user);
      }
      else{
        setErrorMsg('Mail Already used!')
      }
      // let data = res.response;
      
    } catch (error) {
      console.log(error); // this is the main part. Use the response property from the error object
  
      return error.response;
    }

  }

  useEffect(()=>{
   

    (async() =>{
      try {
        if(image){
          let result = await image.assets[0].uri;
          
          console.log(image.assets[0]);
          setUri(result)  
          const formData = new FormData()
          formData.append('image',{
            uri: result,
            type: 'image/jpeg',
            name: 'test.jpg',
          }
          );

          try {
            
            
            const response = await axios.post('https://rich-red-reindeer-garb.cyclic.app/api/v1/auth/uploadImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
            console.log(response.data.data);
            setUri(response.data.data)
          } catch (error) {
            console.log(error);
          }
        }
  
      } catch (error) {
        Alert.alert('please take a selfie!')
        console.log(error);
      }
      
      
  
    })();
    
  },[image])

  return (
    <View style={styles.container}>
      
      <TouchableOpacity
      onPress={() => { launchCamera({cameraType:'front'},setImage)
    }} 
      >
      
      <Image
          source={{
            uri:
              uri,
          }}
          //borderRadius style will help us make the Round Shape Image
          style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
        />

      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
        onPressIn = {()=>setErrorMsg(null)}
          placeholder='Full Name'
          placeholderTextColor="#000"
          value={fullName}
          onChangeText={val => setFullName(val)}
          autoCorrect={false}
          autoComplete={'off'}
          style={styles.input}
        />

        <TextInput
        onPressIn = {()=>setErrorMsg(null)}
        placeholderTextColor="#000"
          placeholder='Email'
          value={email}
          onChangeText={val => setEmail(val)}
          autoCorrect={false}
          keyboardType='email-address'
          style={styles.input}
          autoComplete={'off'}
        />
        <TextInput
        onPressIn = {()=>setErrorMsg(null)}
        placeholderTextColor="#000"
          placeholder='Password'
          value={password}
          onChangeText={val => setPassword(val)}
          autoCorrect={false}
          style={styles.input}
        />

        <MaskedTextInput
        placeholderTextColor="#000"
        mask="99999-9999999-9"
        onChangeText={(text, rawText) => {
          setMaskedValue(text);
          setCnicNumber(text);
        }}
        
        keyboardType='numeric'
        minLength={15}

          placeholder='CNIC'
          value={cnicNumber}
          // onChangeText={val => setCnicNumber(val)}
          autoCorrect={false}
          style={styles.input}
        />

        <MaskedTextInput
        placeholderTextColor="#000"
        mask="AAA-9999"
        placeholder='Vehicle Number'
          value={vehicleNumber}
        onChangeText={(text, rawText) => {
          // setMaskedValue(text);
          setVehicleNumber(text);
          
        }}
        onPressIn = {()=>setErrorMsg(null)}
          
          // onChangeText={val => setVehicleNumber(val)}
          autoCorrect={false}
          style={styles.input}
        />


        <View style={styles.dropdown}>
          <Picker color='#000'

            selectedValue={pickerValue}
            onValueChange={(val) => setPickerValue(val)}>
            <Picker.Item color='#000' label='Bike' value='bike' />
            <Picker.Item color='#000' label='Car' value='car' />

          </Picker>
        </View>



        {/*  */}
        <TouchableOpacity
          style={styles.button}
          onPress={()=>registerUser(reqBody)}
        >

          <Text
            style={styles.buttonText}
          >SignUp
          </Text>
        </TouchableOpacity>
        {errorMsg ? <Text style={styles.errormsg}>{errorMsg}</Text> : null}

      </View>



    </View>
  )
}

export default SignUpScreen

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
    alignItems: 'center',
    marginTop: 20,
  },
  buttonOutline: {
    backgroundColor: '#000',
    marginTop: 5,
    borderColor: '#ffd235',
    borderWidth: 2,
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
  },
  dropdown: {
    borderRadius: 10,
    color: '#fff',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    // paddingVertical: 10,
    marginTop: 10,
  },
  errormsg:{
    color: 'red',
    paddingHorizontal:70
  }
  

})