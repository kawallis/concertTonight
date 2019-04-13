import * as React from 'react'
import { View, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import { color, typography, spacing } from '../../../theme'
import { Text } from '../text'
import { Icon } from '../icon'
import { map } from 'ramda'


// -------------
// STATIC STYLES
// -------------
const BOX_STYLE: ViewStyle = {
  width: 55,
  height: 25,
  justifyContent: 'center',
  borderWidth: 1,
}

const VALUE_STYLE: TextStyle = {
  ...typography.body,
  flex: 1,
  textAlign: 'center',
  alignSelf: 'center',
}

const ICON_CONTAINER_STYLE: ViewStyle = {
  flex: 1,
  paddingTop: 2,
  justifyContent: 'center',
}

const ICON_STYLE: ViewStyle = {
  height: 5,
  width: 5,
  alignSelf: 'center',
}

const HEADER_STYLE: TextStyle = {
  ...typography.body,
}

const ERROR_TEXT_STYLE: TextStyle = {
  ...typography.error,
  marginTop: spacing.smaller,
  marginLeft: spacing.smaller,
}

// ---------------
// COMPONENT PROPS
// ---------------
export interface DropDownProps {
  options?: Array<string>
  value?: string
  labelTx?: string
  style?: ViewStyle
  icon: string
  dark?: boolean
  header?: string
  txStyle?: TextStyle
  onPress?(): void
  errors?: Object
}

// ---------
// COMPONENT
// ---------
export function DropDown(props: DropDownProps) {
  const iconContainer: ViewStyle = {
    ...ICON_CONTAINER_STYLE,
    backgroundColor: props.dark ? color.black : color.white,
  }
  const box: ViewStyle = {
    ...BOX_STYLE,
    shadowOffset: { height: props.dark ? 2 : 0, width: 0 },
    borderColor: props.errors ? color.error : color.black,  }
  const handleErrors = (errors) => {
    return map(e => {
      return <Text key={e} style={ERROR_TEXT_STYLE} text={e} />
    }, errors)
  }
  return (
    <View style={{ marginLeft: spacing.medium }}>
      {props.header && <Text style={HEADER_STYLE} tx={props.header} />}
      <TouchableOpacity onPress={props.onPress} style={{
        ...box,
        ...props.style,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        <Text
          style={VALUE_STYLE}>
          {props.value}
        </Text>
        <View style={iconContainer}>
          <Icon
            style={ICON_STYLE}
            icon={props.icon}
          />
        </View>
      </TouchableOpacity>
      {props.errors &&
        handleErrors(props.errors)
      }
    </View>
  )
}
