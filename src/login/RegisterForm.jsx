import { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // make sure this exists
import {
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input, Label, Checkbox } from "../components/ui/formelments";
import { Alert, AlertDescription } from "../components/ui/alerts";
import { Progress } from "../components/ui/progress";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordStrength = calculatePasswordStrength(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Account created! Please check your email to confirm.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
          className="h-11"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="h-11"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="h-11 pr-10"
            disabled={loading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
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
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="remember"
          name="rememberMe"
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(!!checked)}
          disabled={loading}
        />
        <Label htmlFor="remember" className="text-sm">
          Remember me for 30 days
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Signing up...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Sign Up</span>
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
