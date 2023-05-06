import {useState, useEffect, useRef} from 'react'
import { AppState, View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Audio } from 'expo-av'
import Messages from '../components/Messages'

export default Timer = ({setCat, cat, route, navigation}) => {
    const time = cat.currentTimer
    const [remainingTime, setRemainingTime] = useState(time * 60)
    const hours = Math.floor((remainingTime / 60) / 60).toLocaleString('en-US', {minimumIntegerDigits: 2})
    const minutes = Math.floor((remainingTime / 60) - (60 * Math.floor((remainingTime / 60) / 60))).toLocaleString('en-US', {minimumIntegerDigits: 2})
    const seconds = (remainingTime % 60).toLocaleString('en-US', {minimumIntegerDigits: 2})
    // const earned = Math.floor((time * 60 - remainingTime) / 18) / 100 //this is real
    const earned = Math.floor((time * 60 - remainingTime) / 18) //this is while testing
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

    if (AppState.currentState) {
        if (AppState.currentState == 'background') {
            navigation.navigate('home')
            Alert.alert('Timer was cancelled')
        }
    }

    const timerRef = useRef(remainingTime);

    const updateWallet = async (earned) => {
        try {
            const getWallet = await AsyncStorage.getItem('wallet')
            if (getWallet !== null) {
                // getWallet = Number(getWallet) + earned
                await AsyncStorage.setItem('wallet', (Number(getWallet) + earned + 0.01).toString())
            }

        } catch (e) {
            console.log('error: ' + e)
        }
    }

    const confirmCancel = () => {
        playSound()
        Alert.alert('Giving Up?', 'Are you sure you want to cancel. You will lose your progress and earned money so far.', [
            {
                text: 'Cancel',
                onPress: handleCancel
            },
            {
                text: "Keep Grindin'"
            }
        ])
    }

    const handleCancel = () => {
        // clearInterval(timerId);
        navigation.navigate('TimerSetup')
    }

    useEffect(() => {
      const timerId = setInterval(async () => {
        timerRef.current -= 1;
        // const lastEarned = Math.floor((time * 60 - timerRef.current) / 18) / 100 // this is real
        const lastEarned = Math.floor((time * 60 - timerRef.current) / 18) // this is for testing
        if (timerRef.current < 0) {
            await updateWallet(lastEarned)
            console.log(lastEarned)
            setCat({...cat, wallet: (cat.wallet + lastEarned)})
            clearInterval(timerId);
            navigation.navigate('home')
        } else {
          setRemainingTime(timerRef.current);
        }
      }, 100);
      return () => {
        clearInterval(timerId);
      };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.sky}>
                <View style={{alignItems: 'center', width: '100%'}} >
                    <Text style={styles.title}>{hours}:{minutes}:{seconds}</Text>
                    <Messages/>
                </View>
    
                
                
    
            
    
                <Image 
                    style={styles.cat}  
                    source={require('../../assets/animations/2.gif')}
                />
            </View>
            <View style={styles.ground} >
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.stats} >earned so far</Text>
                    <Text style={{...styles.stats, opacity: 0.7, paddingTop: '5%'}} >+${earned.toFixed(2)}</Text>
                </View>
                <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={confirmCancel} style={styles.button}>
                        <Text style={styles.text}>cancel</Text>
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
        paddingTop: '40%',
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
        fontSize: 48,
       
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