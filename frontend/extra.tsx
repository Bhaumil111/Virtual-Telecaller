import { Upload, Phone, MessageSquare, Bot, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          AI <span className="text-emerald-600">Telecaller</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The AI-powered virtual telecaller that advertises your business effectively
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our AI Telecaller?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Phone className="h-12 w-12 text-emerald-600 mb-2" />
              <CardTitle>Smart Telecalling</CardTitle>
              <CardDescription>AI-powered calls that sound natural and engage potential customers</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our advanced AI technology creates human-like conversations that adapt to customer responses in
                real-time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-emerald-600 mb-2" />
              <CardTitle>Customizable Scripts</CardTitle>
              <CardDescription>Tailor your messaging to match your brand voice and business goals</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Upload your business information and customize how AI Telecaller represents your company to potential
                customers.
              </p>
            </CardContent>
          </Card>

          <Card>
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

      {/* Upload and Configuration Section */}
      <section className="container mx-auto px-4 py-12 bg-white rounded-lg shadow-sm my-12">
        <h2 className="text-3xl font-bold text-center mb-8">Configure Your AI Telecaller</h2>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upload">Business Information</TabsTrigger>
              <TabsTrigger value="prompt">System Prompt</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <h3 className="text-xl font-medium mb-4">Upload Your Business Information</h3>
              <p className="text-gray-600 mb-6">
                Provide details about your business that AI Telecaller will use to create effective advertising calls.
              </p>

              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Upload Text File
                    </CardTitle>
                    <CardDescription>Upload a .txt file containing information about your business</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <FileText className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">Drag and drop your .txt file here, or click to browse</p>
                      <Input type="file" accept=".txt" className="hidden" id="file-upload" />
                      <Button asChild variant="outline">
                        <label htmlFor="file-upload" className="cursor-pointer">
                          Browse Files
                        </label>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Write Business Information
                    </CardTitle>
                    <CardDescription>Type or paste information about your business directly</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Describe your business, products/services, unique selling points, target audience, and any specific messaging you want to include..."
                      className="min-h-[200px]"
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="prompt" className="space-y-6">
              <h3 className="text-xl font-medium mb-4">Configure System Prompt</h3>
              <p className="text-gray-600 mb-6">
                Define how AI Telecaller should represent your business during calls. This helps shape the AI's
                personality and approach.
              </p>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    System Prompt
                  </CardTitle>
                  <CardDescription>Instructions for how AI Telecaller should behave and communicate</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Example: You are AI Telecaller, a friendly and professional telecaller for [Company Name]. You should introduce yourself, explain the benefits of our [Product/Service], and politely ask if they're interested in learning more. Respond to objections with understanding and provide clear information about our offerings."
                    className="min-h-[200px]"
                  />
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    The system prompt helps define AI Telecaller's tone, approach, and how it handles different
                    scenarios during calls.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-8">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Create My AI Telecaller
            </Button>
          </div>
        </div>
      </section>

      {/* Call Initiation Section */}
      <section className="container mx-auto px-4 py-12 bg-white rounded-lg shadow-sm my-12">
        <h2 className="text-3xl font-bold text-center mb-8">Initiate a Call</h2>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Settings
              </CardTitle>
              <CardDescription>Enter the source and destination numbers to start a call</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="source-number" className="text-sm font-medium">
                  Source Call Number
                </label>
                <Input id="source-number" type="tel" placeholder="Enter source phone number" />
              </div>

              <div className="space-y-2">
                <label htmlFor="destination-number" className="text-sm font-medium">
                  Destination Call Number
                </label>
                <Input id="destination-number" type="tel" placeholder="Enter destination phone number" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Phone className="h-4 w-4 mr-2" />
                Initiate Call
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Testimonials or Additional Info */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">See AI Telecaller in Action</h2>
        <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-lg mb-2">Sample Telecaller Script:</h3>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="italic text-gray-700">
              "Hello! This is AI Telecaller calling from [Your Company]. We specialize in [your services] that help
              businesses like yours [benefit]. Our clients have seen [specific results] after working with us. Would you
              be interested in learning how we could help your business grow?"
            </p>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            This is just a sample of how the AI Telecaller might sound. Your actual telecaller will be customized based
            on your business information and system prompt.
          </p>
        </div>
      </section>
    </main>
  )
}

