import { Navigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

interface ProtectedRouteProps {
  children: React.ReactNode
  isAuthRoute?: boolean
}

const ProtectedRoute = ({ children, isAuthRoute }: ProtectedRouteProps) => {
  const { user, isLoading } = useUserContext()

  if (isLoading) return null

  if (isAuthRoute) {
    return user ? <Navigate to="/" replace /> : <>{children}</>
  }

  return user ? <>{children}</> : <Navigate to="/auth" replace />
}

export default ProtectedRoute
