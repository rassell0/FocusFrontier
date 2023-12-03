import React from 'react';
import { View, Text, TouchableOpacity,Dimensions } from 'react-native';
import tailwind from 'twrnc';
import Divider from './Divider';
import Summary from './Summary';
import Total from './Total';
import { FlatList } from 'react-native';
import WeekGraph from './WeekGraph';
import MonthGraph from './MonthGraph';
import { useSelector } from 'react-redux';

const TrackerScreen = () => {

    const {width,height} = Dimensions.get("window")
/**
 * useEffect(()=>{
  const currentDate = new Date();
    const currentDay = currentDate.toISOString().split('T')[0];
   // const currentWeek = getISOWeek(currentDate);
   // const currentMonth = currentDate.toISOString().split('-').slice(0, 2).join('-')
   var first = currentDate.getDate() - currentDate.getDay();
   var last = first + 6;
    //console.log(currentDate.getDay())
},[sessions])
 */
   

const data = [<Summary/>,<Total/>,<WeekGraph/>,<MonthGraph/>]

function render({item}){
    return item
}


  return (
    <View style={[tailwind`flex-1 items-center `,{backgroundColor:"#0f1117"}]}>
      
            <FlatList data={data} renderItem={render}/>
      
    </View>
  );
};



export default TrackerScreen;
