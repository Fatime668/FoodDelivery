import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../../screens/HomeScreen'
import SearchScreen from '../../screens/SearchScreen'
import BasketScreen from '../../screens/BasketScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/AntDesign'
import StackNavigator from '../stack'
import { HomeStackNavigator } from '../stack/HomeStack'


const Tab = createBottomTabNavigator()

const TabMain = () => {
  return (
  <Tab.Navigator
  screenOptions={({ route }) => {
              return ({
                  tabBarIcon: ({ color, size }) => {
                      let iconName: any

                      if (route.name === 'Home') {
                          iconName = 'home'
                      } else if (route.name === 'Search') {
                          iconName = 'search1'
                      } else if (route.name === 'Basket') {
                          iconName = 'shoppingcart'
                      } else if (route.name === 'Profile') {
                          iconName = 'user'
                      }

                      return <Icon name={iconName} size={size} color={color} />
                  },
                  tabBarActiveTintColor: '#077f7a',
                  tabBarInactiveTintColor: 'gray',
                  
                 
                 
              })
              
          }}
 
  >
    <Tab.Screen name="Home" component={HomeStackNavigator}
    options={{headerShown:false}}
    />
    <Tab.Screen name="Search" component={SearchScreen}
    options={{headerShown:false}}

    />
    <Tab.Screen name="Basket" component={BasketScreen}
    options={{headerShown:false}}
    
    />
    <Tab.Screen name="Profile" component={ProfileScreen}
    options={{headerShown:false}}

    />
  </Tab.Navigator>
  )
}

export default TabMain

const styles = StyleSheet.create({})