import React from "react"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { TrendingUp, Clock, Shield, Users } from "lucide-react"

export  default function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "95% Time Savings",
      description: "Reduce attendance taking from 10 minutes to 30 seconds per class",
      color: "bg-green-500",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Instant synchronization across all devices and platforms",
      color: "bg-blue-500",
    },
    {
      icon: Shield,
      title: "99.9% Accuracy",
      description: "Eliminate human errors with automated barcode recognition",
      color: "bg-purple-500",
    },
    {
      icon: Users,
      title: "500+ Schools",
      description: "Trusted by educational institutions worldwide",
      color: "bg-orange-500",
    },
  ]

  return (
    <section id="benefits" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-white/20 text-white mb-4">
            📊 Proven Results
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Schools Choose Our System
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of educational institutions that have transformed their attendance management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-blue-100">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
