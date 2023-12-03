import { View, Text } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'

const Divider = () => {
  return (
    <View style={[tailwind` h-4/5 mx-4`,{backgroundColor:"#eaf3fe",width:1}]}>

    </View>
  )
}

export default Divider