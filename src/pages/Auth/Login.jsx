import { Briefcase, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-[calc(100vh-64px)] bg-[#F3F5F1] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-[#E4E7E2] bg-white p-6 sm:p-8">
          <div className="flex justify-center">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1F6F5C] text-white">
                <Briefcase size={18} />
              </div>

              <span
                className="text-lg font-semibold text-[#171B26]"
                style={{
                  fontFamily: "'Fraunces', ui-serif, Georgia, serif",
                }}
              >
                JobPortal
              </span>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <h1
              className="text-3xl font-medium text-[#171B26]"
              style={{
                fontFamily: "'Fraunces', ui-serif, Georgia, serif",
              }}
            >
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-[#5B6472]">
              Log in to continue to your account.
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#171B26]"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA3AF]"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-[#E4E7E2] bg-white py-3 pl-10 pr-4 text-sm text-[#171B26] outline-none transition placeholder:text-[#9AA3AF] focus:border-[#1F6F5C] focus:ring-2 focus:ring-[#1F6F5C]/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#171B26]"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#1F6F5C] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA3AF]"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-md border border-[#E4E7E2] bg-white py-3 pl-10 pr-11 text-sm text-[#171B26] outline-none transition placeholder:text-[#9AA3AF] focus:border-[#1F6F5C] focus:ring-2 focus:ring-[#1F6F5C]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA3AF] transition hover:text-[#171B26]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#1F6F5C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#195c4c]"
            >
              Log in
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#5B6472]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#1F6F5C] hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
