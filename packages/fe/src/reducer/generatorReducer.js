import {GET_RANDOM_NUMBER,RESET_RANDOM_NUMBER,GET_RANDOM_NUMBER_LOADING,GET_ERROR} from "../action/types";

const initialState = {
    number:null,
    isLoading:false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RANDOM_NUMBER:
            return {
                ...state,
                ...action.payload,
                isLoading:false
            }
        case RESET_RANDOM_NUMBER:
            return {
                ...state,
                number:null
            }
        case GET_RANDOM_NUMBER_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case GET_ERROR:
            return {
                ...state,
                isLoading:false
            }
        default:
            return state
    }
}