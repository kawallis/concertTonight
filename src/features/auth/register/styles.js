import { StyleSheet } from 'react-native';
import { color } from '../../../shared'

export const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: color.offWhite,
      padding: 20,
    },
    birthdayContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      margin: 10,
      marginBottom: 25,
    },
    day: {
      fontSize: 20,
      padding: 5
    },
    dayButton: {
      borderWidth: 1,
      borderColor: color.black,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    downArrow: {
      backgroundColor: color.black
    }
  });
