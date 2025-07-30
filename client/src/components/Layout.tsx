import { useUserContext } from "@/context/UserContext"
import { Outlet } from "react-router-dom"
import OverlayLoader from "./OverlayLoader"

const Layout = () => {
  const { isLoading } = useUserContext()

  return (
    <main className="p-4">
      {isLoading
        ? <OverlayLoader show />
        : <Outlet />
      }
    </main>
  )
}

export default Layout
