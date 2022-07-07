
import { Alert, Snackbar, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useTheme } from '@mui/material/styles';

import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { useActions } from "../../hooks/redux/useActions";

export const SnackbarSuccess = () => {
    const {success} = useTypedSelector(s => s.app)
    const {setSuccess} = useActions()

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if(reason === 'clickaway')
            return
        setSuccess(null)
    }

    return (
        <>
            <Snackbar open={!!success} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {success}
                </Alert>
            </Snackbar>
        </>
    )
}

export const SnackbarWarning = () => {
    const {warning} = useTypedSelector(s => s.app)
    const {setWarning} = useActions()

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if(reason === 'clickaway')
            return
        setWarning(null)
    }
    return (
        <>
            <Snackbar open={!!warning} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {warning}
                </Alert>
            </Snackbar>
        </>
    )
}

export const SnackbarInfo = () => {
    const {info} = useTypedSelector(s => s.app)
    const {setInfo} = useActions()

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));

    useEffect(() => {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
        } else {
            Notification.requestPermission();
        }

        if(info&&matches) {
            new Notification(info) 
        }
    }, [info]) 

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if(reason === 'clickaway')
            return
        setInfo(null)
    }
    return (
        <>
            <Snackbar open={!!info} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {info}
                </Alert>
                
            </Snackbar>
        </>
    )
}

export const SnackbarError = () => {
    const {error} = useTypedSelector(s => s.app)
    const {setError} = useActions()

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if(reason === 'clickaway')
            return
        setError(null)
    }
    return (
        <>
            <Snackbar open={!!error} autoHideDuration={4000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    )
}