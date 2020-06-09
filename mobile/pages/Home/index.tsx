import React, {useState, useEffect} from 'react';
import {Feather as Icon} from '@expo/vector-icons';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import axios from 'axios';
import {StyleSheet, ImageBackground, View, Image, Text} from 'react-native';

interface IBGEUFResponse {
	sigla: string;
	nome: string;
}

interface IBGECityResponse {
	nome: string;
}

const Home = () => {
  const navigation = useNavigation();
  const [citiesList, setCitiesList] = useState<Item[]>([]);
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedUf, setSelectedUf] = useState('0');
  const [ufList, setUfList] = useState<Item[]>([]);
    
  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const yeah:Item[] = response.data.map(data => {
        return {label: `(${data.sigla}) ${data.nome}`, value: data.sigla}
      });
      setUfList(yeah);
    });
  }, []);

  useEffect(() => {
		if (selectedUf === '0') {
			return;
		}
		axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
			const dude:Item[] = response.data.map(data => {
        return {label: data.nome, value: data.nome}
      });
      setCitiesList(dude);
		});
	}, [selectedUf]);

  function handleNavigation() {
    navigation.navigate('Points', {
      state: selectedUf,
      city: selectedCity,
    });
  }
  return (
    <ImageBackground source={require('../../assets/home-background.png')} imageStyle={{width: 274, height: 368}} style={styles.container}>
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Your marketplace for waste collection</Text>
        <Text style={styles.description}>We help people to find points of collection faster than normal.</Text>
      </View>

      <View>
        <RNPickerSelect useNativeAndroidPickerStyle={false} style={{inputIOS: styles.input, inputAndroid: styles.input}} onValueChange={(value) => setSelectedUf(value)} items={ufList} />
        <RNPickerSelect useNativeAndroidPickerStyle={false} style={{inputIOS: styles.input, inputAndroid: styles.input}} onValueChange={(value) => setSelectedCity(value)} items={citiesList} />
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