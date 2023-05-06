import { useRef, useState, useEffect} from 'react'
import { Animated, Image, View, Text, StyleSheet, Dimensions } from 'react-native'

import cat1 from '../../assets/animations/1.gif'
import cat2 from '../../assets/animations/2.gif'
import cat3 from '../../assets/animations/3.gif'
import cat4 from '../../assets/animations/4.gif'
import cat5 from '../../assets/animations/5.gif'
import cat6 from '../../assets/animations/6.gif'
import cat7 from '../../assets/animations/7.gif'
import cat8 from '../../assets/animations/8.gif'

const catAnims = {
    1: cat1,
    2: cat2,
    3: cat3,
    4: cat4,
    5: cat5,
    6: cat6,
    7: cat7,
    8: cat8
}

export default Cat = ({showName, catName}) => {
    const [currentAnim, setCurrentAnim] = useState(Math.floor(Math.random() * 8) + 1)
    const newPos = useRef(new Animated.Value(0)).current
    const windowWidth = Dimensions.get('window').width
    const [flipped, setFlipped] = useState(1)
    const [lastAnim, setLastAnim] = useState(0)


    useEffect(() => {

        const myIntervalId = setInterval(async () => {
            
            const newAnim = Math.floor(Math.random() * 8) + 1
            setCurrentAnim(newAnim)
            if (newAnim == 4 || newAnim == 8) {
                const randomPos = Math.floor(Math.random() * (windowWidth * 0.4))
                if (randomPos < lastAnim) {
                    // console.log('moving backwards')
                    setFlipped(-1)
                } else {
                    // console.log('moving forward')
                    setFlipped(1)
                }
                setLastAnim(randomPos)
                // console.log('lastAnim: ' + lastAnim + ' and randomPos: ' + randomPos)

                Animated.timing(newPos, {
                    toValue: randomPos,
                    duration: 2990,
                    useNativeDriver: true
                }).start()
            }
            
        }, 3000)

        
        return () => clearInterval(myIntervalId)
    }, [lastAnim])


    return (
        <Animated.View style={{alignItems: 'center', transform: [{translateX: newPos}]}}>
            {showName ? <Text style={{marginBottom: -80, ...styles.stats}}>{catName}</Text> : null}
            
            <Animated.Image 
                style={{...styles.cat, transform: [{scaleX: flipped}]}}  
                source={catAnims[currentAnim]}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    cat: {
        width: 200,
        height: 200,
        marginTop: -10
    },
    stats: {
        opacity: 0.6,
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Retro-Gaming'
    }
  });