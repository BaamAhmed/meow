import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Fontisto } from '@expo/vector-icons';

export default Statistics = ({cat}) => {
    const health = cat.health
    const wallet = cat.wallet
    const now = new Date()
    const age = Math.floor((now.getTime() - Date.parse(cat.birthdate)) / 2629746000) // real
    // const age = Math.floor((now.getTime() - Date.parse(cat.birthdate)) / 60000) // for quick testing
    
    // console.log(typeof(birthdate))
    // generate the health bar
    let healthbar = []
    let grayedhealthbar = []
    let color;
    for (let i = 0; i < health; i++) {
        healthbar[i] = i
    }
    for (let i = 0; i < 10 - health; i++) {
        grayedhealthbar[i] = i
    }
    if (health > 7) {
        color= '#82BA67'
    } else if (health > 4) {
        color= '#BAB767'
    } else {
        color= '#BA7667'
    }
    

    return (
        <View>
            <Text style={styles.stats} >wallet: ${wallet.toFixed(2)}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...styles.stats}} >health: </Text>
                <View style={{flexDirection: 'row'}}>
                    {healthbar.map((item) => {
                        return (
                            <View key={item} style={{marginRight: 3}}>
                                <Fontisto name="rectangle" size={16} color={color} />
                            </View>
                        )
                    })}
                    {grayedhealthbar.map((item) => {
                        return (
                            <View key={item} style={{marginRight: 3}}>
                                <Fontisto name="rectangle" size={16} color="#383646" />
                            </View>
                        )
                    })}
                </View>

            </View>
            
            <Text style={styles.stats} >age: {age} months</Text>
            
        </View>
    )
}



const styles = StyleSheet.create({
    stats: {
        opacity: 0.6,
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Retro-Gaming'
    }
  });
