import {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import {Audio} from 'expo-av'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Menu from '../components/Menu'
import Cat from '../components/Cat'
import Statistics from '../components/Statistics'
import Header from '../components/Header'


export default MyCat = ({cat, setCat, navigation}) => {
    const [sound, setSound] = useState()

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/sound_effects/treat_0.wav'))
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
 

    // updates the new food quantity and health in async store
    const updateStore = async (item, hlth) => {
        try {
            const getHealth = await AsyncStorage.getItem('health')
            if (getHealth !== null) {
                if (parseInt(getHealth) + hlth < 10) {
                    await AsyncStorage.setItem('health', (parseInt(getHealth) + hlth).toString())
                } else {
                    await AsyncStorage.setItem('health', '10')
                }
            }
            let label = item
            const getFood = await AsyncStorage.getItem(label)
            if (getFood !== null) {
                await AsyncStorage.setItem(label, (parseInt(getFood) - 1).toString())
            }
            const now = new Date
            await AsyncStorage.setItem('lastfed', now.toISOString())

        } catch (e) {
            console.log('error: ' + e)
        }
    }

    // handles the feeding action from the user, mutates asyncstore and global state
    // decreases the [item] count by 1, increases health by [hlth]
    const handleFeed = async (item, hlth) => {
        
        await updateStore(item, hlth)
        let newFood= {
            dry: cat.food.dry,
            wet: cat.food.wet,
            treat: cat.food.treat
        }
        newFood[item] -= 1
        let newHealth = cat.health + hlth
        if (newHealth > 10) {
            newHealth = 10;
        }
        setCat({...cat, health: newHealth, food: newFood })
    }

    return (
        <View style={styles.container}>
        <View style={styles.sky}>
            <View style={{ width: '100%'}}>

                <Header 
                    navigation={navigation} 
                    name={cat.catName}
                    routes={['home', 'store', 'about']}
                />
                
                <Text style={styles.stats}>FEED</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: '100%', marginBottom: 6}}>
                    <TouchableOpacity disabled={cat.food.dry == 0} onPress={() => {playSound(); handleFeed('dry', 1)}} 
                        style={cat.food.dry == 0 ? styles.button_disabled : styles.button} >
                        <Text style={cat.food.dry == 0 ? styles.text_disabled : styles.text} >DRY</Text>
                        <Text style={styles.stats} >x{cat.food.dry}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={cat.food.wet == 0} onPress={() => {playSound(); handleFeed('wet', 2)}} 
                        style={cat.food.wet == 0 ? styles.button_disabled : styles.button} >
                        <Text style={cat.food.wet == 0 ? styles.text_disabled : styles.text} >WET</Text>
                        <Text style={styles.stats} >x{cat.food.wet}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity disabled={cat.food.treat == 0} onPress={() => {playSound(); handleFeed('treat', 3)}} 
                style={cat.food.treat == 0 ? styles.button_disabled : styles.button} >
                    <Text style={cat.food.treat == 0 ? styles.text_disabled : styles.text} >TREAT!!!</Text>
                    <Text style={styles.stats} >x{cat.food.treat}</Text>
                </TouchableOpacity>
            </View>
        
            <Cat showName={true} catName={cat.catName} />
        </View>
        <View style={styles.ground} >
            <Statistics cat={cat} />
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
        height: '20%',
        padding: '10%',
        justifyContent: 'space-between'
    },
    sky: {
        // minHeight: '70%',
        // maxHeight: '60%',
        height: '80%',
        width: '100%',
        justifyContent: 'space-between',
        // alignItems: 'left',
        paddingHorizontal: '10%',
        paddingRight: '10%',
        paddingTop: '15%'
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
        backgroundColor: '#DE911D',
        paddingVertical: 20,
        alignItems: 'center',
        // width: '100%',
        flexGrow: 1,
        marginHorizontal: 3,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%'
    },
    button_disabled: {
        paddingVertical: 20,
        alignItems: 'center',
        // width: '100%',
        flexGrow: 1,
        marginHorizontal: 3,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        backgroundColor: '#E8B568'
    },
    text: {
        color: '#fff',
        fontFamily: 'Retro-Gaming'
    },
    text_disabled: {
        color: '#fff',
        opacity: 0.3,
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

