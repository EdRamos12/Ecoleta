import React, {useEffect, useState} from 'react';
import Constants from 'expo-constants';
import MapView, {Marker} from 'react-native-maps';
import {SvgUri} from 'react-native-svg';
import {Feather as Icon} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../services/api' ;
import * as Location from 'expo-location';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert} from 'react-native';

interface Item {
  id: number,
  title: string,
  image_url: string,
}

interface Point {
  id: number,
  name: string,
  image: string,
  latitude: number,
  longitude: number;
}

interface Params {
  state: string,
  city: string,
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<Number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadPosition() {
      const {status} = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Something went wrong.', 'We need your permission to get a location!');
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      setInitialPosition([
        location.coords.latitude,
        location.coords.longitude
      ]);
    }

    api.get('items').then(response => {
      setItems(response.data);
    });

    loadPosition();
  }, []);

  useEffect(() => {
    api.get('points', {
      params: {
        city: routeParams.city,
        state: routeParams.state,
        items: selectedItems
      }
    }).then(response => {
      setPoints(response.data);
    });
  }, [selectedItems])

  function handleSelectItem(id: number) {
    if (selectedItems.findIndex(item => item === id) >= 0) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([ ...selectedItems, id ]);
    }
  }

  function handleNavigation() {
    navigation.goBack();
  }

  function handleNavigateDetail(id: number) {
    navigation.navigate('Detail', { point_id: id });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigation}>
          <Icon name="arrow-left" size={20} color="#34cb79"/>
        </TouchableOpacity>

        <Text style={styles.title}>Welcome.</Text>
        <Text style={styles.description}>Find in the map a point of collection.</Text>

        <View style={styles.mapContainer}>
          { initialPosition[0] !== 0 && (
            <MapView style={styles.map} loadingEnabled={initialPosition[0] === 0} initialRegion={{latitude: initialPosition[0], longitude: initialPosition[1], latitudeDelta: 0.014, longitudeDelta: 0.014}}>
              {points.map(point => (
                <Marker key={String(point.id)} style={styles.mapMarker} coordinate={{latitude: point.latitude, longitude: point.longitude}} onPress={() => handleNavigateDetail(point.id)}>
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{uri: point.image}} />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 20}}>
          {items.map(item => (
            <TouchableOpacity key={String(item.id)} style={[styles.item, selectedItems.includes(item.id) ? styles.selectedItem : {}]} activeOpacity={.6} onPress={() => handleSelectItem(item.id)}>
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;