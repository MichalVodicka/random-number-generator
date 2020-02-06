import axios from 'axios'

import { GET_RANDOM_NUMBER, GET_ERROR, CLEAR_ERROR, RESET_RANDOM_NUMBER,GET_RANDOM_NUMBER_LOADING } from './types'

export const getNumber = (generatorData, history) => dispatch => {
    dispatch({
        type: CLEAR_ERROR
    })
    dispatch({
        type: RESET_RANDOM_NUMBER
    });
    dispatch({
        type: GET_RANDOM_NUMBER_LOADING
    });
    return axios.post('/api/generator', generatorData)
        .then(res => {
            const { msg } = res.data;
            dispatch({
                type: GET_RANDOM_NUMBER,
                payload: {number:msg}
            });
        })
        .catch(err =>{
            let err504={
                unreachable:"Backend is unreachable. Please make sure backend is running and port of backend is the same as specified in .env file."
            }
            let errorData =err.response.status == 504? err504:err.response.data
            dispatch({
                type: GET_ERROR,
                payload: errorData
            })
        });
}

