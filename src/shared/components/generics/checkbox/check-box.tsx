import * as React from 'react';
import { TouchableOpacity, ViewStyle, } from 'react-native';
import { color } from '../../../theme';
import { Icon } from '../icon'

export interface ViewProps {
    on: boolean;
    customStyle?: ViewStyle;
}

const DOT_STYLE: ViewStyle = {
    height: 15,
    width: 15,
    borderColor: color.black,
    borderWidth: 1,

}

const DOT_STYLE_FILLED: ViewStyle = {
    ...DOT_STYLE,
    backgroundColor: color.black
}


export function CheckBox(props: ViewProps) {
    let SELECTED = props.on ? DOT_STYLE_FILLED : DOT_STYLE;

    if(props.on) {
        return (
            <TouchableOpacity onPress={props.onPress} style={{ ...SELECTED, ...props.customStyle }} >
                <Icon />
            </TouchableOpacity>
        )
    }else {
        //this needs a check icon
        return (
            <TouchableOpacity onPress={props.onPress}  style={{ ...SELECTED, ...props.customStyle }} >
            
            </TouchableOpacity>
        )
    }
    
}
