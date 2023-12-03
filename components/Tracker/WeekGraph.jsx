import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import tailwind from 'twrnc'
const WeekGraph = () => {
    const {width,height} = Dimensions.get("window")
    const chartConfig = {
        backgroundGradientFrom: "#404661",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#404661",
        backgroundGradientToOpacity: 1,
        
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false // optional
      };

      const data = {
        labels: ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"],
        datasets: [
          {
            data: [4,2,6,4,3,8,7],
            color: (opacity = 1) => `rgba(234, 243, 254, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Weekly Sessions"] // optional
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

export default WeekGraph