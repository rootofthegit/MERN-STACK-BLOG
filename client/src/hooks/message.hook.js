import {useCallback} from 'react'
import React from 'react';

import {SnackbarProvider, useSnackbar} from 'notistack';

export const useMessage = () => {
    const {enqueueSnackbar} = useSnackbar()

    return useCallback(text => {
        enqueueSnackbar('I love snacks.')
    }, [])
}