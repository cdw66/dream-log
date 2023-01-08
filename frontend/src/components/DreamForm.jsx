import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import { createDream } from '../features/dreams/dreamSlice'

function DreamForm() {

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })

    const dispatch = useDispatch()

    // Deconstruct form data
    const { title, description } = formData

    // Get current application state from store
    const { dreams, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.dreams)

    const onSubmit = evt => {
        // setFormData((prevState) => ({
        //     ...prevState,   // Copy unchanged values over from previous state
        //     [evt.target.name]: evt.target.value,    // Update changed input with user input value
        // }))
        evt.preventDefault()    // Prevent page from reloading on submit

        if (title === '' || description === '') {
            toast.error('Please add a title and description')
        } else {
            const dreamData = {
                title,
                description
            }

            dispatch(createDream(dreamData))

            setFormData(() => ({
                title: '',
                description: ''
            }))
        }
    }

    const onChange = evt => {
        setFormData((prevState) => ({
            ...prevState,   // Copy unchanged values over from previous state
            [evt.target.name]: evt.target.value,    // Update changed input with user input value
        }))
    }

    return <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Dream Title</label>
                <input type='text' name='title' id='title' value={title} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="text">Dream Description</label>
                <input type='text' name='description' id='description' value={description} onChange={onChange} />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">Save dream</button>
            </div>
        </form>
    </section>
}

export default DreamForm