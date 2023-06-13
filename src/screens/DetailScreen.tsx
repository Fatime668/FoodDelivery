import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetailScreen = ({route}:any) => {
    const { item } = route.params;
  return (
    <View style={styles.container}>
      
      <Image
        source={{uri:item.images.cover}}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>$20</Text>
        <Text style={styles.productDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac elit
          sed lacus pulvinar rutrum. In ultrices orci ac felis posuere, ac
          placerat tortor eleifend. Nulla facilisi. Aliquam a interdum velit.
        </Text>
        <View style={styles.buttonsContainer}>
          <View style={{borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    backgroundColor:"green",}}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    backgroundColor:"orange",

  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DetailScreen;
