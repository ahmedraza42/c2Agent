import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import colors from '../theme/Colors'

const Loader=()=> {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size={"small"} color={colors.input} />
  </View>
  )
}

export default Loader