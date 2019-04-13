import * as React from 'react'
import { View, ViewStyle, Switch } from 'react-native'
import { color, spacing,  typography } from '../../../theme'
import { Text } from '../text'
import { Line } from '../line'


// -------------
// STATIC STYLES
// -------------
const ROW_STYLE: ViewStyle = {
  backgroundColor: color.white,
  padding: spacing.medium,
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
}

// ---------------
// COMPONENT PROPS
// ---------------
export interface SwitchRowProps {
  onChange: (value: boolean) => void
  value?: boolean
  tx?: string
}
// ---------
// COMPONENT
// ---------
export function SwitchRow(props: SwitchRowProps) {
  const { tx, value, onChange } = props
  return (
    <View>
      <View style={ROW_STYLE}>
        <Text style={{ ...typography.body, flex: 5 }} text={tx} />
        <Switch value={value} onValueChange={onChange} onTintColor={color.offPink} style={{ flex: 1 }} />
      </View>
      <Line />
    </View>
  )
}
