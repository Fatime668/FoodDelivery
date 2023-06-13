import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import OnBoardingScreen from '../../screens/OnBoardingScreen'
import LoginScreen from '../../screens/LoginScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import HomeScreen from '../../screens/HomeScreen'
import TabMain from '../tab'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Onboarding" component={OnBoardingScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name='Register' component={RegisterScreen}/>
        
        <Stack.Screen name='TabMain' component={TabMain}/>
      </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})