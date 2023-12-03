import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Pomadoro from '../pomadoro/Pomadoro';
import {Ionicons} from "@expo/vector-icons"
import { collection, addDoc ,doc, getDoc,setDoc} from "firebase/firestore"; 
import { db } from '../../firebaseConfig';
import TaskScreen from '../Tasks/TaskScreen';
import TrackerScreen from '../Tracker/TrackerScreen';
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useSelector,useDispatch} from "react-redux"
import { setTasks } from '../../redux/tasks';
import { setSessions } from '../../redux/sessions';
const RootContainer = () => {
    const Tab = createBottomTabNavigator()

const idk = useSelector(state => state.tasks)

const dispatch = useDispatch()
 
//console.log(idk)
useEffect(()=>{
  async function config(){
    const id = await AsyncStorage.getItem("id")
  if(!id){
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const userId = `${timestamp}-${random}`;
   const id = JSON.stringify(userId)
  AsyncStorage.setItem("id",id)
  try {
    const userRef = collection(db, "users");
  
    await setDoc(doc(userRef, id), {
      id,
      tasks:[],
      sessions:[]
    });
    console.log("Document written with ID: ", userRef.id);

 
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  }else{
    const docRef = doc(db, "users", id);
const docSnap = await getDoc(docRef);

    dispatch(setTasks(docSnap.data().tasks))
     dispatch(setSessions(docSnap.data().sessions))
  }
  }  
 
   //AsyncStorage.clear()
  config()     
},[])


 
  return ( 
  <NavigationContainer>
<Tab.Navigator screenOptions={{
  tabBarStyle:{
    backgroundColor:"#404661"
    
  },
headerStyle:{
    backgroundColor:"#404661"
},
headerTintColor:"#eaf3fe",
tabBarActiveTintColor:"#eaf3fe",
tabBarInactiveTintColor:"#0f1117",

}}>
     <Tab.Screen name='Tracker' options={{
        tabBarIcon:({size,color})=>{return <Ionicons size={size} color={color} name='analytics-outline'/>}
    }} component={TrackerScreen}/>
    <Tab.Screen name='Tasks' options={{
        tabBarIcon:({size,color})=>{return <Ionicons size={size} color={color} name='create-outline'/>}
    }} component={TaskScreen}/>
    <Tab.Screen name='Pomadoro' options={{
        tabBarIcon:({size,color})=>{return <Ionicons size={size} color={color} name='alarm-outline'/>}
    }} component={Pomadoro}/>
   
</Tab.Navigator>
  </NavigationContainer>
  )
}

export default RootContainer