import { TextStyle, Platform } from 'react-native'
import { color } from './color'

class Typography {

  header_1: TextStyle = { fontSize: 28, color: color.black }
  header_2_bold: TextStyle = { fontSize: 16, color: color.black }
  header_2: TextStyle = { fontSize: 16, color: color.black }
  header_3: TextStyle = { fontSize: 20, color: color.black }
  body_title: TextStyle = { fontSize: 16, color: color.black }
  body_subTitle: TextStyle = { fontSize: 12, color: color.black }
  body: TextStyle = { fontSize: 16, color: color.black }
  body_small: TextStyle = { fontSize: 12, color: color.black }
  body_small_grey: TextStyle = { fontSize: 12, color: color.coolGray }
  body_light: TextStyle = { fontSize: 14, color: color.black }
  link: TextStyle = { fontSize: 16, color: color.black }
  link_small: TextStyle = { fontSize: 12, color: color.black }
  error: TextStyle = { fontSize: 16, color: color.error }
  error_small: TextStyle = { fontSize: 12, color: color.error }

  list_row: TextStyle = { fontSize: 16, color: color.black }
  button_primary: TextStyle = { fontSize: 16, color: color.white }
  button_secondary: TextStyle = { fontSize: 16, color: color.black }

  tabLabel: TextStyle = { fontSize: 11, color: color.black }

  navigationHeader: TextStyle = {
    fontSize: 16, color: color.black,
    textAlign: 'center', flexGrow: 1
  }

  navigationHeaderWithLeftPadding: TextStyle = {
    fontSize: 16, color: color.black,
    textAlign: 'center', flexGrow: 1,
    ...Platform.select({      // add a left margin to account for the hidden back button
      android: {              // to center the header title
        marginLeft: 70
      }
    })
  }

  navigationHeaderWithRightPadding: TextStyle = {
    fontSize: 16,  color: color.black,
    textAlign: 'center', flexGrow: 1,
    ...Platform.select({      // add a left margin to account for the hidden cart button
      android: {              // to center the header title
        marginRight: 80
      }
    })
  }

}

export const typography = new Typography()
