import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import OnBoardingScreen from './src/screens/OnBoardingScreen'
import LoginScreen  from './src/screens/LoginScreen'
import StackNavigator from './src/navigation/stack'
import { Provider } from 'react-redux'
import store from './src/redux'


const Stack = createNativeStackNavigator()
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  
  }, [])
  
  return (
  <Provider store={store}>
<StackNavigator/>
  </Provider>
  )
}

export default App

const styles = StyleSheet.create({})