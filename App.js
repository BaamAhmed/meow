import {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage'

import useAuth from './src/hooks/useAuth'
import CatContext from './src/context/catContext'

import Onboarding from './src/screens/Onboarding'
import Home from './src/screens/Home'
import TimerSetup from './src/screens/TimerSetup'
import Timer from './src/screens/Timer'
import Store from './src/screens/Store'
import MyCat from './src/screens/MyCat';
import About from './src/screens/About';


const LoggedIn = createNativeStackNavigator()
const LoggedOut = createNativeStackNavigator()
const Root = createNativeStackNavigator()
// const Tab = createBottomTabNavigator()

const options = {
  backgroundColor: 'blue'
}

const emptyCat = {
  catName: '',
    age: 0,
    health: 'loading...',
    wallet: 0,
    food: {
      dry: 0,
      wet: 0,
      treat: 0
    },
    birthdate: null,
    lastFed: null
}


const LoggedInFlow = ({navigation, setOnboard}) => {
  const [cat, setCat] = useState(emptyCat)

  useEffect(() => {
    async function getOnboarded () {
      try {
        const catName = await AsyncStorage.getItem('name')
        const catAge = await AsyncStorage.getItem('age')
        let catHealth = await AsyncStorage.getItem('health')
        const catWallet = await AsyncStorage.getItem('wallet')
        const catDry = await AsyncStorage.getItem('dry')
        const catWet = await AsyncStorage.getItem('wet')
        const catTreat = await AsyncStorage.getItem('treat')
        const birthdate = await AsyncStorage.getItem('birthdate')
        const lastFed = await AsyncStorage.getItem('lastfed')


        // 1 day = 86400000 ms
        // 1 min = 60000 ms
        const now = new Date
        const difference = now.getTime() - Date.parse(lastFed)
        if (difference > 86400000) {
            await AsyncStorage.setItem('health', (catHealth - Math.floor(difference / 86400000)).toString())
            catHealth -= Math.floor(difference / 86400000)
            await AsyncStorage.setItem('lastfed', now.toISOString())
        }
        if (catHealth <= 0) {
          Alert.alert('Rest In Peace', `Here is to ${catName}, the kittiest cat to ever live. May he/she sleep peacefully ever after.`, [
            {
              text: 'New Cat',
              onPress: async () => {
                clearAll()
                await AsyncStorage.setItem('onboarded', 'false')
                setOnboard(false)

              }
            }
          ])
        } 
        setCat({
          catName: catName,
          age: parseInt(catAge),
          health: parseInt(catHealth),
          wallet: Number(catWallet),
          currentTimer: 0,
          birthdate: birthdate,
          food: {
            dry: parseInt(catDry),
            wet: parseInt(catWet),
            treat: parseInt(catTreat)
          }
        })
      } catch (e) {
        console.log('error: ' + e)
      }
    }
    getOnboarded()
  }, [])

  return (
  <CatContext.Provider value={{cat, setCat}}>
    <LoggedIn.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <LoggedIn.Screen name='home'>
        {() => <Home cat={cat} setCat={setCat} navigation={navigation}/> }
      </LoggedIn.Screen>
      <LoggedIn.Screen name='TimerSetup'>
        {() => <TimerSetup cat={cat} setCat={setCat} navigation={navigation}/>}
      </LoggedIn.Screen>
      <LoggedIn.Screen name='Timer'>
        {() => <Timer cat={cat} setCat={setCat} navigation={navigation} />}
      </LoggedIn.Screen>
      <LoggedIn.Screen name='store'>
        {() => <Store cat={cat} setCat={setCat} navigation={navigation}/>}
      </LoggedIn.Screen>
      <LoggedIn.Screen name='my cat'>
        {() => <MyCat cat={cat} setCat={setCat} navigation={navigation}/>}
      </LoggedIn.Screen>
      <LoggedIn.Screen name='about'>
        {() => <About cat={cat} navigation={navigation}/>}
      </LoggedIn.Screen>
    
    </LoggedIn.Navigator>
  </CatContext.Provider>
  )
}


clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    console.log('error occurred while clearing AsyncStorage: ' + e)
  }

  console.log('Done.')
}

export default function App() {
  const user = useAuth()
  // clearAll()

  const [onboard, setOnboard] = useState('false')
  

  useEffect(() => {
    async function getOnboarded () {
      try {
        const val = await AsyncStorage.getItem('onboarded')
        if (val !== 'false') {
          setOnboard(val)
        }
      } catch (e) {
        console.log('error: ' + e)
      }
    }
    getOnboarded()
  }, [])

  return (
    <NavigationContainer>
      
      <Root.Navigator
        screenOptions={{ headerShown: false}}
      >
          {onboard == 'true' ? 
          <Root.Screen name='LoggedIn'>
            {(props) => <LoggedInFlow setOnboard={setOnboard} {...props} />}
          </Root.Screen> :
          <Root.Screen name='Onboarding'> 
            {() => <Onboarding setOnboard={setOnboard}/>}
          </Root.Screen>
          }
      </Root.Navigator>
      
     
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    textAlign: 'left',
    paddingHorizontal: '5%',
    paddingVertical: '12%',
    backgroundColor: '#1a1a1a',
    color: '#fff'
  },
  listItem: {
    paddingLeft: '10%',
    color: '#fff'
  },
  para: {
    color: 'white'
  },
  button: {
    padding: '3%',
    backgroundColor: '#58bf74',
    borderRadius: '10%',
    color: 'white'
  }

});
