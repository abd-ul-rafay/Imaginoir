import { Loader } from "lucide-react"

const OverlayLoader = ({ show }: { show: boolean }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <Loader className="h-8 w-8 animate-spin text-gray-400" />
    </div>
  )
}

export default OverlayLoader
