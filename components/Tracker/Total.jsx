import React from 'react';
import { View, Text, TouchableOpacity,Dimensions } from 'react-native';
import tailwind from 'twrnc';
import Divider from './Divider';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

const Total = () => {
    const {width,height} = Dimensions.get("window")
    const sessions = useSelector(state => state.sessions.sessions)
const [totalStats,setTotalStats] = useState({
  sessionsCompleted:0,
  timeFocused:0
})


useEffect(()=>{
setTotalStats({
  sessionsCompleted:0,
  timeFocused:0
})

for(let i = 0;i < sessions.length; i++){

if(sessions[i].completed === true){
setTotalStats(state =>{
 return  {
  ...state,
  sessionsCompleted:state.sessionsCompleted + 1
}
})
}
if(sessions[i].duration > 0){ 
  setTotalStats(state =>{
    return  {
     ...state, 
     timeFocused: state.timeFocused + sessions[i].duration
   }
   })
}
}

},[sessions])

  return ( 
    <View style={[tailwind` rounded-md  items-center `,{backgroundColor:"#404661",width:width *.9,height:height*.2}]}>
    <View style={tailwind`flex-1  justify-end `}>
      <Text style={[tailwind`font-bold text-3xl mb-2 `,{color:"#eaf3fe"}]}>Total</Text>  
    </View>

<View style={tailwind`flex-1 flex-row w-1/1 p-4 items-center justify-around `}>
<View>
<Text style={[tailwind`mb-2 font-bold mt-1 text-2xl text-center`,{color:"#eaf3fe"}]}>{totalStats.sessionsCompleted}</Text>
<Text style={tailwind`text-center text-base  w-25 font-semibold mb-1`}>Sessions Completed</Text>
</View>
<Divider/>
<View>
<Text style={[tailwind`mb-2 font-bold mt-1 text-2xl text-center  `,{color:"#eaf3fe"}]}>{totalStats.timeFocused / 60}m</Text>
<Text style={tailwind`text-center text-base w-25 font-semibold mb-1`}>Time Focused</Text>
</View>


</View>

</View>
  )
}

export default Total