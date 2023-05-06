import {useState, useEffect, useRef} from 'react'
import {Animated, View, StyleSheet, Text, Image, Button, TouchableOpacity, FlatList, Dimensions} from 'react-native'
import * as Font from 'expo-font'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Audio } from 'expo-av'
import Menu from '../components/Menu'

import { Fontisto } from '@expo/vector-icons';

import Cat from '../components/Cat'
import Statistics from '../components/Statistics'
import Header from '../components/Header'

import useGetProducts from '../hooks/getProducts'

export default function Home({cat, setCat, navigation}) {

    const [fontsLoaded, setFontsLoaded] = useState(false)
    const [sound, setSound] = useState()

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/sound_effects/menu_1.wav'))
        setSound(sound)
        console.log('sound playing')

        await sound.playAsync()
    }

    useEffect(() => {

        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
                }
            : undefined;
        
    }, [sound])


    loadFonts = async () => {
        await Font.loadAsync({
            'Retro-Gaming': require('../../assets/fonts/Retro-Gaming.ttf')
        })
        setFontsLoaded(true)
    }


    useEffect(() => {
        loadFonts()   
    }, [])

    if (!fontsLoaded) {
        return null
    }

    // console.log(cat)
    

    

    return (
    
    
    <View style={styles.container}>
        <View style={styles.sky}>
      
            <Header 
                navigation={navigation} 
                name={'home'} 
                routes={['store', 'my cat', 'about']}
            />
        
        
            <Cat showName={true} catName={cat.catName}/>

        </View>
        <View style={styles.ground} >
           
            <Statistics cat={cat} />
            
            <TouchableOpacity onPress={() => {playSound(); navigation.navigate('TimerSetup')}} style={styles.button} >
                <Text style={styles.text}>start focusing</Text>
            </TouchableOpacity>
            
        
        </View>
        
    </View>
    
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0B04F',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      textAlign: 'left',
      color: '#fff',
      fontFamily: 'Retro-Gaming'
    },
    ground: {
        backgroundColor: '#222034',
        width: '100%',
        minHeight: '20%',
        height: '30%',
        padding: '10%',
        justifyContent: 'space-between'
    },
    sky: {
        // minHeight: '70%',
        // maxHeight: '60%',
        height: '70%',
        width: '100%',
        justifyContent: 'space-between',
        // alignItems: 'left',
        paddingHorizontal: '10%',
        paddingTop: '15%'
    },
    title: {
        fontFamily: 'Retro-Gaming',
        color: '#fff',
        fontSize: 50,

       
    },
    button: {
        backgroundColor: '#141131',
        paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 15
    },
    text: {
        color: '#fff',
        fontFamily: 'Retro-Gaming'
    },
    stats: {
        opacity: 0.6,
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Retro-Gaming'
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 5
    },  
    menuLabel: {
        fontFamily: 'Retro-Gaming',
        color: '#fff',
        fontSize: 25,
        paddingLeft: 10
    }
  
  });
