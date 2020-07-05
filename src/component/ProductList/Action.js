import * as ActionType from '../../ActionTypes';
import data from '../../data/menu-data.json';
export const getAllProducts = () => {
    return (dispatch) => {
        dispatch(getAllProductRequest())
        dispatch(getAllProductSuccess(data))
    
    };
};

export function getAllProductRequest() {
    return {
        type: ActionType.GET_ALL_PRODUCT_REQUEST
    };
}

export function getAllProductSuccess(data) {
    return {
        type: ActionType.GET_ALL_PRODUCT_SUCCESS,
        payload: data
    };
}

export function getAllProductFailure(error) {
    return {
        type: ActionType.GET_ALL_PRODUCT_FAILURE,
        error
    };
}