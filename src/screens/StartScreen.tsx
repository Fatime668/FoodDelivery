import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux';
import TabMain from '../navigation/tab';
import StackNavigator from '../navigation/stack';
import { getLoggedIn } from '../redux/slice/AuthSlice';

const StartScreen = () => {
    const result = useSelector<RootState, any>((state: any) => state.authSlice);
  const dispatch = useDispatch<AppDispatch>();
  console.log(result);
  useEffect(() => {
    dispatch(getLoggedIn());
  }, []);

  if (result.loggedIn) {
    return <TabMain />;
  } else {
    return <StackNavigator />;
  }
}

export default StartScreen

const styles = StyleSheet.create({})