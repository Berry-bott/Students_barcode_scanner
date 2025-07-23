import React from "react";
import { Card } from "../components/ui/card";
import { CardContent } from "../components/ui/card";
import { CardDescription } from "../components/ui/card";
import { CardHeader } from "../components/ui/card";
import { CardTitle } from "../components/ui/card";

import {
  Scan,
  Clock,
  Shield,
  BarChart3,
  Smartphone,
  Cloud,
  Users,
  Zap,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Advanced Barcode Scanning",
    description:
      "High-precision barcode recognition with support for multiple formats including QR codes and traditional barcodes.",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description:
      "Instant attendance recording with automatic timestamp and status detection for late arrivals.",
  },
  {
    icon: Shield,
    title: "Secure Data Storage",
    description:
      "Enterprise-grade security with encrypted data transmission and secure cloud storage.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Comprehensive reporting with attendance trends, statistics, and exportable reports.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description:
      "Works seamlessly on all devices - tablets, smartphones, and desktop computers.",
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description:
      "Automatic cloud backup and synchronization across multiple devices and locations.",
  },
  {
    icon: Users,
    title: "Multi-user Support",
    description:
      "Support for multiple teachers, administrators, and classes with role-based access control.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Sub-second scanning and processing with optimized performance for high-volume usage.",
  },
  {
    icon: CheckCircle,
    title: "99.9% Accuracy",
    description:
      "Industry-leading accuracy with advanced error detection and duplicate prevention.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage attendance efficiently and effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
