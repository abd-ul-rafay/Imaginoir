import { Card } from "@/components/ui/card"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { useUserContext } from "@/context/UserContext"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { deleteImage } from "@/api"

type ImageCardProps = {
  image: Image,
  onDeleteSuccess: (id: string) => void
}

const ImageCard = ({ image, onDeleteSuccess }: ImageCardProps) => {
  const { user } = useUserContext()
  const [hovered, setHovered] = useState(false)
  const [loading, setLoading] = useState(false)

  const isOwner = user?._id === image.creator._id

  const handleDelete = async () => {
    try {
      setLoading(true)
      await deleteImage(image._id)
      onDeleteSuccess(image._id)
      toast.success("Image deleted successfully")
    } catch (err) {
      toast.error("Failed to delete image")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      className="w-full aspect-square p-0 overflow-hidden relative group font-sans"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image.url}
        alt={image.prompt}
        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      {hovered && (
        <div className="absolute inset-0 bg-black/60 text-white p-3 flex flex-col justify-between">
          <div className="text-sm font-medium">
            <p>{image.prompt}</p>
            <p className="text-xs text-gray-300">By {image.creator.name}</p>
            <p className="text-xs text-gray-400">
              {new Date(image.createdAt).toLocaleDateString()}
            </p>
          </div>

          {isOwner && (
            <div className="flex justify-end">
              <AlertDialog >
                <AlertDialogTrigger asChild  className="font-sans">
                  <button title="Delete Image">
                    <Trash2 className="w-5 h-5 cursor-pointer hover:text-red-400 transition" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="font-sans">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your image.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={loading}>
                      {loading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

export default ImageCard
