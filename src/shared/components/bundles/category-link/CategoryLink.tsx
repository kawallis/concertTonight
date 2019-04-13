import * as React from 'react'
import { View, ViewStyle, TouchableOpacity, TextStyle, ImageStyle, Text } from 'react-native'
import { color, spacing } from '../../../theme';
import { Line, Icon } from '../../generics'
// -------------
// STATIC STYLES
// -------------
const ROW_STYLE: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: spacing.medium,
    backgroundColor: color.white,
    justifyContent: 'space-between',
    width: '100%',
}

const ICON_STYLE: ImageStyle = {
    margin: 4,
    width: 20,
    height: 20,
}

// ---------------
// COMPONENT PROPS
// ---------------
export interface CategoryLinkProps {
    onPress: () => void
    style?: ViewStyle
    text?: string
    icon?: string
    testID?: string
    iconStyle?: ImageStyle
    noBottomBorder?: boolean
    textStyle?: TextStyle
}

export function CategoryLink(props: CategoryLinkProps) {
    let icon = props.icon || 'profileIcon' // TODO: Hook up to passed in prop when icons in app
    return (
        <View>
            <TouchableOpacity style={ROW_STYLE} onPress={props.onPress}>
                <Text style={props.textStyle}>{props.text}</Text>
                {props.icon &&
                  <Icon icon={icon} style={ICON_STYLE} iconStyle={props.iconStyle} />
                }
            </TouchableOpacity>
            {!props.noBottomBorder && <Line />}
        </View>
    )
}
