import React, {useState} from 'react';
import {Link} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {useSelector} from "react-redux";

function PostCreatePage(props) {

    const [upload,setUpload] = useState({})
    const [caption,setCaption] = useState('')
    const [tags,setTags] = useState('')
    const [image,setImage] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const [createdPost, setCreatedPost] = useState(0)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const uploadFileHandler = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUpload(formData)
    }

    const submitHandler = async (e) => {
        try{
            const token = userInfo['token']

            const config = {
                headers:{
                    'Content-type': 'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const tagsJson = tags.split(',').map((tag)=>(
                {'name': tag}
            ))
            const { data } = await axios.post(
                'http://127.0.0.1:8000/api/socialMedia/posts/create/',
                {
                    caption,
                    "tags": tagsJson
                },
                config
            )
            setCreatedPost(data)

            const configUpload = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            await axios.post(
                `http://127.0.0.1:8000/api/socialMedia/posts/${createdPost}/upload/`,
                upload, configUpload
            )
        }catch(error){
            setError(error.response && error.response.data.detail
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
            <FormContainer>
                <h1>Create Post</h1>

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={(e)=>{submitHandler(e)}}>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File>

                            </Form.Group>

                            <Form.Group controlId='caption'>
                                <Form.Label>Caption</Form.Label>
                                <Form.Control
                                    as="textarea" rows={3}
                                    placeholder='Enter Caption'
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='tags'>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter tags with (,)'
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Create
                            </Button>

                        </Form>
                    )}

            </FormContainer >
          </Modal.Body>
        </Modal>
    );
}

export default PostCreatePage;