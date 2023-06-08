import axios from 'axios';

import { BASE_URL } from '../constants/api';
import { createSession } from '../helpers/security/session';

export const post = async (data) => {

    let returnVal = {
        success: false,
        data: null
    };

    const path = data.path;
    const body = data.body;
    const headersBase = data.headers;
    
    const sessionHeader = {
        "X-Almost-Friday-Session": createSession()
    }

    const headers = {
        ...headersBase,
        ...sessionHeader
    }

    try {

        const response = await axios({
            method: 'POST',
            url: BASE_URL + path,
            headers: headers,
            data: body
        })


        if(response.status == 200) {
            returnVal.success = true;
            returnVal.data = response.data;
        }

    } catch (err) {
        returnVal.data = err.response.data;
    }

    return returnVal;

}