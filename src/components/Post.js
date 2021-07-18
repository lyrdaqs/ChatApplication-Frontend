import React, {useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";

function Post(props) {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [like_num, setLike_num] = useState(0)

    const likedPost = async () => {
        try{

            const token = userInfo['token']

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await axios.post(
                `http://127.0.0.1:8000/api/socialMedia/posts/like/${props.id}/`,
                {}, config
            )
            setLike_num(data['like_num'])

        }catch(error){
            console.log(error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message)
        }
    }

    return (
        <div>
            <div className="w3-container w3-card w3-white w3-round w3-margin"><br></br>

                    <span className="w3-right w3-opacity">1 min</span>
                <Link to={`/users/${props.author.id}`}><h4>{props.author.username}</h4></Link>
                <br></br>
                <hr className="w3-clear"></hr>
                <Image fluid src={`http://127.0.0.1:8000/static${props.image}`}/>
                        <p className='mt-3'>{props.caption}</p>
                        <div className="w3-row-padding" style={{margin:'0 -16px'}}>
                            <div className="w3-half">

                            </div>
                            <div className="w3-half">

                            </div>
                        </div>
                        <button onClick={likedPost} type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i
                            className="fa fa-thumbs-up"></i> Like
                             <span className="ml-2">
                                 {like_num} likes
                             </span>
                        </button>
                        <button onClick={()=>{props.history.push(`/posts/${props.id}`)}}
                                type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i
                            className="fa fa-comment"></i> Comment
                        </button>
            </div>
        </div>
    );
}

export default Post;