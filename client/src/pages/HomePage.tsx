import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/UserContext"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Wand2, UserRound, CreditCard } from "lucide-react";
import GlobalSvgDefs from "@/components/GlobalSvgDefs";
import { useEffect } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const { user } = useUserContext()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const status = searchParams.get("status")

    if (status === "success") {
      toast.success("Payment successful! Credits added.")
    } else if (status === "cancel") {
      toast.warning("Payment was cancelled.")
    }
  }, [searchParams])

  return (
    <div className="flex flex-col items-center justify-center sm:w-3/4 md:w-2/3 md:mt-10 m-auto">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold dark:font-normal text-center w-full mt-6 md:mt-8 leading-tight">
        Turn Your Imagination Into Art <br className="hidden lg:block" /> with <span className="gradient-text">AI Image Magic</span>
      </h2>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed text-center font-sans mb-10">
        Describe anything you can imagine — from surreal scenes to realistic visuals.<br />
        Let our AI turn your words into stunning artwork in seconds.
      </p>
      <div className="w-2/3 md:w-auto flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
        <GlobalSvgDefs />
        <Button variant="outline" onClick={() => navigate(user ? '/generate' : '/auth')} className="w-full flex item-center justify-between gap-4 md:w-auto px-10 py-6 font-semibold font-sans text-lg">
          {user ? 'Generate AI Images' : 'Get Started Now'}
          <Wand2 className="gradient-text" stroke="url(#gradient-stroke)" strokeWidth={2} fill="none" />
        </Button>
        {user && <Button variant="outline" onClick={() => navigate('/profile')} className="w-full flex item-center justify-between gap-4 md:w-auto px-10 py-6 font-semibold font-sans text-lg">
          View Profile
          <UserRound className="gradient-text" stroke="url(#gradient-stroke)" strokeWidth={2} fill="none" />
        </Button>}
        <Button variant="outline" onClick={() => navigate('/purchase')} className="w-full flex item-center justify-between gap-4 md:w-auto px-10 py-6 font-semibold font-sans text-lg">
          View Pricing
          <CreditCard className="gradient-text" stroke="url(#gradient-stroke)" strokeWidth={2} fill="none" />
        </Button>
      </div>
    </div>
  )
}

export default HomePage
