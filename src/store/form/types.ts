
export enum FormActionTypes {
    FORM_PHONE = "FORM_Phone",
    FORM_NAME = "FORM_NAME",
    FORM_PASSWORD = "FORM_PASSWORD",
    FORM_ERROR = 'FORM_ERROR'
}

interface FormNameAction {
    type: FormActionTypes.FORM_NAME
    payload: string
}

interface FormPhoneAction {
    type: FormActionTypes.FORM_PHONE
    payload: string
}


interface FormPasswordAction {
    type: FormActionTypes.FORM_PASSWORD
    payload: string
}

interface FormErrorAction {
    type: FormActionTypes.FORM_ERROR
    payload: string
}



export type FormAction =  FormNameAction | FormPhoneAction | FormPasswordAction | FormErrorAction


