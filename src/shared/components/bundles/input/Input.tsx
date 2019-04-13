import React from 'react'
import { TextInput, View, Text } from 'react-native'
import { spacing, color, style, typography } from '../../../theme'

const boxStyle = {
    borderWidth: 1,
    marginTop: spacing.smaller,
    marginBottom: spacing.smaller,
    flexDirection: 'row',
    borderColor: color.lightGray,
    backgroundColor: color.white,
    width: '100%',
    ...style.textInputValue,
    paddingVertical: 14,
    paddingHorizontal: spacing.small
}

export const Input = (props) => {
    return (
        <View style={{width: '100%', marginBottom: spacing.medium, ...props.containerStyle}}>
            <Text style={{...style.textInputHeader, marginBottom: 5}}>{props.label}</Text>
            <TextInput
                style={boxStyle}
                underlineColorAndroid='transparent'
                onChangeText={(text) => props.onChangeText(props.name, text)}
                value={props.value}
                placeholder={props.placeholder || props.label}
                placeholderTextColor={color.coolGray}
            />
            {props.errors && <Text style={{...typography.error_small}}>{props.errors[0]}</Text>}
        </View>
    )
}
