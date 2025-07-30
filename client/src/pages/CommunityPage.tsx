import ImageCard from "@/components/ImageCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useUserContext } from "@/context/UserContext"
import { Separator } from "@radix-ui/react-separator"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { getAllImages } from "@/api"

const CommunityPage = () => {
  const { user } = useUserContext()
  const [images, setImages] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const handleImageDelete = (id: string) => {
    setImages(prev => prev.filter(img => img._id !== id))
  }

  useEffect(() => {
    const fetchPublicImages = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await getAllImages()
        setImages(response.data)
      } catch (err: any) {
        const message = err?.response?.data?.message || "Failed to load public images."
        setError(message)
        toast.error(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPublicImages()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center md:5/6 lg:w-4/5 m-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold dark:font-normal text-center gradient-text w-full">
        Discover Community
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed text-center font-sans mb-8">
        Explore AI-generated art shared by creators around the world or <Link to={user ? '/generate' : '/auth'} className="underline cursor-pointer">generate your own masterpiece</Link>
      </p>
      <Separator className="mb-6" />

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
            No public images available yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default CommunityPage
