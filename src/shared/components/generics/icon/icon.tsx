import * as React from 'react'
import { Image, ImageStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { spacing } from '../../../theme'

// -------------
// STATIC STYLES
// -------------
const ROOT_STYLE: ImageStyle = {
  padding: spacing.small,
  resizeMode: 'contain',
}

// ---------------
// COMPONENT PROPS
// ---------------
export interface IconProps {
  style?: ImageStyle
  iconStyle?: ViewStyle
  icon?: string
  brand?: boolean
  onPress?: () => void
}

const IMAGES = {
  productsIcon: require('./Product-Default.png'),
  productsIconBrand: require('./Product-Focus.png'),
  scanIcon: require('./Scan-Default.png'),
  scanIconBrand: require('./Scan-Focus.png'),
  profileIcon: require('./Profile-Default.png'),
  profileIconBrand: require('./Profile-Focus.png'),
  plusIcon: require('./plus-icon.png'),
  minusIcon: require('./minus-icon.png'),
  profileScanIcon: require('./Scan-Default.png'),
  profileScanIconBrand: require('./Scan-Focus.png'),
  profileSettingsIcon: require('./Settings-Default.png'),
  profileSettingsIconBrand: require('./Settings-Focus.png'),
  profileReferralIcon: require('./Gift-Default.png'),
  profileReferralIconBrand: require('./Gift-Focus.png'),
  profileHelpIcon: require('./Support-Default.png'),
  profileHelpIconBrand: require('./Support-Focus.png'),
  profileFeedbackIcon: require('./Mail-Default.png'),
  profileFeedbackIconBrand: require('./Mail-Focus.png'),
  callDefaultIcon: require('./Call-Default.png'),
  cartIcon: require('./bagIcon.png'),
  historyIcon: require('./History-Default.png'),
  historyIconBrand: require('./History-Focus.png'),
  chevronDownLightIcon: require('./chevron-down-light.png'), // remove this
  loginIcon: require('./Login.png'),
  logoutIcon: require('./Logout.png'),
  settingsHidden: require('./Settings-Hidden.png'),
  backIcon: require('./back.png'),
  exitIcon: require('./exit.png'),
  searchIcon: require('./search-icon.png'),
  settingsIcon: require('./Settings-Default.png'),
  settingsIconBrand: require('./Settings-Focus.png'),
  rightArrowIcon: require('./disclosure-close.png'),
  infoIcon: require('./info.png'),
  closeIcon: require('./close-circle.png'),
  downArrowIcon: require('./down-arrow.png')
}
// ---------
// COMPONENT
// ---------
export function Icon(props: IconProps) {
  const style: ImageStyle = { ...ROOT_STYLE, ...props.style }
  const whichIcon = `${props.icon}${props.brand ? 'Brand' : ''}`
  const source = IMAGES[whichIcon]

  return (
    <TouchableOpacity disabled={props.onPress ? false : true} onPress={props.onPress}>
      <Image
        source={source}
        style={[style, props.iconStyle]}
        key={whichIcon || ('icon-' + Date.now())}
      />
    </TouchableOpacity>
  )
}
