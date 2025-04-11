import {Navbar} from "@/app/components/navbar";
import { HeroSection } from "@/app/components/hero-section";
import { CardSection } from "@/app/components/card-section";
import { CallSection } from "./components/call-section";
export default function home(){

  return (
    <div className="min-h-screen bg-gradient-to-b
     from-gray-50 to-gray-100  ">

      <main>

      <HeroSection />
      <CardSection />



      </main>
     
    </div>
  )
}