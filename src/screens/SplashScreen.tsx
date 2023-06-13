import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import LottieView from 'lottie-react-native'

interface SplashProps{
     setIsLoading:Dispatch<SetStateAction<boolean >>
}

const SplashScreen = ({setIsLoading}:SplashProps) => {
  return (
    <View style={{flex:1,alignItems:"center",margin:0}}>
      <LottieView
      source={require('../assets/images/animated.json')}
      autoPlay
      loop={false}
      resizeMode='cover'
      onAnimationFinish={()=>setIsLoading(false)} 
      /> 
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})