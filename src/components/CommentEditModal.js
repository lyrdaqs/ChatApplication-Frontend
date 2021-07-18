import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getPostComments} from '../actions/socialMediaActions'

function CommentEditModal(props) {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [content, setContent] = useState('')
    const [comment, setComment] = useState({content:''})

    useEffect(() => {
        getComment()
    },[])

    const getComment = async () => {
        try{
            const token = userInfo['token']

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await axios.get(
                `http://127.0.0.1:8000/api/socialMedia/posts/comment/${props.comment_id}/`,
                config
            )
            setComment(data)


        }catch(error){
            console.log(error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message)
        }
    }

    const editComment = async () => {
        try{
            const token = userInfo['token']

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await axios.put(
                `http://127.0.0.1:8000/api/socialMedia/posts/comment/${props.comment_id}/edit/`,
                {content}, config
            )
            dispatch(getPostComments(props.post_id))


        }catch(error){
            console.log(error.response && error.response.data.detail
                ?error.response.data.detail
                :error.message)
        }
    }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='comment-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-xs-12">
          <div className="form-group">
              <h2>edit your content</h2>
              <textarea defaultValue={comment.content}
                  onChange={(e) => setContent(e.target.value)}
                        className="text-dark form-input" placeholder="Your text"></textarea>
              </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={editComment}>Edit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommentEditModal;