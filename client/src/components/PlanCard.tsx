import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { type LucideIcon } from "lucide-react";
import GlobalSvgDefs from "./GlobalSvgDefs";
import { useUserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

interface PlanCardProps {
    plan: Plan,
    Icon: LucideIcon,
    onPlanClick: (id: string) => void,
}

const PlanCard = ({ plan, Icon, onPlanClick }: PlanCardProps) => {
    const { user } = useUserContext()
    const navigate = useNavigate()

    return (
        <Card className="w-full py-10">
            <CardContent>
                <GlobalSvgDefs />
                {<Icon className="gradient-text" stroke="url(#gradient-stroke)" strokeWidth={2} fill="none" />}
                <h3 className="text-2xl font-semibold mt-4">{plan.name}</h3>
                <p className="font-sans text-sm text-muted-foreground">{plan.description}</p>
                <p className="font-sans text-sm text-muted-foreground mb-8">One-time purchase</p>
                <p className="font-sans text-lg"><span className="gradient-text">{plan.credits}</span> <span className="text-sm text-muted-foreground">AI Image Credits for</span></p>
                <p className="text-4xl mt-1">${plan.price / 100}</p>
                <Button
                    onClick={() => user ? onPlanClick(plan.id) : navigate('/auth')}
                    variant='secondary'
                    className="w-full font-sans mt-8">
                    {user ? `Buy ${plan.name} Pack` : `Get Started` }
                </Button>
            </CardContent>
        </Card>
    )
}

export default PlanCard
