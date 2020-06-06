import React from 'react';
import Constants from 'expo-constants';
import MapView, {Marker} from 'react-native-maps';
import {SvgUri} from 'react-native-svg';
import {Feather as Icon} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';

const Points = () => {
  const navigation = useNavigation();
  function handleNavigation() {
    navigation.goBack();
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigation}>
          <Icon name="arrow-left" size={20} color="#34cb79"/>
        </TouchableOpacity>

        <Text style={styles.title}>Welcome.</Text>
        <Text style={styles.description}>Find in the map a point of collection.</Text>

        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={{latitude: -23.7104888, longitude: -46.5258909, latitudeDelta: 0.014, longitudeDelta: 0.014}}>
            <Marker coordinate={{latitude: -23.7104888, longitude: -46.5258909}}/>
          </MapView>
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 20}}>
          <TouchableOpacity style={styles.item}>
            <SvgUri width={42} height={42} uri="http://192.168.0.6:3333/uploads/lamps.svg" />
            <Text style={styles.itemTitle}>Lamps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <SvgUri width={42} height={42} uri="http://192.168.0.6:3333/uploads/lamps.svg" />
            <Text style={styles.itemTitle}>Lamps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <SvgUri width={42} height={42} uri="http://192.168.0.6:3333/uploads/lamps.svg" />
            <Text style={styles.itemTitle}>Lamps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <SvgUri width={42} height={42} uri="http://192.168.0.6:3333/uploads/lamps.svg" />
            <Text style={styles.itemTitle}>Lamps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <SvgUri width={42} height={42} uri="http://192.168.0.6:3333/uploads/lamps.svg" />
            <Text style={styles.itemTitle}>Lamps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <SvgUri width={42} height={42} uri="http://192.168.0.6:3333/uploads/lamps.svg" />
            <Text style={styles.itemTitle}>Lamps</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
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