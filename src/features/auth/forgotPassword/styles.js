import { StyleSheet } from 'react-native';
import { color, spacing } from '../../../shared'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.white,
		paddingHorizontal: 30,
	},
	goBack: {
		marginTop: spacing.small,
		alignSelf: 'center',
		textDecorationLine: 'underline'
	}
});