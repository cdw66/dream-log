import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getDreams } from '../features/dreams/dreamSlice'
import { reset } from '../features/auth/authSlice'
import DreamForm from '../components/DreamForm'
import Spinner from '../components/Spinner'
import DreamItem from '../components/DreamItem'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { dreams, isLoading, isError, message } = useSelector((state) => state.dreams)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getDreams())

    return () => {
      dispatch(reset)
    }
  }, [user, isError, message, dispatch, navigate])

  if (isLoading) {
    return <Spinner />
  }

  return (<>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1> {/* If the user exists, render the username */}
      <p>Dream Log</p>
    </section>

    <DreamForm />

    <section className="content">
      {dreams.length > 0 ? (
        <div className="goals"> {/* TODO change css class name to dreams */}
          {dreams.map((dream) => (
            <DreamItem key={dream._id} dream={dream} />
          ))}
        </div>
      ) : (<h3>No dreams to show</h3>)}
    </section>

  </>)


}

export default Dashboard