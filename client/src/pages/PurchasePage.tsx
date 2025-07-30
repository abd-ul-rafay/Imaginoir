import { createCheckoutSession } from "@/api/payment"
import OverlayLoader from "@/components/OverlayLoader"
import PlanCard from "@/components/PlanCard"
import { useUserContext } from "@/context/UserContext"
import { plans } from "@/lib/consts"
import { useState } from "react"
import { toast } from "sonner"

const PurchasePage = () => {
  const { user } = useUserContext()
  const [isLoading, setIsLoading] = useState(false)

  const handlePlanClick = async (planPriceId: string) => {
    setIsLoading(true)
    try {
      const response = await createCheckoutSession(planPriceId)
      window.location.href = response.data; // redirect to stripe checkout
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to create checkout session."
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center md:5/6 lg:w-4/5 m-auto">
      <OverlayLoader show={isLoading} />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold dark:font-normal text-center gradient-text w-full">
        Buy More Credits
      </h2>
      {user && <p className="text-lg">Credit Available: {user.credits}</p>}
      <p className="text-sm text-muted-foreground leading-relaxed text-center font-sans mb-8">
        Choose a plan that fits your creative needs and keep generating stunning AI images.
      </p>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {plans.map(({ plan, Icon }, index) => (
          <PlanCard key={index} Icon={Icon} plan={plan} onPlanClick={handlePlanClick} />
        ))}
      </div>
    </div>
  )
}

export default PurchasePage
