import {useState, useEffect, useRef} from 'react'
import {Animated, View, StyleSheet, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import * as Font from 'expo-font'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Cat from '../components/Cat'

const Onboarding = ({setOnboard, navigation}) => {
    const slideAnim = useRef(new Animated.Value(0)).current
    const cloudAnim = useRef(new Animated.Value(400)).current
    const cloudAnim2 = useRef(new Animated.Value(500)).current


    

    const [next, setNext] = useState(false)
    const [inputFocus, setInputFocus] = useState(true)
    const [name, setName] = useState('meow')
    const [fontsLoaded, setFontsLoaded] = useState(false)

    const handleClick = () => {
        // navigation.navigate('Profile')
        setNext(true)
        Animated.parallel(
            [
                Animated.timing(slideAnim, {
                    toValue: 130,
                    duration: 5000,
                    useNativeDriver: true
                }),
                Animated.timing(cloudAnim, {
                    toValue: 30,
                    duration: 5000,
                    useNativeDriver: true
                }),
                Animated.timing(cloudAnim2, {
                    toValue: 250,
                    duration: 5000,
                    useNativeDriver: true
                })
            ]
        ).start()
        
    }

    const storeData = async (catName) => {
        try {
            await AsyncStorage.setItem('name', catName)
            await AsyncStorage.setItem('wallet', '2000') // while testing only
            // await AsyncStorage.setItem('wallet', '2000')
            await AsyncStorage.setItem('age', '0')
            await AsyncStorage.setItem('health', '5')
            await AsyncStorage.setItem('dry', '0')
            await AsyncStorage.setItem('wet', '0')
            await AsyncStorage.setItem('treat', '0')
            const birthdate = new Date
            await AsyncStorage.setItem('birthdate', birthdate.toISOString())
            await AsyncStorage.setItem('lastfed', birthdate.toISOString())
        } catch (e) {
            console.log('error: ' + e)
        }
    }

    const storeOnboard = async () => {
        try {
            await AsyncStorage.setItem('onboarded', 'true')
        } catch (e) {
            console.log('error: ' + e)
        }
    }

    loadFonts = async () => {
        await Font.loadAsync({
            'Retro-Gaming': require('../../assets/fonts/Retro-Gaming.ttf')
        })
        setFontsLoaded(true)
    }

    useEffect(() => {
        loadFonts()   
    })

    handleSubmission = async () => {
        await storeOnboard()
        await storeData(name)
        setOnboard('true')
    }


    if (!fontsLoaded) {
        return null
    }
    

    return (
    <View style={styles.container}>
        <View style={styles.sky}>
            {next ? <View style={{paddingTop: '20%', alignItems: 'center', width: '100%'}}>
                <Text style={styles.text}>name your new pet:</Text>
                {/* <Text style={{...styles.title, paddingTop: 0}}>{name.length == 0 ? 'meow' : name}</Text> */}
                <TextInput
                    style={{...styles.title, paddingTop: 0}}
                    onChangeText = {setName}
                    value = {name}
                    autoFocus={true}
                    caretHidden={true}
                    underlineColorAndroid='transparent'
                />
            </View> : 
            <Text style={styles.title}>{name.length == 0 ? 'meow' : name}</Text> }

            <Animated.Image
                style={{
                    width: 200,
                    height: 100,
                    transform: [{translateX: cloudAnim}]
                }}
                source={require('../../assets/stills/cloud1.jpg')}

            />
            <Animated.Image
                style={{
                    width: 200,
                    height: 100,
                    transform: [{translateX: cloudAnim2}]
                }}
                source={require('../../assets/stills/cloud2.jpg')}

            />

            {inputFocus && next ? <Animated.Image 
                style={{
                    ...styles.cat,
                    
                    transform :[{translateX: slideAnim}]
                }}  
                source={require('../../assets/animations/4.gif')}
            /> : <Cat/>}
        </View>
        <View style={styles.ground} >
            <View style={next ? {display: 'none'}: {display: 'flex'}} >
                <TouchableOpacity onPress={handleClick} style={styles.button} >
                    <Text style={styles.text}>get started</Text>
                </TouchableOpacity>
            </View>
            <View style={!next ? {display: 'none'}: {display: 'flex'}} >
                {/* <Text>Enter your new pet's name:</Text>
                <TextInput
                    onFocus={() => setBottomMargin('20%')}
                    onEndEditing={() => setBottomMargin('0%')}
                    onChangeText = {setName}
                    value = {name}
                /> */}
                <TouchableOpacity onPress={handleSubmission} style={styles.button} >
                    <Text style={styles.text}>confirm</Text>
                </TouchableOpacity>
            </View>
        
        </View>
        
        
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
        // height: '100%',
      backgroundColor: '#01A1DF',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      textAlign: 'left',
      color: '#fff'
    },
    ground: {
        backgroundColor: '#222034',
        width: '100%',
        minHeight: '10%',
        flexGrow: 1,
        height: '30%',
        padding: '10%',
        justifyContent: 'flex-end'
    },
    sky: {
        // minHeight: '70%',
        // maxHeight: '60%',
        // height: '70%',
        flexGrow: 4,
        width: '100%',
        justifyContent: 'space-between',
        // alignItems: 'left'
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
        paddingTop: '30%',
        width: '100%',
        textAlign: 'center'
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
    }
  
  });

export default Onboarding
