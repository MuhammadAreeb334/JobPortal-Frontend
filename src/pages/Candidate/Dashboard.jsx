import { Briefcase, FileText, Search, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FireAPI } from "../../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [applicationCount, setApplicationCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationCount = async () => {
      try {
        const response = await FireAPI("application/my-applications", "GET");
        const apps = response.applications || [];
        setApplicationCount(apps.length);
      } catch (error) {
        console.log("Failed to fetch application count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationCount();
  }, []);

  const dashboardItems = [
    {
      title: "Find Jobs",
      description: "Search and explore jobs that match your skills.",
      icon: Search,
      to: "/jobs",
    },
    {
      title: "Applied Jobs",
      description: "Track the jobs you have applied to.",
      icon: FileText,
      to: "/candidate/applied-jobs",
    },
    {
      title: "Profile",
      description: "Update your personal information and skills.",
      icon: UserRound,
      to: "/candidate/profile",
    },
  ];

  return (
    <section className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--color-accent)]">
              Candidate Dashboard
            </p>

            <h1
              className="mt-2 text-4xl font-medium text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Welcome back, {user?.name?.split(" ")[0] || "there"}.
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-ink-muted)]">
              Keep track of your job search, applications, and profile from one
              place.
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-hover)]"
          >
            <Search size={17} />
            Find Jobs
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--color-ink-muted)]">
                Applications
              </p>

              <FileText size={20} className="text-[var(--color-primary)]" />
            </div>

            <p
              className="mt-4 text-3xl font-medium text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {loading ? "..." : applicationCount}
            </p>

            <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
              Jobs you have applied to
            </p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--color-ink-muted)]">Profile</p>

              <UserRound size={20} className="text-[var(--color-primary)]" />
            </div>

            <p
              className="mt-4 text-3xl font-medium text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Active
            </p>

            <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
              Keep your profile up to date
            </p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Your workspace
              </p>

              <h2
                className="mt-2 text-2xl font-medium text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Manage your job search
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {dashboardItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.to}
                  className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition hover:-translate-y-0.5 hover:border-[var(--color-primary)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-surface-alt)] text-[var(--color-primary)]">
                    <Icon size={21} />
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-[var(--color-ink)]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
                        {item.description}
                      </p>
                    </div>

                    <span className="text-lg text-[var(--color-ink-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--color-accent)]">
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-dark)] p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-[var(--color-dark-muted)]">
                <Briefcase size={17} />

                <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                  Resume
                </span>
              </div>

              <h2
                className="mt-3 text-2xl font-medium"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Make sure your resume is ready.
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--color-dark-muted)]">
                Add your latest resume so recruiters can see your experience
                when you apply for jobs.
              </p>
            </div>

            <Link
              to="/candidate/resume"
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-[var(--color-dark)] transition hover:bg-[var(--color-surface-alt)]"
            >
              Update resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
