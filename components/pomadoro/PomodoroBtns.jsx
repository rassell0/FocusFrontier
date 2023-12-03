import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'

const PomodoroBtns = ({onPress,name}) => {
  return (
    <TouchableOpacity style={[tailwind`w-2/5 items-center border-2  rounded-full `,{backgroundColor:"#404661",borderColor:"#404661"}]} onPress={onPress}>
<Text style={[tailwind`font-bold text-lg py-4`,{color:"#eaf3fe"}]}>{name}</Text>
    </TouchableOpacity>
  )
}

export default PomodoroBtns