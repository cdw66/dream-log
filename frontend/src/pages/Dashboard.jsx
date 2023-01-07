import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function Dashboard() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard