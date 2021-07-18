import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {
    userLoginReducer, 
    userRegisterReducer,
    updateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userDetailsReducer,
    userUpdateReducer
} from './reducers/userReducer';

import {UserChatsReducer} from './reducers/chatReducer'
import {CommentCreateReducer,CommentListReducer} from './reducers/socialMediaReducer'

const reducer = combineReducers({
    
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    profileUpdate:updateProfileReducer,

    userChats:UserChatsReducer,
    postComments:CommentListReducer,
    commentCreate:CommentCreateReducer,
})


const getUserInfoFromStorage = localStorage.getItem('userInfo') ?
     JSON.parse(localStorage.getItem('userInfo')) : null


const initial = {
    userLogin:{userInfo:getUserInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer,initial,
   composeWithDevTools(applyMiddleware(...middleware)) 
)

export default store