import { useState } from "react";
import { Menu, X, ScanIcon } from "lucide-react";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import Features from './Features'
import Benefits from "./Benefits";
import Footer from "./Footer";
import Barcodescanner from "../Barcodescanner/Scanner";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <ScanIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">AttendanceTracker</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              {["home", "features", "benefits"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-600 hover:text-blue-600 transition font-medium"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
              <button

                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-semibold">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {["home", "features", "benefits"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left text-gray-600 hover:text-blue-600 py-2 transition font-medium"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
              <button className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 sm:pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column */}
            <div className="space-y-8 text-center lg:text-left">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 mx-auto lg:mx-0 w-fit">
                🚀 Now Available
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Smart Barcode <span className="text-blue-600">Attendance</span>
                <br className="hidden sm:block" />
                Monitoring System
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                Streamline your attendance tracking with our advanced barcode scanning technology. Fast, accurate, and
                reliable attendance management for educational institutions.
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
            <div className="relative mx-auto w-full max-w-[350px] sm:max-w-[400px] h-[300px] sm:h-[400px] border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
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
