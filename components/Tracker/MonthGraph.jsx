import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import tailwind from 'twrnc'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const MonthGraph = () => {

    const {width,height} = Dimensions.get("window")
    const sessions = useSelector(state => state.sessions.sessions)
    const chartConfig = {
        backgroundGradientFrom: "#404661",

        backgroundGradientTo: "#404661",
  
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        barPercentage: 1,
      };

      const [monthlySessions,setMonthlySessions] = useState([])

useEffect(()=>{

},[sessions])


const currentDate = new Date()
const currentMonth = currentDate.toISOString().split('-').slice(0, 2).join('-');

      const data = {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          {
            data: [98,87,77,7,76,5],
            color: (opacity = 1) => `rgba(234, 243, 254, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Monthly Sessions"] // optional
      };


  return (
    <View style={tailwind`my-4 rounded-md`}>
      <LineChart
  data={data}
  width={width * .9}
  height={220}
  chartConfig={chartConfig}
/>
    </View>
  )
}

export default MonthGraph