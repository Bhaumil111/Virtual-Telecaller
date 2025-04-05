import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { Button } from "@/components/ui/button"
import { Bot, MessageSquare, Phone } from "lucide-react"

export function CardSection() {

    return (

        <section className="mx-auto  px-4 py-12 text-black">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4  ">
                <Card className="shadow-lg  hover:shadow-2xl   duration-300  ease-in-out bg-white ">
                    <CardHeader>
                        <Phone className="h-12 w-12 text-emerald-600 mb-2" />
                        <CardTitle>Smart Telecalling</CardTitle>
                        <CardDescription>AI-powered calls that sound natural and engage potential customers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Our advanced AI technology creates human-like conversations that adapt to customer responses in real-time.
                        </p>
                    </CardContent>
                </Card>



                <Card className="shadow-lg  hover:shadow-2xl   duration-300  ease-in-out bg-white ">
                    <CardHeader>
                        <MessageSquare className="h-12 w-12 text-emerald-600 mb-2" />
                        <CardTitle>Customizable Scripts</CardTitle>
                        <CardDescription>
                            Tailor-made scripts that suit your business needs and customer preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Create personalized scripts that resonate with your audience and drive engagement.
                        </p>
                    </CardContent>


                </Card>


                <Card className="shadow-lg  hover:shadow-2xl   duration-300  ease-in-out bg-white ">
                    <CardHeader>
                        <Bot className="h-12 w-12 text-emerald-600 mb-2" />
                        <CardTitle>24/7 Availability</CardTitle>
                        <CardDescription>Never miss an opportunity with round-the-clock telecalling</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>
                            AI Telecaller works tirelessly to reach your audience at the optimal times, increasing conversion rates.
                        </p>
                    </CardContent>
                </Card>
            </div>

        </section>
    )
}