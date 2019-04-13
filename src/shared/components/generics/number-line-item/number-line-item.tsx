import * as React from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'
import { spacing, typography } from '../../../theme'
import { Text } from '../text'
// -------------
// STATIC STYLES
// -------------
const ROOT_STYLE: ViewStyle = {
  flexDirection: 'row',
  alignSelf: 'flex-end',
  justifyContent: 'space-between',
}
const LABEL_STYLE: TextStyle = {
  ...typography.body,
  alignSelf: 'flex-end',
  textAlign: 'right',
  flex: 5,
}
const VALUE_STYLE: TextStyle = {
  ...typography.body,
  textAlign: 'right',
  marginRight: spacing.small,
  flex: 1,
}

// ---------------
// COMPONENT PROPS
// ---------------
export interface NumberLineItemProps {
  style?: ViewStyle
  labelTx: string
  value: string
}
// ---------
// COMPONENT
// ---------
export function NumberLineItem(props: NumberLineItemProps) {
  const style: ViewStyle = { ...ROOT_STYLE, ...props.style }

  return (
    <View style={style}>
      <Text style={LABEL_STYLE} text={props.labelTx} />
      <Text style={VALUE_STYLE} text={props.value.toString()} />
    </View>
  )
}
