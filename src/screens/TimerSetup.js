import {useState, useEffect} from 'react'
import {View, StyleSheet, Text, Image, Button, TouchableOpacity, FlatList} from 'react-native'
import * as Font from 'expo-font'
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

import Cat from '../components/Cat';

export default function TimerSetup({cat, setCat, route, navigation}) {

    const [fontsLoaded, setFontsLoaded] = useState(false)
    const [time, setTime] = useState(0)
    const [sound, setSound] = useState()

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/sound_effects/menu_0.wav'))
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
    })

    const handleClick = () => {
        playSound()
        setCat({...cat, currentTimer: time})
        navigation.navigate('Timer')
    }

    if (!fontsLoaded) {
        return null
    }

    

    return (
    <View style={styles.container}>
        <View style={styles.sky}>
            <View style={{alignItems: 'center', width: '100%'}} >
                <Text style={styles.text}>choose your duration</Text>
                <Text style={styles.title}>{(Math.floor(time / 60)).toLocaleString('en-US', {minimumIntegerDigits: 2})}:{(time - 60 * Math.floor(time / 60)).toLocaleString('en-US', {minimumIntegerDigits: 2})}</Text>
            </View>

            

                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    step={1}
                    maximumValue={10}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    value = {time}
                    onValueChange={setTime}
                />
            

        

            <Cat showName={false} catName={''} />
        </View>
        <View style={styles.ground} >
            <View style={{alignItems: 'center'}}>
                <Text style={styles.stats} >you will earn:</Text>
                <Text style={{...styles.stats, opacity: 0.7, paddingTop: '5%'}} >+${(time / 30).toFixed(2)}</Text>
            </View>
            <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => {navigation.navigate('home'); playSound()}} style={styles.button}>
                    <Text style={styles.text}>cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClick} style={styles.button}>
                    <Text style={styles.text}>start</Text>
                </TouchableOpacity>
            </View>
            
            
        
        </View>
        
    </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2C2C2C',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      textAlign: 'left',
      color: '#fff',
      fontFamily: 'Retro-Gaming'
    },
    ground: {
        backgroundColor: '#1F1F1F',
        width: '100%',
        minHeight: '20%',
        height: '30%',
        padding: '10%',
        justifyContent: 'space-between'
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sky: {
        // minHeight: '70%',
        // maxHeight: '60%',
        height: '70%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '20%',
        paddingHorizontal: '10%'
    },
    cat: {
        width: 200,
        height: 200,
        marginTop: -10
    },
    title: {
        fontFamily: 'Retro-Gaming',
        color: '#fff',
        fontSize: 50,
       
    },
    button: {
        backgroundColor: '#131313',
        paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 15,
        flexGrow: 1,
        margin: 10
    },
    text: {
        color: '#fff',
        fontFamily: 'Retro-Gaming',
        
    },
    stats: {
        opacity: 0.6,
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Retro-Gaming'
    }
  
  });
