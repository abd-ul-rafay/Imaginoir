import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-30">
      <p className="text-2xl">Page not found - 404</p>
      <Link to='/' className="underline text-sm font-sans text-muted-foreground">Go back to Home Page</Link>
    </div>
  )
}

export default NotFoundPage
