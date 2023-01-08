import { useDispatch } from "react-redux"
import { deleteDream } from '../features/dreams/dreamSlice'



function DreamItem({ dream }) {
    const dispatch = useDispatch()

    return (
        <div className='goal'>
            <div>
                {new Date(dream.createdAt).toLocaleString('en-us')}
            </div>
            <h2>{dream.title}</h2>
            <p>{dream.description}</p>
            <button onClick={() => dispatch(deleteDream(dream._id))} className="close">X</button>
        </div>
    )
}

export default DreamItem