import React from 'react';
import {Feather as Icon} from '@expo/vector-icons';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, ImageBackground, View, Image, Text} from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  function handleNavigation() {
    navigation.navigate('Points');
  }
  return (
    <ImageBackground source={require('../../assets/home-background.png')} imageStyle={{width: 274, height: 368}} style={styles.container}>
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Your marketplace for waste collection</Text>
        <Text style={styles.description}>We help people to find points of collection faster than normal.</Text>
      </View>

      <View>
        <RectButton style={styles.button} onPress={handleNavigation}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="white" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Enter
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});

export default Home;