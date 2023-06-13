import { LogBox, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SplashScreen from './src/screens/SplashScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './src/redux'
import StartScreen from './src/screens/StartScreen'


const Stack = createNativeStackNavigator()



const App = () => {
  LogBox.ignoreAllLogs()
  const [isLoading,setIsLoading] = useState<boolean>(true)
  const Splash=({navigation}:any)=>{
    useEffect(() => {
      setTimeout(()=>{
        <SplashScreen setIsLoading={setIsLoading}/>
      },15000)
    }, [])
  }
  return (


      isLoading ? <SplashScreen setIsLoading={setIsLoading} /> :
      <Provider store={store}>
    <NavigationContainer>
    <StartScreen/>
    </NavigationContainer>
      </Provider>



  )
}

export default App

const styles = StyleSheet.create({})