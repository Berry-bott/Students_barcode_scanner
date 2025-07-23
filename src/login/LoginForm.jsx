

import { useState, useActionState } from "react";
import { Eye, EyeOff, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input, Label,Checkbox } from "../components/ui/formelments";
// import { Label } from "../components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "../components/ui/alerts";
import { Progress } from "../components/ui/progress";
// import { authenticateAdmin } from "@/app/actions/auth";
// import { TwoFactorInput } from "./two-factor-input";

export function LoginForm() {
  // const [state, formAction, isPending] = useActionState(authenticateAdmin, {});

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
const state = {
  error: null,
  success: false,
  fieldErrors: {},
  requiresTwoFactor: false,
}

const isPending = false
  


  const passwordStrength = calculatePasswordStrength(password);

  return (
    <form  className="space-y-4">
      {state?.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state?.success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Authentication successful! Redirecting...</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="h-11"
          placeholder="Enter your username"
          disabled={isPending}
        />
        {state?.fieldErrors?.username && (
          <p className="text-sm text-red-600">{state.fieldErrors.username[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className="h-11 pr-10"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isPending}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-slate-400" />
            ) : (
              <Eye className="h-4 w-4 text-slate-400" />
            )}
          </Button>
        </div>

        {password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Password strength</span>
              <span
                className={`font-medium ${
                  passwordStrength.score >= 3
                    ? "text-green-600"
                    : passwordStrength.score >= 2
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {passwordStrength.label}
              </span>
            </div>
            <Progress value={passwordStrength.score * 25} className="h-2" />
          </div>
        )}

        {state?.fieldErrors?.password && (
          <p className="text-sm text-red-600">{state.fieldErrors.password[0]}</p>
        )}
      </div>

      {state?.requiresTwoFactor && (
        <TwoFactorInput error={state.fieldErrors?.twoFactorCode?.[0]} />
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="remember"
          name="rememberMe"
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(!!checked)}
          disabled={isPending}
        />
        <Label
          htmlFor="remember"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me for 30 days
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        disabled={isPending}
      >
        {isPending ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Signing in...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Sign In</span>
          </div>
        )}
      </Button>

      <div className="text-center pt-4">
        <p className="text-xs text-slate-500">
          Having trouble? Contact your system administrator
        </p>
      </div>
    </form>
  );
}

function calculatePasswordStrength(password) {
  let score = 0;
  let label = "Very Weak";

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  switch (score) {
    case 0:
    case 1:
      label = "Very Weak";
      break;
    case 2:
      label = "Weak";
      break;
    case 3:
      label = "Fair";
      break;
    case 4:
      label = "Good";
      break;
    case 5:
      label = "Strong";
      break;
  }

  return { score, label };
}
