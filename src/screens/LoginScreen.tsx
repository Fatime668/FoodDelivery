import { StyleSheet,TextInput ,TouchableOpacity,Text, View, Image, ActivityIndicator, Dimensions, StatusBar, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Separator from '../components/Separator'
import Display from '../utils/Display'
import { SafeAreaView } from 'react-native-safe-area-context'
import AnimatedLottieView from 'lottie-react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { useDispatch, useSelector } from 'react-redux'
import {  signInUser } from '../redux/slice/AuthSlice'
import { AppDispatch, RootState } from '../redux'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Auth } from '../../models/Auth'
import { signInInitialValues, signInSchema } from '../../schema/authSchema'




const WIDTH=Dimensions.get("screen").width
const HEIGHT = Dimensions.get('screen').height



const LoginScreen = ({navigation}:any) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const {token ,loading}= useSelector((state: RootState) => state.authSlice);

  const handleSignIn = (values: any) => {
    console.log('vasimd');
    
    const {username, password} = values;
    const user: Auth = {
      username,
      password,
      email:''
    };
    console.log('user ', user);
    
    dispatch(signInUser(user)).then((res)=>{
      console.log(res);
      
      if(res.type=='auth/login/fulfilled'){

        navigation.navigate('TabMain');
      }else if(res.type=='auth/login/rejected'){
        Alert.alert('The Username or Password is incorrect!')
      }
    });
   
  };
  return (
    
    <View style={styles.container}>
      <StatusBar hidden/>
     <View style={{flex:1,backgroundColor:"#fff",justifyContent:"center"}}>
     <View style={{width:WIDTH*.35,height:WIDTH*.35,borderRadius:WIDTH*.35,backgroundColor:'#088f6a',position:'absolute',top: WIDTH*-.1, right: WIDTH*.03}}/>

      <View style={{width:WIDTH*.7,height:WIDTH*.7,backgroundColor: "#077f7a",position:'absolute',borderRadius:WIDTH*.35,top: WIDTH* -.2}}>
        <View style={{width:WIDTH*.1,height:WIDTH*.1,borderRadius:WIDTH*.05,backgroundColor:'#066f6a',position:'absolute',top: WIDTH*.4, left: WIDTH*.2}}/>
        <View style={{width:WIDTH*.16,height:WIDTH*.16,borderRadius:WIDTH*.35,backgroundColor:'#066f6a',position:'absolute',top: WIDTH*.37, left: WIDTH*.35}}/>

    
      </View>
     <View style={{width:WIDTH*.3,height:WIDTH*.3,borderTopStartRadius:WIDTH*.3,borderTopEndRadius:WIDTH*.3,backgroundColor:'#088f6a',position:'absolute',bottom: 0, right: WIDTH*.1}}/>
      <View style={{padding:WIDTH*.05}}>
      <View style={styles.headerContainer}>
        {/* <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.navigate(Onboarding)}
        /> */}
        <Text style={styles.headerTitle}>Login</Text>
      </View>
     
      
     <Formik 
     initialValues={signInInitialValues}
     validationSchema={signInSchema}
     onSubmit={handleSignIn}
     >
      {  
        (formik)=>(
          
          <View>
            <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <AntDesign
              name="user"
              size={22}
              color={"gray"}
              style={{marginRight: 10}}
            />
            <TextInput
              placeholder="Username"
              // placeholderTextColor={"#ccc"}
              value={formik.values.username}
              selectionColor={"gray"}
              style={styles.inputText}
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
            />
           {formik.errors.username&&<Text style={{left:20,bottom:-20,position:'absolute',color:"tomato"}}>{formik.errors.username}</Text>}

          </View>
        </View>
         <View style={styles.inputContainer}>
         <View style={styles.inputSubContainer}>
           <AntDesign
             name="lock"
             size={22}
             color={"gray"}
             style={{marginRight: 10}}
           />
           <TextInput
             secureTextEntry={isPasswordShow ? false : true}
             placeholder="Password"
             value={formik.values.password}
             // placeholderTextColor={"#ccc"}
             selectionColor={"gray"}
             style={styles.inputText}
             onChangeText={formik.handleChange('password')}
             onBlur={formik.handleBlur('password')}
           />
           {formik.errors.password&&<Text style={{left:20,bottom:-20,position:'absolute',color:"tomato"}}>{formik.errors.password}</Text>}
           <Entypo
             name={isPasswordShow ? 'eye' : 'eye-with-line'}
             size={22}
             color={"gray"}
             style={{marginRight: 10}}
             onPress={() => setIsPasswordShow(!isPasswordShow)}
           />
         </View>
       </View>
       <Text style={styles.errorMessage}>{errorMessage}</Text>
      <View style={styles.forgotPasswordContainer}>
        <View style={styles.toggleContainer}>
          {/* <ToggleButton size={0.5} /> */}
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
        <Text
          style={styles.forgotPasswordText}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password
        </Text>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={formik.handleSubmit}
        activeOpacity={0.8}>
        {isLoading ? (
          <AnimatedLottieView source={require('../assets/images/loading.json')} autoPlay />
        ) : (
          <Text style={styles.signinButtonText}>Login</Text>
        )}
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.accountText}>Don't have an account?</Text>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate('Register')}>
          Register
        </Text>
      </View>
          </View>
        )
      }
     </Formik>
      </View>
   
     </View>
   
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily:'Poppins-Medium',
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily:'Poppins-ExtraLight',
    fontWeight:"500",
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 16,
    fontFamily:'Poppins-ExtraLight',
    fontWeight:"400",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 25,
    marginTop:30,
    borderWidth: 0.5,
    borderColor: "#ddd",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 14,
    fontFamily:'Poppins-Medium',
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: "#000",
    flex: 1,
  },
  forgotPasswordContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberMeText: {
    marginLeft: 10,
    fontFamily:'Poppins-Medium',
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color:"gray",
  },
  forgotPasswordText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: "#077F7A",
    fontFamily:'Poppins-Medium',
  },
  signinButton: {
    backgroundColor:"#077F7A",
    borderRadius: 25,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    fontFamily:'Poppins-Medium',
    color: "#fff",
  },
  signupContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountText: {
    fontSize: 13,
    fontFamily:'Poppins-Medium',
    lineHeight: 13 * 1.4,
    color: "#000",
  },
  signupText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: "#077F7A",
    marginLeft: 5,
    fontFamily:'Poppins-Medium',
  },
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: "#000",
    fontFamily:'Poppins-Medium',
    marginLeft: 5,
    alignSelf: 'center',
  },
  facebookButton: {
    borderColor:'#097ce7',
    height:50,
    // width:120,
    // marginHorizontal: 20,
    // marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
   
    // paddingVertical: 15,
    // marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinButtonLogo: {
    height: 18,
    width: 18,
  },
  signinButtonLogoContainer: {
    backgroundColor: "#fff",
    padding: 2,
    borderRadius: 3,
    position: 'absolute',
    left: 25,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  socialSigninButtonText: {
    color: "#fff",
    fontSize: 13,
    fontFamily:'Poppins-Medium',
    lineHeight: 13 * 1.4,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: "red",
    marginHorizontal: 20,
    marginTop: 3,
    marginBottom: 10,
  },

})