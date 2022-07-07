// import { Dispatch } from "redux";
import { Dispatch } from "redux";
import { setError } from "../app/action";
import { FormActionTypes } from "./types";

export const setName = (payload: string) => {
    return {
        type: FormActionTypes.FORM_NAME,
        payload
    }
}

export const setPhone = (payload: string) => {
    return {
        type: FormActionTypes.FORM_PHONE,
        payload
    }
}

export const setPassword = (payload: string) => {
    return {
        type: FormActionTypes.FORM_PASSWORD,
        payload
    }
}

export const setFormError = (payload: any, msg: string | null = null) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FormActionTypes.FORM_ERROR,
            payload
        })
        if(msg)
            dispatch(setError(msg))
    }
}


