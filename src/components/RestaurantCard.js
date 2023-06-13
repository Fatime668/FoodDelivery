import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RestaurantCard = () => {
    
  return (
    <TouchableOpacity
    style={styles.container}
    activeOpacity={0.8}
    onPress={() => navigate(id)}>
    <Ionicons
      name={'bookmark-outline'}
      color={"yellow"}
      size={24}
      style={styles.bookmark}
    //   onPress={() => (isBookmarked ? removeBookmark() : addBookmark())}
    />
    <Image
      source={{uri: StaticImageService.getPoster(poster)}}
      style={styles.posterStyle}
    />
    <Text style={styles.titleText}>{name}</Text>
    <Text style={styles.tagText}>{tags?.join(' • ')}</Text>
    <View style={styles.footerContainer}>
      <View style={styles.rowAndCenter}>
        <FontAwesome name="star" size={14} color={Colors.DEFAULT_YELLOW} />
        <Text style={styles.ratingText}>4</Text>
        <Text style={styles.reviewsText}>({10})</Text>
      </View>
      <View style={styles.rowAndCenter}>
        <View style={styles.timeAndDistanceContainer}>
          <Ionicons
            name="location-outline"
            color={Colors.DEFAULT_YELLOW}
            size={15}
          />
          <Text style={styles.timeAndDistanceText}>{distance}</Text>
        </View>
        <View style={styles.timeAndDistanceContainer}>
          <Ionicons
            name="ios-time-outline"
            color={Colors.DEFAULT_YELLOW}
            size={15}
          />
          <Text style={styles.timeAndDistanceText}>{time}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
  )
}

export default RestaurantCard

const styles = StyleSheet.create({})