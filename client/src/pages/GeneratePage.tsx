import { useState } from "react"
import { saveAs } from "file-saver"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useUserContext } from "@/context/UserContext"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import errorIcon from "../assets/error.svg"
import { generateImage, updateImage } from "@/api"

const GeneratePage = () => {
  const { user, updateCredits } = useUserContext()
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState<Image | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setImage(null);

    try {
      const response = await generateImage(prompt);
      const { generatedImage, remainingCredits } = response.data;
      setImage(generatedImage)
      updateCredits(remainingCredits)
    } catch (err: any) {
      const message = err?.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(message);
      setError(message);
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = async () => {
    if (!image) return;
    try {
      await updateImage(image._id);
      toast.success("Shared with the community!");
    } catch (err) {
      toast.error("Failed to share image.");
    }
  };

  const handleDownload = () => {
    if (!image) return;
    saveAs(image.url, "generated-image.png");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center md:5/6 lg:w-4/5 m-auto">
      <h2 className="text-4xl font-semibold dark:font-normal text-center gradient-text w-full">
        Unleash Your Creativity
      </h2>
      <p className="text-lg mb-2">Credit Available: {user.credits}</p>
      <div className="w-full sm:w-1/2 md:w-2/5 xl:w-1/3 m-auto space-y-4 mb-2">
        {isLoading
          ? <Skeleton className="w-full rounded-md aspect-square" />
          : <Card className="rounded-md overflow-hidden aspect-square p-0">
            {error
              ? <div className="flex items-center justify-center w-full h-full">
                <img className="w-12 h-12" src={errorIcon} alt="error" />
              </div>
              : image
                ? <img className="w-full h-full" src={image.url} alt='Generated' />
                : <img className="w-full h-full opacity-50" src='/sample.png' alt='Sample' />}
          </Card>
        }
      </div>
      <div className="w-full md:w-1/2 font-sans flex flex-col gap-2">
        <form onSubmit={handleGenerateImage} className="flex flex-col sm:flex-row w-full items-center gap-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A cyberpunk city at night, neon lights, flying cars in the sky" />
          <Button
            className="sm:w-auto aspect-square w-full"
            type="submit"
            disabled={isLoading || prompt.trim() === ''}
          >
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </form>
        {image && (
          <div className="flex flex-col sm:flex-row w-full items-center gap-2">
            <Button
              className="flex-1 w-full"
              variant="outline"
              onClick={handleShare}
              disabled={isLoading}
            >
              Share with Community
            </Button>
            <Button
              className="flex-1 w-full"
              variant="outline"
              onClick={handleDownload}
              disabled={isLoading}
            >
              Download
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GeneratePage
