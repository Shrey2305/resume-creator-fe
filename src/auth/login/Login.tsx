import React, { useState, useEffect } from "react";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  loading?: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, loading = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tempShowPassword, setTempShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(email, password);
    }
  };

  // Handle Control key press to show password temporarily
  const handleControlKeyPress = () => {
    setTempShowPassword(true);

    // Hide password after 2 seconds
    setTimeout(() => {
      setTempShowPassword(false);
    }, 2000);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only Control key (without any other key) to temporarily show password
      if ((e.ctrlKey || e.metaKey) && e.key === "Control") {
        e.preventDefault();
        handleControlKeyPress();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Trigger on Control key release as well for better UX
      if (e.key === "Control") {
        handleControlKeyPress();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Determine if password should be visible
  const passwordVisible = showPassword || tempShowPassword;

  return (

    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg p-14">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-bold text-sm mr-3">
              Rx
            </div>
            <span className="text-white font-semibold text-lg">Resume</span>
          </div>

          <h1 className="text-white text-3xl font-light mb-2">
            Sign in to your account
          </h1>
          <p className="text-gray-300 text-sm">
            Don't have an account?{" "}
              <button className="text-white hover:underline transition-all duration-200">
                Create one now →
              </button>
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-white text-sm font-medium leading-none"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-base text-white placeholder:text-gray-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email}</p>
            )}
            <p className="text-gray-400 text-xs">
              You can also enter your username.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-white text-sm font-medium leading-none"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-base text-white placeholder:text-gray-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                {passwordVisible ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs">{errors.password}</p>
            )}
            <p className="text-gray-400 text-xs">
              Hold Ctrl to display your password temporarily.
            </p>
            {tempShowPassword && (
              <p className="text-green-400 text-xs animate-pulse">
                Password visible for 2 seconds...
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-gray-200 h-10 px-8 py-2"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <button
              type="button"
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block lg:flex-1">
        <img
          width={1820}
          height={1080}
          alt="Open books on a table"
          className="h-screen w-full object-cover object-center"
          src="../../assets/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg"
        />

        <div className="absolute bottom-5 right-5 z-10 bg-primary/30 px-4 py-2 text-xs font-medium text-primary-foreground backdrop-blur-sm">
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://unsplash.com/photos/Oaqk7qqNh_c"
          >
            {`Photograph by Patrick Tomasso`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
