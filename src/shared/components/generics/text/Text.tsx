import * as React from 'react';
import { Text as ReactNativeText, TextStyle } from 'react-native';
import { color, typography } from '../../../theme';
import { translate } from '../../../translate';
export interface TextProps {
  /** The fallback text if `tx` isn't used. */
  children?: React.ReactNode;
  /** The translation key to lookup and use  */
  //   tx?: string;
  text?: string;
  uppercase?: boolean;
  preset?: string;
  noTranslate?: boolean;
  style?: TextStyle;
  onPress?: () => void;
}

export function Text(props: TextProps) {
  const { text, children, style: styleOverrides, ...rest } = props;
  let res = props.noTranslate ? text : translate(text);
  let finalText = props.uppercase ? res.toUpperCase() : res;
  const fontChoice: TextStyle = typography.body;

  const style: TextStyle = {
    ...fontChoice,
    color: color.black,
    backgroundColor: color.transparent,
    ...styleOverrides
  };

  return (
    <ReactNativeText style={style} {...rest}>
      {finalText}
    </ReactNativeText>
  );
}
