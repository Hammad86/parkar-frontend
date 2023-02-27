import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View,Image ,RefreshControl, ScrollView} from 'react-native';
import React, { useState, useEffect ,useCallback} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeScreen = ({route,navigation}) => {
  const [uri, setUri] = useState('https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png')
  const {userData} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [user_Data, setuserData] = useState('')
  const [name, setName] = useState(userData.name);
  const [data, setData] = useState('')
  const openCam = async () => {
    try {
      // Invoking get method to perform a GET request
      let res = await axios.get(`https://rich-red-reindeer-garb.cyclic.app/api/v1/auth/getAllData`)
      let allUsers = res.data.data
      setuserData(res.data.data);


    } catch (error) {
      console.log(error.message);
    }

    console.log(user_Data);
  }
  console.log(userData.name);
  useEffect(() => {
    const getValue = (name) =>{
      AsyncStorage.getItem(name)
     .then((val)=>{
      
      
      setUri(val)
  console.log(val);
     })
  }
  getValue(name)
  }, [])

  const onRefresh = useCallback(() => {
    openCam();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // setTimeout(()=>{
      //   if (userData){
      //     let data =  userData?.filter((item)=> item.park ==="t")
      //     console.log('hamara',data);
      //   }
      // },5000)
    }, 5000);
  }, []);

  useEffect(() => {

    if (user_Data) {
      let data = user_Data?.filter((item) => item.vehicleNumber === userData.vehicleNumber)
      setData(data)
      console.log('hamara', data);
    }
    else {
      openCam();
    }
  }, [refreshing]);
  return (
    <SafeAreaView >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      
      {data ? data.map((item, index) => {
        return(
          <View key={index} style={styles.container}>
            <Image
          source={{
            uri:
            item.uri,
          }}
          //borderRadius style will help us make the Round Shape Image
          style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
        />
      <Text
        style={styles.headText}>
         {item.name}
      </Text>
      <View style={styles.metaContainer} >
        <FontAwesome5 color='#000' name='parking' size={30}  />
        <Text  style={styles.metaText}>
          {item.park =='t' ? 'Parked': 'Not Park'}
        </Text>
      </View>
      <View style={styles.metaContainer} >
        <Icon color='#000' name='envelope' size={30}  />
        <Text  style={styles.metaText}>
          {item.email}
        </Text>
      </View>
      <View style={styles.metaContainer}>
      <Icon color='#000' name='id-card-o' size={30} />
        <Text style={styles.metaText}>
         {item.cnicNumber}
        </Text>
      </View>


      <View style={styles.metaContainer}>
      <MIcon color='#000' name='emoji-transportation' size={30} />
        <Text style={styles.metaText}>
          {item.pickerValue}
        </Text>
      </View>
      <View style={styles.metaContainer}>
      <SIcon color='#000' name='credit-card' size={30}/>
        <Text style={styles.metaText}>
       
          {item.vehicleNumber}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => { navigation.navigate('LoginScreen')}}
      >
        <Text
          style={styles.buttonText}
        >Sign Out
        </Text>
      </TouchableOpacity>
          </View>
        )
      })
      :<Text>Pull down to  Refresh</Text>
    }
      </ScrollView>
    </SafeAreaView>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:20

  },
  button: {
    backgroundColor: '#ffd235',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 60,
  },
  buttonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  headText: {
    fontWeight: '700',
    fontSize: 30,
    paddingBottom:20,
    textAlign:'left',
    color:'#000'
  },
  metaText:{
    color:'#000',
    fontSize:20,
    paddingLeft:10  
  }
  ,metaContainer:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'90%',
    marginTop:10
  }
})