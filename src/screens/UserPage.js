import React, {useEffect, useState} from 'react';
import {Col, Image, Row} from "react-bootstrap";
import axios from "axios";
import {useSelector} from "react-redux";
import Loading from "../components/Loader";
import Message from "../components/Message";
import PostCreatePage from "./PostCreatePage";

function UserPage(props) {

    const userID = props.match.params.id
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [loading, setLoading] = useState(true)
    const [loadingPosts, setLoadingPosts] = useState(true)
    const [user, setUser] = useState({id:''})
    const [error, setError] = useState('')
    const [isFollowed, setIsFollowed] = useState(false)
    const [posts, setPosts] = useState([])
     const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if(userInfo){
            if(userID !== user.id){
                getUserByID()
                userPosts()
                isFollowedMethod()
            }
        }else {
            props.history.push('/login')
        }
    },[userInfo,props.history,userID])

    const isFollowedMethod = async () => {
        try{
            const token = userInfo['token']

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await axios.get(
                `http://127.0.0.1:8000/api/socialMedia/is_followed/${userID}/`,
                config
            )
            setIsFollowed(data)

        }catch(error){
            setError(error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message)
        }
    }

    const getUserByID = async  () => {
        try{
            const token = userInfo['token']

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await axios.get(
                `http://127.0.0.1:8000/api/socialMedia/users/${userID}/`,
                config
            )
            setUser(data)
            setLoading(false)

        }catch(error){
            setError(error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message)
        }
    }

    const followingUser = async () => {
        try{
            const token = userInfo['token']

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await axios.post(
                `http://127.0.0.1:8000/api/socialMedia/follow/${userID}/`,
                {}, config
            )
            setIsFollowed(data)
            let followers = user.followers
            followers = (data)? followers+1 : followers-1
            setUser({...user,followers})

        }catch(error){
            console.log(error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message)
        }
    }


    const userPosts = async () => {
        try{
            const token = userInfo['token']

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await axios.get(
                `http://127.0.0.1:8000/api/socialMedia/users/${userID}/posts/`,
                config
            )
            setPosts(data)
            setLoadingPosts(false)
        }catch(error){
            console.log(error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message)
        }
    }

    return (
        <div className='mt-5'>
            {error && <Message variant='danger'>{error}</Message>}
            {
              loading? <Loading/>:(
                 <div>
                        <div>
                            <div style={{width:'30%'}}>
                                <Image src="../assets/js/holder.js/171x180" roundedCircle />
                             </div>
                            <div style={{width:'60%'}}>
                                <div>
                                    <span>
                                        <h4>{user.username}</h4>
                                        {userInfo.id == userID &&
                                           <button onClick={() => setModalShow(true)}
                                               className="btn btn-outline-info">Add Post</button>
                                        }
                                    </span>
                                    <span className='ml-2'>
                                        <button onClick={followingUser}
                                                className='btn btn-light border-dark'>
                                            {isFollowed? 'unFollow': 'Follow'}</button>
                                        <button className='btn btn-light border-dark ml-1'>Message</button>
                                    </span>
                                </div>

                                <div className='mt-2'>
                                    <span>103 posts</span>
                                    <span className='ml-3'><strong>{user.followers}</strong> followers</span>
                                    <span className='ml-3'><strong>{user.following}</strong> following</span>
                                </div>

                                <div className='mt-3'>
                                    <p>{user.bio?user.bio:'bio'}</p>
                                </div>

                            </div>
                        </div>
                            <div>
                                <Row>
                                    {loadingPosts? <Loading/> :
                                        posts.map((post)=>(
                                            <Col key={post.id} xs={6} md={4}>
                                              <Image src={post.image} fluid thumbnail />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </div>
                        </div>
              )
            }

            <PostCreatePage
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

        </div>
    );
}

export default UserPage;