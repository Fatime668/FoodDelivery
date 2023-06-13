import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww&w=1000&q=80'}}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.location}>New York, USA</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutMe}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac elit
          sed lacus pulvinar rutrum. In ultrices orci ac felis posuere, ac
          placerat tortor eleifend. Nulla facilisi. Aliquam a interdum velit.
        </Text>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsContainer}>
          <Text style={styles.interest}>Photography</Text>
          <Text style={styles.interest}>Travel</Text>
          <Text style={styles.interest}>Gaming</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop:50,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily:"Poppins-Bold"
  },
  location: {
    fontSize: 16,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    fontFamily:"Poppins-ExtraBold"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  aboutMe: {
    fontSize: 16,
    marginBottom: 16,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    fontFamily:"Poppins-Bold"
  },
  interest: {
    marginRight: 8,
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
    fontFamily:"Poppins-Bold",
    fontSize: 14,
  },
});

export default ProfileScreen;
