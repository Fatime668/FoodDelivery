import { Image, SafeAreaView, FlatList,StyleSheet,TouchableOpacity, Text, View, Dimensions, StatusBar } from 'react-native'
import React, { useRef, useState } from 'react'
import Separator from '../components/Separator';
import Display from '../utils/Display';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#282534', white: '#fff'};

const slides = [
  {
    id: '1',
    image: require('../assets/images/discover.png'),
    title: 'Discover places near you',
    subtitle: 'We make it simple to find your favorite food.',
  },
  {
    id: '2',
    image: require('../assets/images/favorite.png'),
    title: 'Achieve Your Goals',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '3',
    image: require('../assets/images/deliver.png'),
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];
const Slide = ({item}:any) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={item?.image}
        style={{height: '45%', width, resizeMode: 'contain'}}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const pageStyle = (isActive:any) =>
isActive
  ? styles.page
  : {...styles.page, backgroundColor: "#ccc"};

  const Pagination = ({index}:any) => {
    return (
      <View style={styles.pageContainer}>
        
        {[...Array(slides.length).keys()].map((_, i) =>
          i === index ? (
            <View style={pageStyle(true)} key={i} />
          ) : (
            <View style={pageStyle(false)} key={i} />
          ),
        )}
      </View>
    );
  };

const OnBoardingScreen = ({navigation}:any) => {
  const [welcomeListIndex,setWelcomeListIndex] = useState(0)

  const welcomeList:any = useRef();
  const onViewRef = useRef(({changed}:any) => {
    setWelcomeListIndex(changed[0].index);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const pageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
    });
  };

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref:any = React.useRef();
  const updateCurrentSlideIndex = (e:any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };
 const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <StatusBar hidden/>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: "#078189",
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace('Login')}>
                <Text style={{fontWeight: 'bold', fontSize: 15,color:"#fff"}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={() => welcomeList.current.scrollToEnd()}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 12,
                    color: "#078189",
                    fontFamily:'Poppins-ExtraLight',
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => pageScroll()}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    padding:20,
                    fontSize: 12,
                    color:"#fff",
                    fontFamily:'Poppins-ExtraLight',
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <StatusBar backgroundColor={COLORS.primary} />
    <FlatList
      ref={welcomeList}
      // scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={updateCurrentSlideIndex}
      contentContainerStyle={{height: height * 0.65,top:50}}
      horizontal
      data={slides}
      pagingEnabled
      overScrollMode="never"
      viewabilityConfig={viewConfigRef.current}
      onViewableItemsChanged={onViewRef.current}
      renderItem={({item}) => <Slide item={item} />}
    />
   
    <Footer />
  </SafeAreaView>
  )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
  subtitle: {
    color: "#000",
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    fontWeight:"400",
    textAlign: 'center',
    fontFamily:'Poppins-ExtraLight',
    lineHeight: 23,
  },
  page: {
    height: 8,
    width: 15,
    backgroundColor: "077f7a",
    borderRadius: 32,
    marginHorizontal: 5,
  },
  pageContainer: {
    flexDirection: 'row',
  },
  title: {
    color: "#000",
    fontFamily:'Poppins-ExtraLight',
    fontWeight:"400",
    fontSize: 22,
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: '#078189',
    justifyContent: 'center',
    alignItems: 'center',
  },
})