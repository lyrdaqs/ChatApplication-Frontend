import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getPostComments} from '../actions/socialMediaActions'

function CommentDeleteModal(props) {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [message, setMessage] = useState('')

    const deleteComment = async () => {
        try{
            const token = userInfo['token']

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const { data } = await axios.delete(
                `http://127.0.0.1:8000/api/socialMedia/posts/comment/${props.comment_id}/delete/`,
                config
            )
            setMessage(data)
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
          Delete Comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-xs-12">
          <div className="form-group">
              <h4>are you want to delete this comment?</h4>

              </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={deleteComment}>Yes</Button>
          <Button variant='danger' onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommentDeleteModal;