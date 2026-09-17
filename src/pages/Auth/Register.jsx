import { Briefcase, Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
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
              Create your account
            </h1>

            <p className="mt-2 text-sm text-[#5B6472]">
              Start finding opportunities that fit your goals.
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#171B26]"
              >
                Full name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA3AF]"
                />

                <input
                  id="name"
                  type="text"
                  placeholder="Muhammad Areeb"
                  className="w-full rounded-md border border-[#E4E7E2] bg-white py-3 pl-10 pr-4 text-sm text-[#171B26] outline-none transition placeholder:text-[#9AA3AF] focus:border-[#1F6F5C] focus:ring-2 focus:ring-[#1F6F5C]/10"
                />
              </div>
            </div>

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
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#171B26]"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA3AF]"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
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

            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-[#171B26]"
              >
                I want to
              </label>

              <select
                id="role"
                defaultValue="candidate"
                className="w-full rounded-md border border-[#E4E7E2] bg-white px-4 py-3 text-sm text-[#171B26] outline-none transition focus:border-[#1F6F5C] focus:ring-2 focus:ring-[#1F6F5C]/10"
              >
                <option value="candidate">Find a job</option>
                <option value="recruiter">Hire talent</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#E4572E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#cc4a25]"
            >
              Create account
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#5B6472]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#1F6F5C] hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
