import * as React from 'react'
import { View } from 'react-native'
import { spacing } from '../../../theme'
import { Logo } from '../../bundles/logo'


export function NavigationTitle() {
  return (
    <View style={{ flex: 1, paddingBottom: spacing.smaller }}>
      <Logo style={{ height: spacing.large, alignSelf: 'center' }} />
    </View>
  )
}
