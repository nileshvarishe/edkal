import * as ActionType from '../../ActionTypes';

const initialState = {
    isInProgress: true,
    isSuccess: null,
    message: null,
    productList: null,
}
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.GET_ALL_PRODUCT_REQUEST:
            return {
                ...state,
                isInProgress: true
            }
        case ActionType.GET_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                isInProgress: false,
                productList: action.payload
            }
        case ActionType.GET_ALL_PRODUCT_FAILURE:
            return {
                ...state,
                isInProgress: false,
                message: action.payload
            }
        default:
            return state;
    }
}
export default productReducer;