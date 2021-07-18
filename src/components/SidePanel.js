import React,  { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {userChatsAction} from '../actions/chatActions';
import Loading from '../components/Loader';

const SidePanel = ({history, userID}) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userChats = useSelector(state => state.userChats)
    const {loading, errors, chats} = userChats

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userChatsAction(userInfo.id))
    },[])

    const goToChat = (pk) => {
          history.push(`/chatroom/${pk}`)
    }

    return(
        <div id="sidepanel">
                <div id="profile">
                    <div className="wrap">
                        <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online"
                             alt=""/>
                        <p>{userInfo.name}</p>
                        <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                        <div id="status-options">
                            <ul>
                                <li id="status-online" className="active"><span className="status-circle"></span>
                                    <p>Online</p></li>
                                <li id="status-away"><span className="status-circle"></span> <p>Away</p></li>
                                <li id="status-busy"><span className="status-circle"></span> <p>Busy</p></li>
                                <li id="status-offline"><span className="status-circle"></span> <p>Offline</p></li>
                            </ul>
                        </div>
                        <div id="expanded">
                            <label htmlFor="twitter"><i className="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
                            <input name="twitter" type="text" value="mikeross"/>
                            <label htmlFor="twitter"><i className="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
                            <input name="twitter" type="text" value="ross81"/>
                            <label htmlFor="twitter"><i className="fa fa-instagram fa-fw"
                                                        aria-hidden="true"></i></label>
                            <input name="twitter" type="text" value="mike.ross"/>
                        </div>
                    </div>
                </div>
                <div id="search">
                    <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
                    <input readOnly={true} type="text" placeholder="Search contacts..."/>
                </div>
                <div id="contacts">
                    <ul>
                        {
                            (loading)?(
                              <Loading/>
                              ):(
                                chats.map((c)=>(
                                <li onClick={()=>{goToChat(c.id)}} key={c.id} className="contact">
                                <div className="wrap">
                                    <span className="contact-status online"></span>
                                    <img src="http://emilcarlsson.se/assets/louislitt.png" alt=""/>
                                    <div className="meta">
                                        <p className="name">{c.name}</p>
                                    </div>
                                </div>
                            </li>
                        )))}
                    </ul>
                </div>
                <div id="bottom-bar">
                    <button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add contact</span>
                    </button>
                    <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span>
                    </button>
                </div>
            </div>
    )
}

export default SidePanel