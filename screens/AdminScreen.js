import React from 'react'
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import DashboardScreen from './DashboardScreen';
import OnlineUsersScreen from './OnlineUsersScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GuestUser from './GuestUser';


const AdminScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    // <SafeAreaView style={styles.container}>
    //     <Text
    //     style={{fontSize:20,fontWeight:'700'}}>
    //     Admin 
    //   </Text>

    //     <TouchableOpacity
    //     style={styles.button}
    //     onPress={() => { firebase.auth().signOut() }}
    //   >
    //     <Text
    //       style={styles.buttonText}
    //     >Sign Out
    //     </Text>
    //   </TouchableOpacity>
    // </SafeAreaView>
    <Tab.Navigator>
      <Tab.Screen 
      
      name="Dashboard" 
      component={DashboardScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="view-dashboard" color={color} size={26} />
        ),
        tabBarActiveTintColor:'#000'
        
      }} />
      <Tab.Screen 
      name="Users"
       component={OnlineUsersScreen}
       options={{
        headerShown: false,
        tabBarLabel: 'Users',
        tabBarIcon: ({ color }) => (
          <Icon name='users' color={color} size={30} />
        ),
        tabBarActiveTintColor:'#000'
      }} />

<Tab.Screen 
      name="Guest User"
       component={GuestUser}
       options={{
        headerShown: false,
        tabBarLabel: 'Add User',
        tabBarIcon: ({ color }) => (
          <Entypo name='add-user' color={color} size={30} />
        ),
        tabBarActiveTintColor:'#000'
      }} />
    </Tab.Navigator>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
})