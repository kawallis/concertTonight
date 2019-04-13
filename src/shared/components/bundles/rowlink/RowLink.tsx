import * as React from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  ImageStyle
} from 'react-native';
import { color, spacing, typography } from '../../../theme';
import { Text, Line, Icon } from '../../generics';

// -------------
// STATIC STYLES
// -------------
const ROOT_STYLE: ViewStyle = {
  backgroundColor: color.white,
  paddingVertical: spacing.small,
  paddingHorizontal: spacing.large,
  flex: 1,
  minHeight: 65,
  justifyContent: 'center'
};
const ROW_STYLE: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 15,
  paddingHorizontal: spacing.medium,
  backgroundColor: color.white,
  justifyContent: 'space-between'
};

const ICON_STYLE: ViewStyle = {
  margin: 4,
  width: 30,
  height: 30
};
const TEXT_STYLE: TextStyle = {
  ...typography.list_row,
  flex: 5
};

// ---------------
// COMPONENT PROPS
// ---------------
export interface RowLinkProps {
  onPress: () => void;
  style?: ViewStyle;
  text?: string;
  icon?: string;
  testID?: string;
  iconStyle?: ImageStyle;
  noBottomBorder?: boolean;
  textStyle?: TextStyle;
  noTranslate?: boolean;
}

export function RowLink(props: RowLinkProps) {
  let icon = props.icon || 'profileIcon'; // TODO: Hook up to passed in prop when icons in app
  const style: ViewStyle = { ...ROOT_STYLE, ...props.style };
  return (
    <View>
      {/* <View style={style}> */}
      <TouchableOpacity style={ROW_STYLE} onPress={props.onPress}>
        <Text
          style={{ ...TEXT_STYLE, ...props.textStyle }}
          text={props.text}
          noTranslate={props.noTranslate}
        />
        {props.icon && (
          <Icon icon={icon} style={ICON_STYLE} iconStyle={props.iconStyle} />
        )}
      </TouchableOpacity>
      {/* </View> */}
      {!props.noBottomBorder && <Line />}
    </View>
  );
}
