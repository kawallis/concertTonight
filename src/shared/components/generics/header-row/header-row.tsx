import * as React from 'react'
import { View, ViewStyle } from 'react-native'
import { color, spacing } from '../../../theme'

const ROOT_STYLE: ViewStyle = {
  flexDirection: 'row',
  flex: 1,
  alignItems: 'flex-end',
  marginTop: spacing.medium,
  borderBottomWidth: 1,
  borderBottomColor: color.lightGray,
  paddingHorizontal: spacing.small,
  paddingBottom: spacing.smaller,
}

export interface HeaderRowProps {
  children?: React.ReactNode
}

export function HeaderRow(props: HeaderRowProps) {
  return (
    <View style={ROOT_STYLE}>
      {props.children}
    </View>
  )
}
