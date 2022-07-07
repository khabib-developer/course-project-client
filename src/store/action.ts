/* eslint-disable import/no-anonymous-default-export */
import * as AppActionCreaters from './app/action'
import * as FormActionCreaters from './form/action'


export default {
    ...AppActionCreaters,
    ...FormActionCreaters
} 