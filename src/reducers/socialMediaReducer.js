import {
    COMMENT_CREATE_FAIL,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_SUCCESS,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_FAIL,
    COMMENT_LIST_SUCCESS
} from "../constants/socialMediaConstants";

export const CommentCreateReducer = (state={},action) => {
    switch(action.type){
        case COMMENT_CREATE_REQUEST:
            return {...state, loading:true}

        case COMMENT_CREATE_SUCCESS:
            return {loading: false}

        case COMMENT_CREATE_FAIL:
            return {loading: false, error:action.payload}

         default:
            return state
    }
}


export const CommentListReducer = (state={comments:[]},action) => {
    switch(action.type){
        case COMMENT_LIST_REQUEST:
            return {...state, loading:true}

        case COMMENT_LIST_SUCCESS:
            return {loading: false, comments:action.payload}

        case COMMENT_LIST_FAIL:
            return {loading: false, error:action.payload}

         default:
            return state
    }
}