import * as React from 'react'
import { TouchableOpacity, ViewStyle, TextStyle, TouchableOpacityProperties } from 'react-native'
import { Text } from '../text'
import { color, spacing, size, typography, style } from '../../../theme';

export interface ButtonProps extends TouchableOpacityProperties {
    /** The straight up text to use. */
    text?: string
    /** Disable interactions? */
    disabled?: boolean

    testID?: string
    /** An optional style override for the container. */
    style?: ViewStyle
    /** An optional style override for the button text. */
    textStyle?: TextStyle
    size?: string
    noTranslate?: boolean
}


const DEFAULT: ViewStyle = {
    ...style.shadow,
    backgroundColor: color.black,
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center'
}

/**
 * A button which comes in various presets.
 */
export function Button(props: ButtonProps) {
    // extract the props
    const { text, disabled, style, textStyle, ...rest } = props
    // and render
    const DEFAULT_TEXT =  {
        color: color.white,
        textAlign: 'center',
        ...typography.button_primary,
        ...textStyle,
    }
    let noTranslate = props.noTranslate === undefined ? false : true;

    if (props.size === 'large') {
        DEFAULT.width = '100%'
        DEFAULT_TEXT.fontSize = size.large
    } else if (props.size === 'medium'){
        DEFAULT.width = '80%'
        DEFAULT_TEXT.fontSize = size.medium
    } else if (props.size === 'small') {
        DEFAULT.width = '60%'
        DEFAULT_TEXT.fontSize = size.small
    } else if (props.size === 'smaller') {
        DEFAULT.width = '40%'
        DEFAULT_TEXT.fontSize = size.smaller
    } else if (props.size === 'smallest') {
        DEFAULT.width = '20%'
        DEFAULT_TEXT.fontSize = size.smallest
    }

    return (
        <TouchableOpacity
            testID={props.testID}
            style={{ ...DEFAULT, ...style }}
            disabled={disabled}
            {...rest}
        >
            <Text
                style={DEFAULT_TEXT}
                text={text}
                noTranslate={noTranslate}
            />
        </TouchableOpacity>
    )
}
