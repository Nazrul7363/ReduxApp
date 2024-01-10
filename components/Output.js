import  { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const Output = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10')
      .then(response => {
        const formattedImages = response.data.map(item => ({
          id: item.id,
          url: item.url,
          title: item.title,
        }));
        setImages(formattedImages);
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

 
  
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Top 10 Images</Text>
      {images.map(item => (
        <View key={item.id} style={styles.imageContainer}>
          <Image source={{ uri: item.url }} style={styles.image} />
          <Text style={styles.imageTitle}>{item.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3FC0CE8E',
    padding: 16,
  },
  header: {
    color: '#040408F2',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  imageTitle: {
    marginTop: 8,
    color: '#040408F2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Output;
