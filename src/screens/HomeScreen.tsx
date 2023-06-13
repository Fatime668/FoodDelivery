import React, { useEffect, useState } from 'react';
import { View, TextInput,Image, FlatList, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions, ScrollView } from 'react-native';
import { categories } from '../../models/Category';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryMenuItem from '../components/CategoryMenuItem';
import { restaurants } from '../../models/Restaurant';
import Separator from '../components/Separator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux';
import { getAllRestaurant, getRestaurantById } from '../redux/slice/RestaurantSlice';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Fonts from '../contants/Fonts';
import { useNavigation } from '@react-navigation/native';


  const WIDTH=Dimensions.get("screen").width
const HomeScreen = ({ navigation, route }: any) => {
  // const {category} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const getRestaurant = () => {
    dispatch(getAllRestaurant());
  };
 
  useEffect(() => {
    getRestaurant();
   
  }, []);
  const restaurants = useSelector((state: RootState) => state.restaurantSlice.restaurants);
 
  const [dataCategories, setdataCategories] = useState<any>([])
  useEffect(() => {
    
  setdataCategories(categories)
  }, [])
  const sortStyle = (isActive:any) =>
  isActive
    ? styles.sortListItem
    : {...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE};
  
  const [activeCategory, setActiveCategory] = useState();
  const [activeSortItem, setActiveSortItem] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  

  return (
    <SafeAreaView style={styles.container}>
      

    <StatusBar 
      
      />
      <View  style={styles.backgroundCurvedContainer}>
            </View>
        <View style={styles.headerContainer}>
          <View style={styles.locationContainer}>
          <Ionicons
            name="location-outline"
            size={17}
            color={"#fff"}
            style={{zIndex:999999}}
          />
          <Text style={styles.locationText}>Delivered to</Text>
          <Text style={styles.selectedLocationText}>HOME</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={16}
            color={"#BF5F17"}
          />
           <Feather
            name="bell"
            size={24}
            color={"#fff"}
            style={{position: 'absolute', right: 0}}
          />
             <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>12</Text>
          </View>
          </View>
          <View style={styles.searchContainer}>
          <View style={styles.searchSection}>
            <Ionicons
              name="search-outline"
              size={25}
              color={Colors.DEFAULT_GREY}
            />
            <Text style={styles.searchText}>Search..</Text>
          </View>
          <Feather
            name="sliders"
            size={20}
            color={"#BF5F17"}
            style={{marginRight: 10}}
          />
        </View>
       <ScrollView  contentContainerStyle={styles.categoriesContainer}  horizontal>
          {categories.map(({name, image}) => (
            <CategoryMenuItem
              key={name}
              name={name}
              image={image}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
       </ScrollView>
        </View>
        <View>
          <ScrollView style={styles.listContainer}>
            <View style={styles.horizontalListContainer}>
             <View style={styles.listHeader}>
             <Text style={styles.listHeaderTitle}>Top Rated</Text>
            <Text style={styles.listHeaderSubtitle}>See All</Text>
             </View>
             <FlatList
             data={restaurants}
             ListHeaderComponent={() => <Separator height={20} width={20} />}
            ListFooterComponent={() => <Separator height={20} width={20} />}
            ItemSeparatorComponent={() => <Separator height={20} width={10} />}
             horizontal
             pagingEnabled
             renderItem={({item}) => (
              <TouchableOpacity
              style={styles.prdcontainer}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('DetailsScreen',{item})}
              >
              <Ionicons
                name={'bookmark-outline'}
                color={Colors.LIGHT_YELLOW}
                size={24}
                style={styles.bookmark}
              //   onPress={() => (isBookmarked ? removeBookmark() : addBookmark())}
              />
              <Image
                source={{uri: item.images.cover}}
                style={styles.posterStyle}
              />
              <Text style={styles.titleText}>{item.name}</Text>
             
              <View style={styles.footerContainer}>
                <View style={styles.rowAndCenter}>
                  <FontAwesome name="star" size={14} color={"#f4af30"} />
                  <Text style={styles.ratingText}>4</Text>
                  <Text style={styles.reviewsText}>({10})</Text>
                </View>
                <View style={styles.rowAndCenter}>
                  <View style={styles.timeAndDistanceContainer}>
                    <Ionicons
                      name="location-outline"
                      color={"tomato"}
                      size={15}
                    />
                    <Text style={styles.timeAndDistanceText}>{item.distance}</Text>
                  </View>
                  <View style={styles.timeAndDistanceContainer}>
                    <Ionicons
                      name="ios-time-outline"
                      color={"tomato"}
                      size={15}
                    />
                    <Text style={styles.timeAndDistanceText}>{item.time}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            )}
             />
            </View>
            <View style={styles.sortListContainer}>
            <TouchableOpacity
            style={sortStyle(activeSortItem === 'recent')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('recent')}
            >
            <Text style={styles.sortListItemText}>Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity
           style={sortStyle(activeSortItem === 'favorite')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('favorite')}
           >
            <Text style={styles.sortListItemText}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity
           style={sortStyle(activeSortItem === 'rating')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('rating')}
           >
            <Text style={styles.sortListItemText}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'popular')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('popular')}
           >
            <Text style={styles.sortListItemText}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'trenfing')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('trending')}
            >
            <Text style={styles.sortListItemText}>Trending</Text>
          </TouchableOpacity>
            </View>
           
          </ScrollView>
        </View>
        <ScrollView>
        <FlatList
            data={restaurants}
            renderItem={({item}:any)=>(
                <View style={{marginHorizontal:22}}>
                 <View style={styles.categoryContainer}>
             <View style={{flexDirection:"row"}}>
             <Image
               source={{uri:item.images.cover}}
                 style={styles.ctgimage}
                />
                <View>
                  <Text style={{color:"#000",fontWeight:"bold",fontSize:20}}>{item.name}</Text>
                <View style={{justifyContent:"center",gap:15}}>
                <View style={{flexDirection:"row",marginTop:40}}>
                <View> 
                  <Text>{item.location}</Text>
                  </View>
                  <View style={styles.rowAndCenter}>
                  <FontAwesome name="star" size={14} color={"#f4af30"} />
                  <Text style={styles.ratingText}>4</Text>
                  <Text style={styles.reviewsText}>({10})</Text>
                </View>
                </View>
                </View>
                </View>
             </View>
             <Ionicons
                name={'bookmark-outline'}
                color={Colors.LIGHT_YELLOW}
                size={24}
                style={styles.bookmark}
              //   onPress={() => (isBookmarked ? removeBookmark() : addBookmark())}
              />
             <View>
            
             </View>
            </View>
      
    </View>
            )}
            />
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE,
  },
  categoryItem:{
    margin:10,
  },
  categoryName:{
    fontSize:14,
    marginTop:5,
  },
  backgroundCurvedContainer: {
    backgroundColor: "#077f7a",
    height: 2015,
    position:"absolute",
    top: -1 * (2000 - 230),
    width:2000,
    borderRadius: 2000,
    alignSelf: 'center',
  },
  headerContainer: {
    justifyContent: 'space-evenly',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  locationText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: 'Poppins-Black',
  },
  selectedLocationText: {
    color: "#BF5F17",
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: 'Poppins-Black',
  },
  alertBadge: {
    borderRadius: 32,
    backgroundColor: "orange",
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    position: 'absolute',
    right: -2,
    top: -10,
  },
  alertBadgeText: {
    color: "#fff",
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: "Poppins-Bold",
  },
  searchContainer: {
    backgroundColor: "#fff",
    height: 45,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  prdcontainer:{
      flex: 1,
      justifyContent: 'center',
      backgroundColor:"#fff",
      borderRadius: 10,
      elevation: 3,
      marginBottom: 5,
      paddingBottom:10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevations: 5,

  },
  ctgimage:{
    width:120,
    height:120,
    marginRight:15
  },
  searchText: {
    color: Colors.DEFAULT_GREY,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: 'Poppins-Light',
    marginLeft: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap:40,
    marginHorizontal:20,
    
    
  },
  listContainer: {
    paddingVertical: 5,
    zIndex: -5,
  },
  horizontalListContainer: {
    marginTop: 30,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  listHeaderTitle: {
    color: "#000",
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: 'Poppins-Bold',
  },
  listHeaderSubtitle: {
    color: "orange",
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: 'Poppins-Bold',
  },
  posterStyle: {
    width: 1920 * 0.15,
    height: 1080 * 0.15,
    borderRadius: 10,
    margin: 5,
  },
  titleText: {
    marginLeft: 8,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  tagText: {
    marginLeft: 8,
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_GREY,
    marginBottom: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeAndDistanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: "#f2e4cd",
    borderRadius: 12,
    marginHorizontal: 3,
  },
  timeAndDistanceText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: "tomato",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: "gray",
  },
  reviewsText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  bookmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  sortListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor:"#fff",
    marginTop: 8,
    elevation: 1,

    zIndex: 9999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevations: 2,
    

  },
  sortListItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'yellow',
    height: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
  },
  categoryContainer:
    {flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginVertical:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
},
  sortListItemText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily:"Poppins-Light",
    fontWeight:"400"
  },
});

export default HomeScreen;
