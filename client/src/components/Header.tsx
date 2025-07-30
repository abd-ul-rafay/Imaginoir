import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { PanelRight } from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import { useUserContext } from "@/context/UserContext"
import { Link, useLocation } from "react-router-dom"


const Header = () => {
  const { user } = useUserContext()
  const location = useLocation()
  const pathname = location.pathname

  const routes = [
    { path: '/auth', label: 'Login' },
    { path: '/community', label: 'Community' },
    { path: '/purchase', label: 'Buy Credits' },
    { path: '/generate', label: 'Generate Images' },
    { path: '/profile', label: 'Profile' },
  ]

  return (
    <header className="w-full px-6 md:px-20 py-4 shadow-sm flex items-center justify-between">
      <h1 className="text-2xl md:text-3xl font-semibold gradient-text bg-clip-text text-transparent">
        <Link to="/" className="cursor-pointer">Imaginoir</Link>
      </h1>

      {!user ? <div className="flex items-center gap-2 text-sm font-medium dark-button-text">
        <Button asChild variant="ghost" className="dark-button-text">
          <Link to={pathname == routes[0].path ? '/' : routes[0].path}>
            {pathname == routes[0].path ? 'Home' : routes[0].label}
          </Link>
        </Button>
        <ModeToggle />
      </div> :
        <>
          {/* Desktop view */}
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium dark-button-text">
            {routes.slice(1).map((route, index) => {
              const isSamePath = pathname === route.path
              return <Button asChild key={index} variant="ghost" className="dark-button-text">
                <Link to={isSamePath ? '/' : route.path}>
                  {isSamePath ? 'Home' : route.label}
                </Link>
              </Button>
            })}
            <ModeToggle />
          </div>

          {/* Mobile view */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="dark-button-text"  variant="ghost" size="icon">
                  <PanelRight className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {routes.slice(1).map((route, index) => {
                  const isSamePath = pathname === route.path
                  return <DropdownMenuItem
                    asChild
                    key={index}
                    className="cursor-pointer"
                  >
                    <Link to={isSamePath ? '/' : route.path} className="w-full h-full">
                      {isSamePath ? 'Home' : route.label}
                    </Link>
                  </DropdownMenuItem>
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
          </div>
        </>
      }
    </header>
  )
}

export default Header
