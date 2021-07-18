import {
    COMMENT_CREATE_SUCCESS,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_FAIL,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_FAIL,
    COMMENT_LIST_SUCCESS
} from "../constants/socialMediaConstants";

import axios from 'axios'

export const commentCreateAction = (comment,id)=> async (dispatch,getState) => {
    try{
        dispatch({
            type: COMMENT_CREATE_REQUEST
        })

        const token = getState().userLogin.userInfo['token']

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/socialMedia/posts/${id}/comment/`,
            comment, config
        )
        dispatch({
            type: COMMENT_CREATE_SUCCESS,
            payload: data
        })
        dispatch(getPostComments(id))

    }catch(error){
        dispatch({type: COMMENT_CREATE_FAIL,
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }

}

export const getPostComments = (id)=> async (dispatch,getState) => {
    try{
        dispatch({
            type: COMMENT_LIST_REQUEST
        })

        const token = getState().userLogin.userInfo['token']

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const { data } = await axios.get(
            `http://127.0.0.1:8000/api/socialMedia/posts/${id}/comments/`,
            config
        )
        dispatch({
            type: COMMENT_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({type: COMMENT_LIST_FAIL,
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
}