import * as React from 'react'
import { TextStyle } from 'react-native'
import { typography } from '../../../theme'
import { Text } from '../text'

const ROOT_STYLE: TextStyle = { ...typography.body }

export interface HeaderColumnProps {
  span?: number
  tx: string
  align?: 'left' | 'center' | 'right'
  style?: TextStyle
}

export function HeaderColumn(props: HeaderColumnProps) {
  const dynamicStyle: TextStyle = {
    textAlign: props.align || 'left',
    flex: props.span || 1,
  }
  const style: TextStyle = {
    ...ROOT_STYLE,
    ...dynamicStyle,
    ...props.style,
  }

  return <Text style={style} tx={props.tx} />
}
