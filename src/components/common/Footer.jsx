import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#171B26] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1F6F5C]">
                <Briefcase size={18} />
              </div>
              <span
                className="text-lg font-semibold"
                style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
              >
                JobPortal
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#9AA3AF]">
              A straightforward place to find real openings and hire people who
              fit, without the noise.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">For candidates</h3>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/jobs"
                className="text-sm text-[#9AA3AF] transition hover:text-white"
              >
                Browse jobs
              </Link>
              <Link
                to="/register"
                className="text-sm text-[#9AA3AF] transition hover:text-white"
              >
                Create an account
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">For recruiters</h3>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/register"
                className="text-sm text-[#9AA3AF] transition hover:text-white"
              >
                Post a job
              </Link>
              <Link
                to="/login"
                className="text-sm text-[#9AA3AF] transition hover:text-white"
              >
                Recruiter login
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#727C89]">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
