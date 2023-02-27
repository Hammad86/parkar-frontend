
import React,{ useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Alert,Modal, Pressable, Image } from 'react-native';
import { launchImageLibrary,launchCamera} from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';
import Entypo from "react-native-vector-icons/Entypo";
import axios from 'axios';

const DashboardScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName]=useState('');
  const [cnic, setcnic] = useState('')
  const [uri, setUri] = useState('https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png')
  const [image, setImage] = useState(null);
  const [matchVal, setMatchVal] = useState('')
  const [vehicle, setvehicle] = useState('')
  const [park, setPark] = useState('');
  const [userData, setuserData] = useState([])
  const [uData,setuData] = useState({
    user_id: '',
    name: '',
    park: ''
  })
  const [text,setText] =useState(null)
  const [bikeParked, setbikeParked] = useState(0);
  const [bikeRemaining, setbikeRemaining] = useState(300);
  const [carParked, setcarParked] = useState(0);
  const [carRemaining, setcarRemaining] = useState(100);
  
  const updateUser = async () => {
    try {
      let {data} = await axios({
        method: 'put',
        url: 'https://rich-red-reindeer-garb.cyclic.app/api/v1/auth/updateUserData',
        data: uData
      });
      setvehicle(data.data.user.pickerValue)
      console.log('updated' ,data.data.user.pickerValue);
      if(data.error){
        console.log('err',data.error);
      }
      
      
    } catch (error) {
      console.log('catch',error); // this is the main part. Use the response property from the error object
  
      return error.response;
    }

  }

  const openCam = async() =>{
    try {
   // Invoking get method to perform a GET request
  // let res = await axios.get(`https://2552-111-88-203-1.ngrok.io/api/v1/auth/getAllData`)
  let {data} = await axios({
    method: 'get',
    url: 'https://rich-red-reindeer-garb.cyclic.app/api/v1/auth/getAllData',
    
  });

  console.log(data.data);
  
  setuserData(data.data)
    
    } catch (error) {
      // let res = await axios.get(`https://2552-111-88-203-1.ngrok.io/api/v1/auth/getAllData`)
      // let allUsers = res.data.data
      // setuserData(res.data.data)
      let {data} = await axios({
        method: 'get',
        url: 'https://rich-red-reindeer-garb.cyclic.app/api/v1/auth/getAllData',
        
      });

      console.log(error.message);
    }
   
    // console.log(userData); 
  }

  // const updateUser = async (uData) => {
  //   try {
  //     let {data} = await axios({
  //       method: 'put',
  //       url: 'https://a66e-111-88-203-1.ngrok.io/api/v1/auth/updateUserData',
  //       data: uData
  //     });
  //     console.log('updated' ,data);
  //     if(data.error){
  //       console.log('err',data.error);
  //     }
      
      
  //   } catch (error) {
  //     console.log('catch',error); // this is the main part. Use the response property from the error object
  
  //     return error.response;
  //   }

  // }
  useEffect(()=>{
    
    setTimeout(() => {
      openCam();
    }, 3000);

    
  
    
    // launchImageLibrary({},setImage)
  },[])
  useEffect(() => {
    if(!userData){
      
      openCam();
      
    }
  }, [park])
  

  useEffect(()=>{
    console.log(userData);
    

    (async() =>{
      if(image){
        try {
          let result = await TextRecognition.recognize(image.assets[0].uri);
          console.log(result);
          let match
        setText(result)
        for(let i of result){
          for (const j of userData) {
            matching = j.vehicleNumber.split('-')[1] 
          match  = i.match(matching)
            
          if (match){
            console.log(j._id);
            console.log(j.name);
           setuData({
              user_id: j._id,
              name: j.name,
              park: park
            })
            setMatchVal(match)
            console.log(match);
            // Alert.alert('success')
            setName(j.name)
            setUri(j.uri)
            setcnic(j.vehicleNumber)
            setModalVisible(!modalVisible)
            break
     
          }
          else{
            console.log(match);
          }
          } 
        }
        console.log('name',name);
        if(!name){
          console.log('not name');
          // setName('Please Register Your Vehicle!')
          
          //   setUri('https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png')
          //   setcnic('')
          //   setModalVisible(!modalVisible)
          // alert('Succ  ess')
        }
        setMatchVal('')
        
        console.log('break',match); 
        } catch (error) {
          console.log(error);
          alert('try Again!')
        }
      }

    })();
  //   if(matchVal){
  //     console.log('matchVal =>',matchVal);
  //     setMatchVal('')
  // }
  // else if(!matchVal){
  //   Alert.alert('Please Register your  vehicle!')
  //   setMatchVal('');
  //   console.log('blank' ,matchVal);

  // }
  },[image])

  useEffect(() => {
    // if(!userData){
    //   openCam()
    // }
      updateUser();
      
    }
, [ uData])
  
  useEffect(()=>{

     if (vehicle === 'car' && park ==='t') {
      // setModalVisible(!modalVisible)
      setcarParked(carParked + 1)
      setcarRemaining(carRemaining - 1)
      setvehicle('')
      console.log('car add');
    }
    else if(vehicle == 'car' && park =='f'){
      // setModalVisible(!modalVisible)
      setcarParked(carParked - 1)
      setcarRemaining(carRemaining + 1)
      setvehicle('')
      console.log('car minus');
    }
     else if(vehicle == 'Bike' && park =='t') {
      // setModalVisible(!modalVisible)
      setbikeParked(bikeParked + 1)
      setbikeRemaining(bikeRemaining - 1)
      setvehicle('')
      
      console.log('Bike add');
    }
    else if(vehicle == 'Bike' && park =='f') {
      // setModalVisible(!modalVisible)
      setbikeParked(bikeParked - 1)
      setbikeRemaining(bikeRemaining + 1)
      setvehicle('')
      console.log('bike remove');
    }
    
    else{
      
      console.log('nothing');
    }
    
  },[vehicle])

  
  return (
<SafeAreaView style={styles.container}
>
        
        <View style={styles.row}>
            <View style={[styles.box,]}>
              <Text style={[styles.text1]}>{bikeParked}</Text>
              <Text style={[styles.text2]}>Bike Parked</Text>

            </View> 
            <View style={[styles.box,]}>
              <Text style={[styles.text1]}>{bikeRemaining}</Text>
              <Text style={[styles.text2]}>Slots Remaining</Text>

            </View> 

            
        </View>
        <View style={styles.row}>
        <View style={[styles.box,]}>
              <Text style={[styles.text1]}>{carParked}</Text>
              <Text style={[styles.text2]}>Car Parked</Text>

            </View> 
            <View style={[styles.box,]}>
              <Text style={[styles.text1]}>{carRemaining}</Text>
              <Text style={[styles.text2]}>Slots Remaining</Text>

            </View> 
        </View>
        <View style={styles.row}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => { setPark('t')
          ,launchCamera({},setImage)}}
      >
        <Text
          style={styles.buttonText}
        >Check In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {setPark('f'),
          launchCamera({},setImage)
        }}
      >
        <Text
          style={styles.buttonText}
        >Check Out
        </Text>
      </TouchableOpacity>
      
        </View>
      

        <TouchableOpacity
        style={styles.button2}
        onPress={() => { navigation.navigate('LoginScreen') }}
      >
        <Text
          style={styles.buttonText}
        >Sign Out
        </Text>
      </TouchableOpacity>

      <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Image
                        source={{
                          uri:
                            uri,
                        }}
                        //borderRadius style will help us make the Round Shape Image
                        style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                      />
                      <Text style={styles.modalText}>{name}</Text>
                      <Text style={styles.modalText}>{cnic}</Text>
                      <Pressable
                        style={[styles.button1, styles.buttonClose]}
                        onPress={() => {setModalVisible(!modalVisible)}}>
                        <Entypo name='squared-cross' size={20} />
                      </Pressable>
                    </View>
                  </View>
                </Modal>


    </SafeAreaView>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'
        
      },
      row: {
        flex: .3,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-around'
      },
      box: {
        flex: 0.5,
        height: 140,
        backgroundColor: '#c4c4c4',
        margin: 15,
        borderRadius:10,
        justifyContent:'flex-end',
        alignItems:'center',
        paddingVertical:20,
        
      },
      text1:{
        marginVertical:10,
        textAlign:'left',
        fontSize:40,
        color:'#000'
      },
      text2:{
        fontSize:14,
        color:'#000'
      }
      ,
      button2: {
        backgroundColor: '#ffd235',
        width:'88%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal:10
      },
      button: {
        backgroundColor: '#ffd235',
        width:150,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal:10
      },
      buttonText: {
        color: '#000',
        fontWeight: '700',
        fontSize: 16,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button1: {
        position: 'absolute',
        top: 2,
        right: 2,
        borderRadius: 20,
        padding: 5,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#ffd235',
      },
})