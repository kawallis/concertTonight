const utility = {
    transparent: 'rgba(0, 0, 0, 0)',
    facebook: '#3B5998',
    google: '#D4252A',
  }

  // try not to end up using these colors directly from your app, but they're here if you need 'em.
const palette = {
    primary: '#794ACF',
    secondary: '#3D4852',
    warmStone: '#E2DED7',
    warmStone50: '#E2DED790',
    coolGray: '#666666',
    coolGray50: '#66666680',
    warmGray: '#979797',
    offWhite: '#F8FAFC',
    black: '#22292F',

    // Beiges
    darkPink: '#D1A9B1',
    darkBeige: '#BD9271',
    mediumPink: '#DCB8BD', // original matchCo Pink
    // mediumPink: '#EBCCD2', // bareMinerals Pink
    mediumBeige: '#D6B296',
    lightPink: '#F8E3E7',
    lightBeige: '#F0D0C0',
    // backgrounds
    offPink: '#FAECEF',
    offBeige: '#fbf4Ef',
    //offWhite: '#f7F8F9',
    white: '#FFFFFF',
    // rating heart
    pink: '#A8436C',
    // type
    darkGray: '#666666',
    mediumGray: '#979797',
    lightGray: '#e2ded7',
    // error
    red: '#c20965',
    // hyperlink
    hyperlinkBlue: '#3366BB',

    shimmerPrimary: '#F1F5F8',
    shimmerSecondary: '#F8FAFC'
  }
  
  const primary = palette.primary
  const secondary = palette.secondary
  const shimmerPrimary = palette.shimmerPrimary
  const shimmerSecondary = palette.shimmerSecondary
  const warmStone = palette.warmStone
  const warmStone50 = palette.warmStone50
  const coolGray = palette.coolGray
  const coolGray50 = palette.coolGray50
  const warmGray = palette.warmGray

  // Beiges
  const darkPink = palette.darkPink
  const darkBeige = palette.darkBeige
  const mediumPink = palette.mediumPink
  const mediumBeige = palette.mediumBeige
  const lightPink = palette.lightPink
  const lightBeige = palette.lightBeige

  // background
  const white = palette.white
  const offPink = palette.offPink
  const offWhite = palette.offWhite
  const offBeige = palette.offBeige
  // type
  const black = palette.black
  const darkGray = palette.darkGray
  const mediumGray = palette.mediumGray
  const lightGray = palette.lightGray
  // misc.
  const defaultProductColor = palette.offWhite
  const border = palette.lightGray
  const heart = palette.pink
  const error = palette.red
  const hyperlink = palette.hyperlinkBlue

  // prefer using these "roles"
  export const color = {
    ...utility,
    warmStone,
    warmStone50,
    secondary,
    shimmerPrimary,
    shimmerSecondary,
    coolGray,
    coolGray50,
    warmGray,
    darkPink,
    darkBeige,
    mediumPink,
    mediumBeige,
    lightPink,
    lightBeige,
    white,
    primary,
    offPink,
    offWhite,
    offBeige,
    error,
    heart,
    black,
    darkGray,
    mediumGray,
    lightGray,
    defaultProductColor,
    border,
    hyperlink
  }
