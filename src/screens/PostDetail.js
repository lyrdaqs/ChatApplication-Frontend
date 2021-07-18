import React, {useEffect, useState} from 'react';
import LeftColumn from "../components/LeftColumn";
import Loading from "../components/Loader";
import Post from "../components/Post";
import Message from "../components/Message";
import RightColumn from "../components/RightColumn";
import CommentWrap from "../components/CommentWrap";
import Comment from "../components/Comment";
import { useDispatch, useSelector } from 'react-redux'
import '../App.css';
import { Link } from 'react-router-dom'
import axios from 'axios'
import {getPostComments} from '../actions/socialMediaActions'


function PostDetail({history, match}) {
    const dispatch = useDispatch()
    const postID = match.params.id
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const postComments = useSelector(state => state.postComments)
    const { comments, error:errorComment, loading:loadingComment } = postComments

    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({})
    const [error, setError] = useState('')

    useEffect(() => {
        if(userInfo){
            if(postID !== post.id){
                getPostByID()
            }
        }else {
            history.push('/login')
        }
    },[userInfo,history,postID])

    const getPostByID = async  () => {
        try{
            const token = userInfo['token']

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await axios.get(
                `http://127.0.0.1:8000/api/socialMedia/posts/${postID}/`,
                config
            )
            setPost(data)
            setLoading(false)
            dispatch(getPostComments(postID))

        }catch(error){
            setError(error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message)
        }
    }


    return (
        <div className="w3-row mt-5">
            <LeftColumn/>
            <div className="w3-col m7">
                    <div className="w3-row-padding">
                        <div className="w3-col m12">
                            <div className="w3-card w3-round w3-white">
                                <div className="w3-container w3-padding">
                                    <h6 className="w3-opacity">Social Media template by w3.css</h6>
                                    <p className="w3-border w3-padding">Status: Feeling Blue</p>
                                    <button type="button" className="w3-button w3-theme"><i
                                        className="fa fa-pencil"></i> Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {loading ? <Loading/> :
                        <Post key={post.id} id={post.id} caption={post.caption}
                              author={post.author} image={post.image} history={history}/>
                    }
                    {errorComment && <Message variant='danger'>{errorComment}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {userInfo?(
                           loadingComment?
                               <Loading/>:
                               <CommentWrap len={comments.length} post_id={postID}>
                                    {comments.map((comment)=>(
                                        <Comment post_id={postID}
                                            key={comment.id} id={comment.id}
                                                 date={comment.createdAt.substring(0, 10)}
                                                 user={comment.user.username} content={comment.content}/>
                                    ))}
                               </CommentWrap>
                           ):
                        <Message variant='info'>please first
                            <Link to='/login'>login</Link>
                        </Message>
                    }

                </div>
            <RightColumn/>



        </div>
    );
}

export default PostDetail;