import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, userUpdateAdmin } from '../actions/userActions'
import { ADMIN_USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const adminUserUpdate = useSelector((state) => state.adminUserUpdate)
  const { loading: lUpdate, error: eUpdate, success: sUpdate } = adminUserUpdate

  useEffect(() => {
    if (sUpdate) {
      dispatch({ type: ADMIN_USER_UPDATE_RESET })
      history.push('/admin/userList')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, userId, dispatch, sUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userUpdateAdmin({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Edit User</h1>
        {lUpdate && <Loader />}
        {eUpdate && <Message>{eUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='isAdmin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' block>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
