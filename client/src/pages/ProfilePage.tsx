import ImageCard from "@/components/ImageCard"
import { LogoutDialog } from "@/components/LogoutDialog"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useUserContext } from "@/context/UserContext"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { getMyImages } from "@/api"

const ProfilePage = () => {
  const { user, setUser } = useUserContext()
  const [images, setImages] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
    navigate('/auth')
  }

  const handleImageDelete = (id: string) => {
    setImages(prev => prev.filter(img => img._id !== id))
  }

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await getMyImages()
        setImages(response.data)
      } catch (err: any) {
        const message = err?.response?.data?.message || "Failed to load images."
        setError(message)
        toast.error(message)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) fetchImages()
  }, [user])

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center md:5/6 lg:w-4/5 m-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold dark:font-normal text-center gradient-text w-full">
        User Profile
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed text-center font-sans mb-8">
        Manage your profile and view your past activity.
      </p>
      <div className="w-full sm:w-2/3 md:w-1/2 max-w-[400px] space-y-4 mb-6 dark:font-light">
        <p className="text-xl">{user.name} <span className="text-muted-foreground text-lg">{user.email}</span></p>
        <p className="text-lg">Credit Available: {user.credits}</p>
        <Separator />
        <LogoutDialog onLogoutClick={handleLogout} />
        <Separator />
      </div>
      <h3 className="text-2xl mb-4">Your Past Activity</h3>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="w-full aspect-square rounded-md" />
          ))
        ) : error ? (
          <p className="text-red-500 col-span-full text-center">{error}</p>
        ) : images.length > 0 ? (
          images.map((image, index) => (
            <ImageCard key={index} image={image} onDeleteSuccess={handleImageDelete} />
          ))
        ) : (
          <p className="text-muted-foreground text-sm col-span-full text-center font-sans">
            No images generated yet. Click here to <Link to='/generate' className="underline cursor-pointer">generate images with AI</Link>
          </p>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
