import { useForm } from 'react-hook-form';

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

  const onSubmit = (data: FormValues) => {
    console.log('Registration data:', data);
  };

  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Left Side - Form (4/12) */}
      <div className="col-span-12 md:col-span-4 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a new account</h1>
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in now →
              </a>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters',
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.name
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Username</label>
              <input
                type="text"
                placeholder="john.doe"
                {...register('username', {
                  required: 'Username is required',
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.username
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
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
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Password must have 1 capital letter, 1 number, 1 special character, and at least 8 characters',
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.password
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Hold <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl</kbd> to show your password.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/20"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image (8/12) */}
      <div className="col-span-12 md:col-span-8 hidden md:block">
        <img
          src="/assets/login-image.jpg"
          alt="Registration Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
