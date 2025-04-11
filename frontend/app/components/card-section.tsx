import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { Button } from "@/components/ui/button"
import { Bot, Icon, MessageSquare, Phone } from "lucide-react"

export function CardSection() {
    return (

        <section className="mx-auto px-4 py-4 max-w-7xl">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    [
                        {
                            Icon: Phone,
                            title: "Smart Telecalling",
                            description: "AI-powered calls that sound natural and engage potential customers",
                            content:
                                "Our advanced AI technology creates human-like conversations that adapt to customer responses in real-time.",
                        },
                        {
                            Icon: MessageSquare,
                            title: "Customizable Scripts",
                            description:
                                "Tailor-made scripts that suit your business needs and customer preferences.",
                            content:
                                "Create personalized scripts that resonate with your audience and drive engagement.",
                        },
                        {
                            Icon: Bot,
                            title: "24/7 Availability",
                            description: "Never miss an opportunity with round-the-clock telecalling",
                            content:
                                "AI Telecaller works tirelessly to reach your audience at the optimal times, increasing conversion rates.",
                        },
                    ].map(({ Icon, title, description, content }, idx) => (
                        <Card key={idx} className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md hover:shadow-xl 
                        hover:scale-[1.10] transition-transform duration-300 ease-in-out 
                        border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                            <CardHeader className="space y-2">



                                <Icon className="h-12 w-12 text-emerald-600 mb-1 dark:text-emerald-300" />
                                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                                    {description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p className="text-gray-700 dark:text-gray-300 text-base ">{content}</p>
                            </CardContent>

                        </Card>

                    ))






                }
            </div>

        </section>
    )
}