import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
import { updateProfileAction } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants';


const ProfilePage = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfrim, setPasswordConfrim] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const profileUpdate = useSelector(state=>state.profileUpdate)
    const {loading, errors, msg} = profileUpdate


    const dispatch = useDispatch()
    
    const submitHandler = (e) => {
        e.preventDefault()
        if(password != passwordConfrim){
            setMessage("Passwords do not match")
        }else{
            dispatch(updateProfileAction(name,email,password))
            setMessage("")
        } 
    }

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    },[dispatch ,userInfo])

    useEffect(() => {
        if(msg != ''){
            dispatch({
                type: USER_UPDATE_RESET
            })
        }
    },[dispatch])

    return ( 
        <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {msg && <Message variant='success'>{msg}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {errors && <Message variant='danger'>{errors}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control

                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control

                        type='password'
                        placeholder='Confirm Password'
                        value={passwordConfrim}
                        onChange={(e) => setPasswordConfrim(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
            </Button>

            </Form>
        </Col>

    </Row>
    );
}
 export default ProfilePage;