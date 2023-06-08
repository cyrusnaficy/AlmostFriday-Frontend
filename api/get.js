import axios from 'axios';

import { BASE_URL } from '../constants/api';
import { createSession } from '../helpers/security/session';

export const get = async (data) => {

    let returnVal = {
        success: false,
        status: null,
        data: null
    };

    const path = data.path;
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
            method: 'GET',
            url: BASE_URL + path,
            headers: headers
        })

        returnVal.success = response.status == 200 ? true: false;
        returnVal.status = response.status;
        returnVal.data = response.data;

    } catch (err) {
        returnVal.data = err.response.data;
        returnVal.status = err.response.status;
    }

    return returnVal;

}