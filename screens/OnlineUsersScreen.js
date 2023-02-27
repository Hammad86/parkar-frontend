import { StyleSheet, View, Text, SafeAreaView, ActivityIndicator, RefreshControl, ScrollView, TouchableOpacity, Modal, Pressable, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from "react-native-vector-icons/Entypo";
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnlineUsersScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setuserData] = useState('')
  const [data, setData] = useState([])
  const [uri, setUri] = useState('https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png')

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName]=useState('');
  const [cnic, setcnic] = useState('')
  const getValue = (name) => {
    AsyncStorage.getItem(name)
      .then((val) => {


        setUri(val)
        console.log(val);
      })
  }
  //


  const openCam = async () => {
    try {
      // Invoking get method to perform a GET request
      let res = await axios.get(`https://rich-red-reindeer-garb.cyclic.app/api/v1/auth/getAllData`)
      let allUsers = res.data.data
      setuserData(res.data.data);


    } catch (error) {
      console.log(error.message);
    }

    console.log(userData);
  }
  useEffect(() => {
    // openCam();
    // launchImageLibrary({},setImage)
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
    }, 3000);
  }, []);

  useEffect(() => {

    if (userData) {
      let data = userData?.filter((item) => item.park === "t")
      setData(data)
      console.log('hamara', data);
    }
    else {
      openCam();
    }
  }, [refreshing]);

  // if (loading) {
  //   return (
  //     <View>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
      data={data}
      renderItem={(element)=>{
        // console.log(element.item.name)
        return <View style={styles.box}>
        <Text>
        <Fontisto name="motorcycle" size={30} />
        </Text>
        <Text>{element.item.name}</Text>
        <Text>{element.item.vehicleNumber}</Text>
      </View>
      }}
      /> */}
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {data.length > 0 ? data.map((item, index) => {

          return (
            <TouchableOpacity key={index}

              onPress={() => {console.log('click'),setName(item.name),setUri(item.uri),setcnic(item.cnicNumber), setModalVisible(!modalVisible) }}>
              <View style={styles.box}>
                <Text>
                  <Fontisto name={item.pickerValue === 'Bike' ? "motorcycle" : 'car'} size={30} />
                </Text>
                <Text>{item.name}</Text>
                <Text>{item.vehicleNumber}</Text>

              </View>

            </TouchableOpacity>
          )
        })
          : <Text>Pull down to Refresh</Text>}
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
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Entypo name='squared-cross' size={20} />
                      </Pressable>
                    </View>
                  </View>
                </Modal>

      </ScrollView>

    </SafeAreaView>
  )
}

export default OnlineUsersScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'

  },
  box: {
    backgroundColor: '#f6f6f6',
    width: 350,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width:'80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});