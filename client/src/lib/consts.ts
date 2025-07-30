import { Rocket, Sparkles, Zap, type LucideIcon } from "lucide-react";

export const plans: { plan: Plan, Icon: LucideIcon }[] = [
    {
        plan: {
            id: "price_basic_001",
            name: "Basic",
            description: "Perfect for casual use",
            price: 500,
            credits: 10

        },
        Icon: Sparkles
    },
    {
        plan: {
            id: "price_standard_002",
            name: "Standard",
            description: "Great for regular creators",
            price: 1500,
            credits: 50

        },
        Icon: Zap
    },
    {
        plan: {
            id: "price_premium_003",
            name: "Premium",
            description: "Best value for frequent users",
            price: 4000,
            credits: 200

        },
        Icon: Rocket
    },
]
