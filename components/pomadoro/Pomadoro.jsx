import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';
import PomodoroBtns from './PomodoroBtns';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import * as Notifications from "expo-notifications"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { addSession } from '../../redux/sessions';
import { db } from '../../firebaseConfig';
import { doc ,updateDoc} from "firebase/firestore"; 
import { useDispatch,useSelector } from "react-redux"
Notifications.setNotificationHandler({
  handleNotification: async ()=>{
    return{
      shouldPlaySound:true,
      shouldSetBadge:true,
      shouldShowAlert:true
    }
  }
})

let isInitial= true

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(.1);
  const [isActive, setIsActive] = useState(false);
  const [isResting,setIsResting] = useState(false)
const [key,setKey]= useState(0)
const [tracker,setTracker] = useState({
  startTime:null,
  endTime:null,
})
const dispatch = useDispatch()
const sessions = useSelector(state => state.sessions.sessions)


async function addSessiontoDb(){
  const id = await AsyncStorage.getItem("id")
 
  
  const userRef = doc(db, "users",id);
  await updateDoc(userRef, {
    sessions  
  })
}



useEffect(()=>{
  if(isInitial){
    isInitial = false
    return  
  }
 addSessiontoDb()
},[sessions])
  
 


function notification(){
  Notifications.scheduleNotificationAsync({
    content:{
      title:"Time's Up!",
      body:"Take a quick break. You deserve it!",
      vibrate:true,
      sound:true
    },
    trigger:null
  })
}
function restNotification(){
  Notifications.scheduleNotificationAsync({
    content:{
      title:"Break's Over!",
      body:"Let's tackle the next task!",
      vibrate:true,
      sound:true
    },
    trigger:null
  })
}

function startBreak(){

  setIsResting(true)
  setKey(state => state + 1)
  setMinutes(5);
}



 

  const handleStartPause = () => {
    if (!isActive) {
      setTracker(state =>{
          return {
            ...state,
            startTime:new Date()
          }
        })
    } else if (isActive && tracker.startTime !== null) {
      setTracker(state =>{
        return {
          ...state,
          endTime:new Date()
        }
      })
     
    }
    setIsActive(!isActive);
  };
  

  const handleReset = () => {
    if(!isResting){
let endTime = tracker.endTime ? tracker.endTime : new Date()
const duration = Math.floor((endTime - tracker.startTime) / 1000);
 dispatch(addSession({startTime:tracker.startTime.toISOString().split('T')[0],endTime:endTime.toISOString().split('T')[0],duration,completed:isResting ? true : false}))
 
    }
    

    setKey(state => state + 1)
    setIsActive(false);
    setMinutes(.1);
    setTracker({
      startTime:null,
      endTime:null
    })
  };

  



  return (
    <View style={[tailwind`flex-1 justify-between items-center`,{backgroundColor:"#0f1117"}]}>
      <View>
        
      </View>
 <View>
 <CountdownCircleTimer
    isPlaying={isActive}
    duration={minutes * 60}
    colors={["#404661","#404661","#404661","#404661","#404661","#404661"]}
    colorsTime={[10, 5, 2, 0]}
    size={300}
    key={key}
    onComplete={() => {
     if(isResting){
      setIsResting(state => !state)
      restNotification()
      handleReset()
     }else{
      let endTime = new Date()
const duration = Math.floor((endTime - tracker.startTime) / 1000);

dispatch(addSession({startTime:tracker.startTime.toISOString(),endTime:endTime.toISOString(),duration,completed:true}))
notification()
      startBreak()
      
     }
      return { shouldRepeat: false  }
    }}
  >
    {({ remainingTime }) => {
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60

 // return ``

    return <Text style={{fontSize:80,color:"#eaf3fe"}}>{minutes < 10&&"0"}{minutes}:{seconds < 10&&"0"}{seconds}</Text>
    } }
  </CountdownCircleTimer>
 </View>
 

      <View style={tailwind`flex-row mb-4 w-1/1 justify-around`}>
<PomodoroBtns onPress={handleReset} name={"RESET"}/>
<PomodoroBtns onPress={handleStartPause} name={isActive ? 'PAUSE' : 'START'}/>
      </View>
    </View>
  );
};



export default PomodoroTimer;



/**
 * useEffect(() => {
  if (tracker.endTime !== null && tracker.startTime !== null) {
    const duration = Math.floor((tracker.endTime - tracker.startTime) / 1000); // Duration in seconds

    // Add your logic to format the duration as needed
    const formattedDuration = `${Math.floor(duration / 60)}m ${duration % 60}s`;

    const sessionData = {
      startTime: tracker.startTime.toISOString(),
      endTime: tracker.endTime.toISOString(),
      duration: formattedDuration,
    };

    // Store session data locally
 //   storeSessionData(sessionData);

    // Update total focused time and completed sessions
 //   updateStats(duration);
  }







  
}, [tracker.endTime]);



if(tracker.startTime !== null){
    let endTime = new Date()
    const duration = Math.floor((endTime - tracker.startTime) / 1000); // Duration in seconds

      // Add your logic to format the duration as needed
      const formattedDuration = `${Math.floor(duration / 60)}m ${duration % 60}s`;

      const sessionData = {
        startTime: tracker.startTime.toISOString(), // Store start time as a string
        endTime:endTime.toISOString(), // Store end time as a string
        duration: formattedDuration,
      };
      console.log(sessionData)
  }




const storeSessionData = async (sessionData) => {


  try {
    const existingSessions = await AsyncStorage.getItem('sessions');
    const sessions = existingSessions ? JSON.parse(existingSessions) : [];

    sessions.push(sessionData);

    await AsyncStorage.setItem('sessions', JSON.stringify(sessions));
  } catch (error) {
    console.error('Error storing session data:', error);
  }
};

const updateStats = async (duration) => {
  try {
    // Update daily, weekly, monthly stats
    const currentDate = new Date();
    const currentDay = currentDate.toISOString().split('T')[0];
    const currentWeek = getISOWeek(currentDate);
    const currentMonth = currentDate.toISOString().split('-').slice(0, 2).join('-');

    // Fetch existing stats
    const stats = await AsyncStorage.getItem('stats');
    const parsedStats = stats ? JSON.parse(stats) : {};

    // Update daily stats
    parsedStats[currentDay] = parsedStats[currentDay] || { focusTime: 0, completedSessions: 0 };
    parsedStats[currentDay].focusTime += duration;
    parsedStats[currentDay].completedSessions += 1;

    // Update weekly stats
    parsedStats[currentWeek] = parsedStats[currentWeek] || { focusTime: 0, completedSessions: 0 };
    parsedStats[currentWeek].focusTime += duration;
    parsedStats[currentWeek].completedSessions += 1;

    // Update monthly stats
    parsedStats[currentMonth] = parsedStats[currentMonth] || { focusTime: 0, completedSessions: 0 };
    parsedStats[currentMonth].focusTime += duration;
    parsedStats[currentMonth].completedSessions += 1;

    // Save updated stats
   
  } catch (error) {
    console.error('Error updating stats:', error);
  }
};

const getISOWeek = (date) => {
  const dt = new Date(date);
  dt.setHours(0, 0, 0, 0);
  dt.setDate(dt.getDate() + 4 - (dt.getDay() || 7));
  const yearStart = new Date(dt.getFullYear(), 0, 1);
  return Math.ceil(((dt - yearStart) / 86400000 + 1) / 7);
};

 */