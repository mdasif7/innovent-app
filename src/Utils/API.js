import axios from 'axios';

export const API = async (config) =>{

    try {
        const response  = await axios(config);
        return {
            success: true,
            data: response.data
        }
    } catch (err) {
        return {
            success: false,
            data: err.response
        }
    }

}

export let BASEURL=`https://myfakeapi.com`;