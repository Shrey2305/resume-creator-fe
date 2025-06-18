import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../../features/auth/authService';

type FormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onTouched',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [tempShowPassword, setTempShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState('');


const onSubmit = async (data: FormValues) => {
    setLoading(true);
  setErrorMsg('');
  try {
    const response = await registerUser(data);
    console.log('Registration successful:', response);
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error.message);
  }finally {
    setLoading(false);
  }
};

  const handleControlKeyPress = () => {
    setTempShowPassword(true);
    setTimeout(() => setTempShowPassword(false), 2000);
  };

  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Control') {
        e.preventDefault();
        handleControlKeyPress();
      }
    };
    const upHandler = (e: KeyboardEvent) => {
      if (e.key === 'Control') handleControlKeyPress();
    };

    document.addEventListener('keydown', downHandler);
    document.addEventListener('keyup', upHandler);
    return () => {
      document.removeEventListener('keydown', downHandler);
      document.removeEventListener('keyup', upHandler);
    };
  }, []);

  const passwordVisible = showPassword || tempShowPassword;

  return (
<>
    {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
{loading && <p className="text-gray-600 text-sm">Registering...</p>}

    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      {/* Content */}
      <div className="relative z-10 w-full max-w-lg px-14">
        {/* Branding and Title */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center font-bold text-sm mr-3">
              Rx
            </div>
            <span className="text-black font-semibold text-lg">Resume</span>
          </div>

          <h1 className="text-black text-3xl font-light mb-2">
            Create a new account
          </h1>
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login">
              <button className="text-black hover:underline transition-all duration-200">
                Sign in now →
              </button>
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-black text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 3, message: 'Name must be at least 3 characters' },
              })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-base text-black placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="text-black text-sm font-medium">Username</label>
            <input
              type="text"
              placeholder="john.doe"
              {...register('username', { required: 'Username is required' })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-base text-black placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-black text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="john.doe@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-base text-black placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-black text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="********"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Password must have 1 capital letter, 1 number, 1 special character, and at least 8 characters',
                  },
                })}
                className="flex h-10 w-full rounded-md border px-3 py-2 text-base text-black placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-black pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
              >
                {passwordVisible ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            <p className="text-gray-500 text-xs">
              Hold Ctrl to display your password temporarily.
            </p>
            {tempShowPassword && (
              <p className="text-green-600 text-xs animate-pulse">
                Password visible for 2 seconds...
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800 rounded-md px-8 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Sign up
          </button>
        </form>
      </div>

      {/* Right image */}
      <div className="relative hidden lg:block lg:flex-1">
        <img
          src="../../assets/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg"
          alt="Visual"
          className="h-screen w-full object-cover object-center"
        />
        <div className="absolute bottom-5 right-5 z-10 bg-primary/30 px-4 py-2 text-xs font-medium text-primary-foreground backdrop-blur-sm">
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://unsplash.com/photos/Oaqk7qqNh_c"
          >
            Photograph by Patrick Tomasso
          </a>
        </div>
      </div>
    </div>
</>

  );
}
