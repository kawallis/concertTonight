import { ViewStyle, TextStyle } from 'react-native'
import { color } from './color'
import { spacing } from './spacing'
import { typography } from './typography'

class Style {
  navigationHeader: ViewStyle = {
    shadowColor: color.mediumGray,
    shadowRadius: 4,
    shadowOpacity: 0.4,
    shadowOffset: {
      height: 2,
      width: 0,
    }
  }

  swiperDot: ViewStyle = {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 6,
    marginRight: 6,
    marginTop: 0,
    marginBottom: 3
  }

  bottomStickyButton: ViewStyle = {
    position: 'absolute',
    bottom: -5,
    alignSelf: 'center',
    zIndex: 100,
    marginBottom: 10,
    width: '90%'
  }

  /*
    Styles for Input control
  */
  textInputHeader: TextStyle = {
    ...typography.body_light,
    fontSize: 12
  }
  textInputPrompt: TextStyle = {
    ...typography.body_light,
    color: color.coolGray,
    fontSize: 16
  }
  textInputValue: TextStyle = {
    ...this.textInputPrompt,
    color: color.black
  }
  /*
  /*
    Common styles for Settings
  */
  settingsRoot: ViewStyle = {
    paddingTop: spacing.medium,
  }
  settingsRow: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 10,
  }
  settingsRowText: TextStyle = {
    ...typography.body
  }

  /*
    Popup styles
  */
  popup: ViewStyle = {
  	backgroundColor: color.white,
    borderRadius: 6,
    borderWidth: 0,
    shadowColor: color.lightGray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  }
  popupTitle: TextStyle = {
    ...typography.header_2,
    paddingHorizontal: 20,
  	paddingVertical: 25,
  	paddingBottom: 5,
  	textAlign: 'center'
  }
  popupSubTitle: TextStyle = {
    ...typography.body_subTitle,
  	textAlign: 'center'
  }
  popupBody: TextStyle = {
    ...typography.body,
    paddingHorizontal: 20,
  	textAlign: 'center'
  }
  popupBodyLight: TextStyle = {
    ...typography.body_light,
  	textAlign: 'center'
  }
  popupBodySmall: TextStyle = {
    ...typography.body_small,
  	textAlign: 'center'
  }
  popupBtnSeparator: ViewStyle = {
    width: '100%',
    height: 1,
    backgroundColor: '#d4cfcd'
  }
  popupBtn: ViewStyle = {
    width: '100%',
    height: 49
  }
  popupBtnText: TextStyle = {
    ...typography.header_2,
    textAlign: 'center'
  }
  popupBtnTextPrimary: TextStyle = {
    ...typography.body_title,
    textAlign: 'center'
  }
}

export const style = new Style()
