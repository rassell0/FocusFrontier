import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
const EmptyTaskScreen = () => {
    const {height} = Dimensions.get("window")
  return (
    <View style={[tailwind`  items-center justify-center`,{height:height*.8}]}>
<Text style={tailwind`text-white text-lg text-center`}>Your to-do list is a blank canvas. Ready to turn your ambitions into accomplishments? Let's get started!</Text>
  </View>
  )
}

export default EmptyTaskScreen