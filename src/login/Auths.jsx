import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export default function AuthProvider() {
  const [showRegister, setShowRegister] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Super Admin Portal</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Secure access to administrative controls</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold text-center">
              {showRegister ? "Create Account" : "Sign In"}
            </CardTitle>
            <CardDescription className="text-center">
              {showRegister
                ? "Register for admin access"
                : "Enter your credentials to access the admin dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showRegister ? <RegisterForm /> : <LoginForm />}
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowRegister(!showRegister)}
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            {showRegister
              ? "Already have an account? Sign in"
              : "Don’t have an account? Register here"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  )
}
 