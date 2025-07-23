import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import Features from "./Features";
import Benefits from "./Benefits";
import Navbar from "../Barcodescanner/Navbar";
import Footer from "./Footer";
import Barcodescanner from "../Barcodescanner/Scanner";

export default function Home() {
  return (
    <>
      {/* Navbar section */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="pt-20 sm:pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8 text-center lg:text-left">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 mx-auto lg:mx-0 w-fit"
              >
                🚀 Now Available
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Smart Barcode <span className="text-blue-600">Attendance</span>
                <br className="hidden sm:block" />
                Monitoring System
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                Streamline your attendance tracking with our advanced barcode
                scanning technology. Fast, accurate, and reliable attendance
                management for educational institutions.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Try Live Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Video
                </Button>
              </div>

              {/* Home-Features */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>99.9% Accuracy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time Sync</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cloud Storage</span>
                </div>
              </div>
            </div>

            {/* Right Column - Illustration */}
            {/* BARCODE SCANNER IMPLIMENTATION */}
            <div className="relative mx-auto w-full max-w-[430px] sm:max-w-[500px] sm:max-h-[600px]  h-[500px] sm:h-[422px] border border-b rounded-2xl overflow-hidden shadow-2xl">
              <h1
                className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent
               bg-clip-text tracking-wide drop-shadow-2xl uppercase font-poppins mb-6 mt-3"
              >
                Scan Barcode
              </h1>

              <Barcodescanner />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <Features />
      </section>

      {/* Benefits Section */}
      <section>
        <Benefits />
      </section>

      {/* Footer Section */}
      <section>
        <Footer />
      </section>
    </>
  );
}
