import React from 'react';
import { View, Text, TouchableOpacity,Dimensions } from 'react-native';
import tailwind from 'twrnc';
import Divider from './Divider';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const Summary = () => {
    const {width,height} = Dimensions.get("window")
const sessions = useSelector(state => state.sessions.sessions)
const [dailyStats,setDailyStats] = useState({
  sessionsCompleted:0,
  timeFocused:0
})
const [monthlyStats,setMonthlyStats] = useState({
  sessionsCompleted:0,
  timeFocused:0
})
const [weeklyStats,setWeeklyStats] = useState({
  sessionsCompleted:0,
  timeFocused:0
})

const getISOWeek = (date) => {
  const dt = new Date(date);
  dt.setHours(0, 0, 0, 0);
  dt.setDate(dt.getDate() + 4 - (dt.getDay() || 7));
  const yearStart = new Date(dt.getFullYear(), 0, 1);
  return Math.ceil(((dt - yearStart) / 86400000 + 1) / 7);
};



useEffect(()=>{
  setDailyStats({
    sessionsCompleted:0,
    timeFocused:0
  })
  setWeeklyStats({
    sessionsCompleted:0,
    timeFocused:0
  })
  setMonthlyStats({
    sessionsCompleted:0,
    timeFocused:0
  })
  const currentDate = new Date()
  
const currentDay = currentDate.toISOString().split('T')[0];
const currentWeek = getISOWeek(currentDate);
const currentMonth = currentDate.toISOString().split('-').slice(0, 2).join('-');

 


for(let i = 0;i < sessions.length; i++){
  if(sessions[i].completed === true && sessions[i].endTime.split('T')[0] === currentDay) {
  setDailyStats(state =>{
   return  {
    ...state,
    sessionsCompleted:state.sessionsCompleted + 1
  }
  })
  }
  if(sessions[i].duration > 0 && sessions[i].endTime.split('T')[0] === currentDay){ 
    setDailyStats(state =>{
      return  {
       ...state, 
       timeFocused: state.timeFocused + sessions[i].duration
     }
     })
  }
if(sessions[i].completed === true && getISOWeek(sessions[i].endTime) === currentWeek){
setWeeklyStats(state =>{
  return  {
   ...state,
   sessionsCompleted:state.sessionsCompleted + 1
 }
 })
}
if(sessions[i].duration > 0 && getISOWeek(sessions[i].endTime) === currentWeek){ 
 
  setWeeklyStats(state =>{
    return  {
     ...state, 
     timeFocused: state.timeFocused + sessions[i].duration
   }
   })
}
if(sessions[i].completed === true && sessions[i].endTime.split('-').slice(0, 2).join('-') === currentMonth){
setMonthlyStats(state =>{
  return  {
   ...state,
   sessionsCompleted:state.sessionsCompleted + 1
 }
 })
}
if(sessions[i].duration > 0 && sessions[i].endTime.split('-').slice(0, 2).join('-') === currentMonth){ 
  
  setMonthlyStats(state =>{
    return  {
     ...state, 
     timeFocused: state.timeFocused + sessions[i].duration
   }
   })
}




  }

return


},[sessions])

  return (
    <View>
        <View style={tailwind`my-4`}>
            <Text style={[tailwind`font-bold text-lg mb-2 `,{color:"#eaf3fe"}]}>Summary</Text>
      <View style={[tailwind` rounded-md  justify-center items-center flex-row`,{backgroundColor:"#404661",width:width *.9,height:height*.3}]}>
<View>
    <Text style={[tailwind`font-bold text-lg text-center`,{color:"#eaf3fe"}]}>Today</Text>
    <Text style={tailwind`mt-2 mb-1 text-center`}>{dailyStats.timeFocused / 60} min</Text>
    <Text style={[tailwind`mb-2 mt-1 text-sm text-center`,{color:"#eaf3fe"}]}>Focused Time</Text>
    <Text style={tailwind`text-center mb-1`}>{dailyStats.sessionsCompleted} sessions</Text>
    <Text style={[tailwind`text-center mt-1 text-sm`,{color:"#eaf3fe"}]}>Finished</Text>
</View>
<Divider/>
<View>
    <Text style={[tailwind`font-bold text-lg text-center`,{color:"#eaf3fe"}]}>This Week</Text>
    <Text style={tailwind`mt-2 mb-1 text-center`}>{weeklyStats.timeFocused / 60} min</Text>
    <Text style={[tailwind`mb-2 mt-1 text-sm text-center`,{color:"#eaf3fe"}]}>Focused Time</Text>
    <Text style={tailwind`text-center mb-1`}>{weeklyStats.sessionsCompleted} sessions</Text>
    <Text style={[tailwind`text-center mt-1 text-sm`,{color:"#eaf3fe"}]}>Finished</Text>
</View>
<Divider/>
<View>
    <Text style={[tailwind`font-bold text-lg text-center`,{color:"#eaf3fe"}]}>This Month</Text>
    <Text style={tailwind`mt-2 mb-1 text-center`}>{monthlyStats.timeFocused / 60} min</Text>
    <Text style={[tailwind`mb-2 mt-1 text-sm text-center`,{color:"#eaf3fe"}]}>Focused Time</Text>
    <Text style={tailwind`text-center mb-1`}>{monthlyStats.sessionsCompleted} sessions</Text>
    <Text style={[tailwind`text-center mt-1 text-sm`,{color:"#eaf3fe"}]}>Finished</Text>
</View>
      </View>
      </View>
    </View>
  )
}

export default Summary



/**
 * 

 */