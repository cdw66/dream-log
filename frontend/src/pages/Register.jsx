import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    // useState hook for tracking & updating form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    // Deconstruct form data
    const { name, email, password, password2 } = formData

    const navigate = useNavigate()  // Used for navigating to web pages
    const dispatch = useDispatch()  // Used for dispatching actions to store

    // Get current application state from store
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth)

    // When the page re-renders
    useEffect(() => {
        if (isError) {  // Check for error in state
            toast.error(message)    // Return error message
        }

        if (isSuccess || user) {    // Check for user in state
            navigate('/')   // Redirect to home page
            dispatch(reset())
        }

        dispatch(reset()) // Reset state back to default

    }, [user, isError, isSuccess, message, navigate, dispatch]) // Dependency array, only trigger useEffect when these state values change

    // When a form input is changed
    const onChange = (evt) => {
        setFormData((prevState) => ({
            ...prevState,   // Copy unchanged values over from previous state
            [evt.target.name]: evt.target.value,    // Update changed input with user input value
        }))
    }

    // When the form is submitted
    const onSubmit = (evt) => {
        evt.preventDefault()    // Prevent default event handling
        console.log(evt)

        if (password !== password2) {   // Check if password & confirmation are matching
            toast.error('Passwords do not match')
        } else {    // If they match, set user data equal to object containing form data
            const userData = {
                name,
                email,
                password,
            }

            // Dispatch register action and pass user data
            dispatch(register(userData))
        }
    }

    // Render a spinner if the application state is loading
    if (isLoading) {
        return <Spinner />
    }

    return <>
        <section className='heading'>
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please create an account</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name}
                        placeholder="Enter your name"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        id="password2"
                        name="password2"
                        value={password2}
                        placeholder="Confirm your password"
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
}

export default Register