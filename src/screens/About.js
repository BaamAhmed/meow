import {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import {Audio} from 'expo-av'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Menu from '../components/Menu'
import Cat from '../components/Cat'
import Statistics from '../components/Statistics'
import Header from '../components/Header'


export default About = ({cat, navigation}) => {

    return (
        <View style={styles.container}>
        <View style={styles.sky}>
           

            <Header 
                navigation={navigation} 
                name={'about'}
                routes={['home', 'store', 'my cat']}
            />

            <ScrollView style={{height: '100%'}}>
                <Text style={styles.text}>I don’t expect a lot of people to ever see this page, so I’m just going to write whatever comes to mind, which in this case is Leo, the motivation behind this app.</Text>
                <Text style={styles.text}>During The Quarantine (summer of 2020), we got Leo. At the time, he was the tiniest and the most innocent kitten you could imagine. Being an ORANGE kitten, he was also obviously very stupid.</Text>
                <Text style={styles.text}>Anyways, since that time, he developed this habit of curling up on my desk wherever he saw fit. Sometimes that was on my book or iPad (which I was working on) or on my laptop (which I was also working on). At the time, it was annoying, but that is the one thing I miss most now.</Text>
                <Text style={styles.text}>You might’ve guessed by now, but this app is a cheap replacement of Leo on my desk. The app won’t purr and it won’t try to swat your pencil out of your hands, but I hope it can at least provide some of the companionship that Leo provided for me as I studied and grinded for that Academic Validation TM. </Text>
                <Text style={styles.text}>So yeah, here is to Leo, the orangest orange cat to ever exist.</Text>
                <Text style={styles.text}>~ Bassam Ahmed</Text>
                <Text style={styles.text}>P.S. He’s not dead or anything lol, we just had to give him up for adoption for personal reasons.</Text>
            </ScrollView>    
            <Cat showName={false} catName={cat.catName} />


        </View>
        <View style={styles.ground} >
           
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
        // alignItems: 'left',
        paddingHorizontal: '10%',
        paddingRight: '10%',
        paddingTop: '15%'
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
        fontFamily: 'Retro-Gaming',
        opacity: 0.8,
        marginBottom: 10
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

