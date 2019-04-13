export type Props = {
    navigation: any
    toggleModal: any
  }
  
export type State = {
    firstName: string
    lastName: string
    email: string
    password: string
    checkedFab: boolean
    termsOfService: boolean,
    birthday: string

    showPicker: boolean
    activePicker: string
    pickerList: [any]
  
    emailErrors: any
    passwordErrors: any
    firstNameErrors: any
    lastNameErrors: any
    termsOfServiceErrors: any,
    birthDayErrors: any
  }
  
  export const INTITAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthday: '',
    checkedFab: false,
    termsOfService: true,
    showPicker: false,
    pickerList: [],
    activePicker: '',
  
    emailErrors: null,
    passwordErrors: null,
    firstNameErrors: null,
    lastNameErrors: null,
    termsOfServiceErrors: null,
    birthDayErrors: null
  }