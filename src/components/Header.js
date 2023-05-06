import {useState, useEffect} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {Audio} from 'expo-av'

import Menu from './Menu'


export default Header = ({navigation, name, routes}) => {
    const [menuOpen, setMenuOpen] = useState(false)
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

    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{name}</Text>
                <View >
                    {menuOpen ? 
                    <TouchableOpacity onPress={() => {
                        playSound()
                        setMenuOpen(false)}}>
                        <Image  source={require('../../assets/icons/cross.png')} ></Image> 
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => {
                        playSound()
                        setMenuOpen(true)} }>
                        <Image  source={require('../../assets/icons/burger.png')} ></Image> 
                    </TouchableOpacity>}
                    
                </View>
            </View>
            
            <Menu navigation={navigation} menuOpen={menuOpen} routes={routes} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Retro-Gaming',
        color: '#fff',
        fontSize: 50,
    },
    headerContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%', 
        alignItems: 'center'
    }

})