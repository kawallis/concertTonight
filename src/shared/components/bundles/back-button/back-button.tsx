import * as React from 'react'
import { View, TouchableWithoutFeedback, TouchableOpacityProperties, ViewStyle, Image } from 'react-native'
import { spacing } from '../../../theme'

export interface BackButtonProps extends TouchableOpacityProperties {
  style?: ViewStyle
  type?: String
  onPress(): void
}

const BUTTON_SIZE = 40
const ICON_WIDTH = 19
const ICON_HEIGHT = 18

export class BackButton extends React.Component<BackButtonProps> {
  render() {
    let source = require('../../generics/icon/back.png')
    if (this.props.type !== 'undefined' && this.props.type === 'close') {
      source = require('../../generics/icon/exit.png')
    }
    return (
      <View style={{ width: BUTTON_SIZE, height: BUTTON_SIZE, marginHorizontal: 6, marginBottom: spacing.smaller,
         alignItems:'center', justifyContent: 'center' }}>
         <Image
           source={source}
           style={{ width: ICON_WIDTH, height: ICON_HEIGHT}}/>
         <TouchableWithoutFeedback onPress={() => { this.props.onPress()} }>
           <View style={{
             position: 'absolute',
             height: BUTTON_SIZE,
             width: BUTTON_SIZE}}/>
         </TouchableWithoutFeedback>
      </View>
    )
  }
}
