import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import {Ionicons} from "@expo/vector-icons"
const AddTaskBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[tailwind`w-15 h-15 rounded-full items-center justify-center absolute right-5 bottom-5`,{backgroundColor:"#404661"}]}>
<Ionicons name='add' size={40} color="#eaf3fe"/>
     </TouchableOpacity>
  )
}

export default AddTaskBtn