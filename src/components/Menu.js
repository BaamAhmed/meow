import {useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native'
import { Audio } from 'expo-av'


export default Menu = ({menuOpen, navigation, routes}) => {
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


    return (
        <View>

            {menuOpen ?
            <View style={{marginTop: '3%'}}>
                
                {routes.map(item => {
                    return (
                        <TouchableOpacity onPress={() => {
                            playSound()
                            navigation.navigate(item)}} style={styles.menuItem}>
                            <Image source={require('../../assets/icons/arrow.png')} />
                            <Text style={styles.menuLabel}> {item} </Text>
                        </TouchableOpacity>
                    )
                })}

            </View> : null}
        </View>
    )
}



const styles = StyleSheet.create({
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
