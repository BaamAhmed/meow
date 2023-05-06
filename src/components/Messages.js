import { useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'

const msgs = [
    "You're doing great. Keep going!",
    "One step at a time, you got this.",
    "Don't give up, you're almost there.",
    "Keep hustling, you got this!",
    "Keep pushing, you're making progress.",
    "You're capable of amazing things, keep going.",
    "Lesgetitttttttt.",
    "GRIND DONT STOP.",
    "Focus.",
    "Trust yourself."
  ];
  

export default Messages = () => {
    const [msg, setMsg] = useState(Math.floor(Math.random() * 10) + 1)


    useEffect(() => {
        const intervalId = setInterval(() => {
            setMsg(Math.floor(Math.random() * 10))
        }, 15000)
        
        return () => clearInterval(intervalId)
    }, [])

    return (
        <Text style={styles.text}>{msgs[msg]}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        opacity: 0.7,
        fontFamily: 'Retro-Gaming',
        textAlign: 'center'
    }
})