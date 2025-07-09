
import { HeroSection } from "@/app/components/hero-section";
import { CardSection } from "@/app/components/card-section";

export default function home(){

  return (
    <div className="min-h-screen bg-gradient-to-b
     from-gray-50 to-gray-100 dark:from-[#0d0d0d] dark:to-[#1a1a1a]
" >
      <main>
      <HeroSection />
      <CardSection />
      </main>
     
    </div>
  )
}