import React, {useCallback} from 'react';
import Test from "../components/Test/Test";

export const useMessage = () => {
    return useCallback(text => {
        text && alert(text)
    }, [])
}