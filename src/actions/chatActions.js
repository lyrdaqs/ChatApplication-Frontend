import {
    USER_CHATS_REQUEST,
    USER_CHATS_FAIL,
    USER_CHATS_SUCCESS,
} from "../constants/chatConstants";

import axios from 'axios'


export const userChatsAction = (id)=> async (dispatch,getState) => {
    try{
        dispatch({
            type: USER_CHATS_REQUEST
        })

        const token = getState().userLogin.userInfo['token']

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const { data } = await axios.get(
            `/chat/${id}/chats/`,
            config
        )
        dispatch({
            type: USER_CHATS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({type: USER_CHATS_FAIL,
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
}