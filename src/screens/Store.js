import {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native'
import {Audio} from 'expo-av'

import Menu from '../components/Menu'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Cat from '../components/Cat'
import Header from '../components/Header'

export default Store = ({cat, setCat, navigation}) => {
    const [sound, setSound] = useState()

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/sound_effects/buy_0.wav'))
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
    

    const storeOptions = [
        {
            name: 'dry cat food',
            price: 5.50,
            desc: 'Your everyday basic, dry cat food.\nHealth boost: +1'
        },
        {
            name: 'wet cat food',
            price: 6.50,
            desc: 'The fancier option. Tuna flavored.\nHealth boost: +2'
        },
        {
            name: 'treat',
            price: 8.50,
            desc: 'The best of the best. A once-in-a-while treat.\nHealth boost: +3'
        },
    ]

    const updateStore = async (item, price) => {
        try {
            const getWallet = await AsyncStorage.getItem('wallet')
            if (getWallet !== null) {
                await AsyncStorage.setItem('wallet', (Number(getWallet) - price).toString())
            }
            let label = item
            const getFood = await AsyncStorage.getItem(label)
            if (getFood !== null) {
                await AsyncStorage.setItem(label, (parseInt(getFood) + 1).toString())
            }

        } catch (e) {
            console.log('error: ' + e)
        }
    }


    const handlePurchase = async (item, price) => {
        // const currItem = cat.food[item]
        item = item.split(' ')[0]
        await updateStore(item, price)
        let newFood= {
            dry: cat.food.dry,
            wet: cat.food.wet,
            treat: cat.food.treat
        }
        newFood[item] += 1
        setCat({...cat, wallet: cat.wallet - price, food: newFood })
    }

    return (
        <View style={styles.container}>
            <View style={styles.sky}>
                <Header 
                    navigation={navigation} 
                    name={'store'}
                    routes={['home', 'my cat', 'about']}
                />
                <Text style={styles.text} >You have: ${cat.wallet.toFixed(2)}</Text>


                <View style={{width: '100%', flexGrow: 1, paddingTop: 20, marginBottom: -300}}>
                    <FlatList
                        // style={{paddingBottom: 300}}
                        key={Math.floor(Math.random() * 1000)}
                        data={storeOptions}
                        renderItem={({item}) => (
                            <View style={styles.storeBlock} >
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={styles.optionLabel}>{item.name}</Text>
                                    <Text style={styles.optionLabel}>${item.price.toFixed(2)}</Text>
                                </View>
                                <Text style={{...styles.text, marginBottom: 10}}>{item.desc}</Text>
                                <TouchableOpacity 
                                    disabled={cat.wallet < item.price} 
                                    onPress={() => {
                                        playSound()
                                        handlePurchase(item.name, item.price)
                                    }} 
                                    style={cat.wallet < item.price ? styles.disabled : styles.button}
                                >
                                    <Text style={cat.wallet < item.price ? styles.disabled_text : styles.text}>buy</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                </View>

                <Cat showName={false} catName={''} />
                
                
                
            </View>
            <View style={styles.ground}>
                <Text>he</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4FF0C9',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      textAlign: 'left',
      color: '#fff',
      fontFamily: 'Retro-Gaming'
    },
    ground: {
        backgroundColor: '#222034',
        width: '100%',
        minHeight: '5%',
        height: '5%',
        padding: '10%',
        justifyContent: 'space-between'
    },
    sky: {
        // minHeight: '70%',
        // maxHeight: '60%',
        height: '95%',
        width: '100%',
        justifyContent: 'space-between',
        // alignItems: 'flex-start',
        paddingHorizontal: '10%',
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
        backgroundColor: '#CF651D',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 15
    },
    disabled: {
        backgroundColor: '#8B786B',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 15
    },
    text: {
        color: '#fff',
        fontFamily: 'Retro-Gaming',
        opacity: 1
    },
    disabled_text: {
        color: '#fff',
        fontFamily: 'Retro-Gaming',
        opacity: 0.3
    },
    storeBlock: {
        backgroundColor: '#222034',
        borderRadius: 15,
        padding: 13,
        marginBottom: 15,
        width: '100%'
    },
    optionLabel: {
        color: '#fff',
        fontFamily: 'Retro-Gaming',
        fontSize: 20,
        marginBottom: 5
    }
  
  });