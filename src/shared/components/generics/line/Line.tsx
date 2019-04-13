import * as React from 'react'
import { View, ViewStyle } from 'react-native'
import { color } from '../../../theme'

// -------------
// STATIC STYLES
// -------------
const ROOT_STYLE: ViewStyle = {
  backgroundColor: color.offWhite,
  width: '100%',
  height: 1,
}

const DARK_STYLE: ViewStyle = {
  ...ROOT_STYLE,
  backgroundColor: color.lightGray,
}

// ---------------
// COMPONENT PROPS
// ---------------
export interface LineProps {
  dark?: boolean
}
// ---------
// COMPONENT
// ---------
export function Line(props: LineProps) {
  const { dark } = props
  const styles = dark ? DARK_STYLE : ROOT_STYLE

  return <View style={styles} />
}
