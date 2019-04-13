import * as React from 'react'
import { Image, ViewStyle, TouchableWithoutFeedback } from 'react-native'


// ---------------
// COMPONENT PROPS
// ---------------
export interface StarProps {
  isFilled?: boolean
  onPress?: () => void
  style?: ViewStyle
  size?: number
}

// ---------
// COMPONENT
// ---------

const starFilled = require('./star-pink-filled.png')
const starEmpty = require('./star-empty.png')
// const starPinkFilled = require('./star-empty.png')

export function Star(props: StarProps) {
  const imageStyle = {
    ...props.style,
    height: props.size || 20,
    width: props.size || 20,
  }
  return (
    <TouchableWithoutFeedback onPress={() => props.onPress && props.onPress()}>
      <Image
        source={props.isFilled ? starFilled : starEmpty}
        style={imageStyle}
        key={(props.isFilled ? 'starFilled-' : 'starEmpty-') + Date.now()}
      />
    </TouchableWithoutFeedback>
  )
}

