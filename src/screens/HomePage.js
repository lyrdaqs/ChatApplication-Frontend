import React,  { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import Loading from '../components/Loader';
import Post from '../components/Post';
import LeftColumn from '../components/LeftColumn';
import RightColumn from '../components/RightColumn';
import axios from "axios";
import '../App.css';
import Message from "../components/Message";

const HomePage = ({history}) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        if(userInfo){
            followedUserPosts()
        }else {
            history.push('/login')
        }
    },[])

    const followedUserPosts = async  () => {
        try{
            setLoading(true)
            const token = userInfo['token']

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await axios.get(
                'http://127.0.0.1:8000/api/socialMedia/',
                config
            )
            setLoading(false)
            setPosts(data)

        }catch(error){
            setError(error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message)
        }
    }

    return(
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
                       posts.map((post) => (
                        <Post key={post.id} id={post.id} image={post.image}
                              caption={post.caption} author={post.author}
                              history={history}/>
                        ))
                    }
                    {error && <Message variant='danger'>{error}</Message>}
                </div>
            <RightColumn/>
        </div>
    )
}

export default HomePage