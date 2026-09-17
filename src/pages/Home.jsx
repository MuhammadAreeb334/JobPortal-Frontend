import { ArrowRight, Filter, Handshake, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

const listings = [
  {
    title: "Senior Frontend Engineer",
    company: "Nimbus Technologies",
    meta: "Karachi · Remote",
  },
  {
    title: "Product Designer",
    company: "Layer Studio",
    meta: "Lahore · On-site",
  },
  {
    title: "Backend Engineer, Node.js",
    company: "Fintrust",
    meta: "Islamabad · Hybrid",
  },
];

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div>
            <h1
              className="max-w-xl text-[2.75rem] font-medium leading-[1.1] text-[var(--color-ink)] sm:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Work that fits the life you're building.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-7 text-[var(--color-ink-muted)]">
              Browse open roles from companies that are actually hiring, and
              apply in a few minutes with a profile you build once.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
              >
                Find jobs
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-[var(--color-ink)] underline decoration-[var(--color-border)] decoration-2 underline-offset-4 transition hover:decoration-[var(--color-primary)]"
              >
                Post a job instead
              </Link>
            </div>
            <div className="mt-12 flex divide-x divide-[var(--color-border)]">
              <div className="pr-6">
                <p className="text-2xl font-semibold text-[var(--color-ink)]">
                  1,200+
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                  Open jobs
                </p>
              </div>
              <div className="px-6">
                <p className="text-2xl font-semibold text-[var(--color-ink)]">
                  500+
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                  Companies
                </p>
              </div>
              <div className="pl-6">
                <p className="text-2xl font-semibold text-[var(--color-ink)]">
                  5,400+
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                  Candidates
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--color-ink)]">
                Recently posted
              </p>
              <Link
                to="/jobs"
                className="text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                See all
              </Link>
            </div>
            <div className="mt-4 divide-y divide-[var(--color-border)] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
              {listings.map((job) => (
                <Link
                  key={job.title}
                  to="/jobs"
                  className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-[var(--color-bg)]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--color-ink)]">
                      {job.title}
                    </p>
                    <p className="mt-1 truncate text-sm text-[var(--color-ink-muted)]">
                      {job.company} · {job.meta}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-[var(--color-ink-muted)]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2
            className="max-w-lg text-3xl font-medium leading-tight text-[var(--color-ink)] sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Everything you need, nothing you don't.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-3">
            <div className="border-l-4 border-[var(--color-primary)] bg-[var(--color-surface)] p-8">
              <Filter size={22} className="text-[var(--color-primary)]" />
              <h3 className="mt-5 text-lg font-semibold text-[var(--color-ink)]">
                Search that narrows fast
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
                Filter by role, location, and job type to see only the openings
                worth your time.
              </p>
            </div>
            <div className="border-l-4 border-[var(--color-accent)] bg-[var(--color-surface)] p-8">
              <Handshake size={22} className="text-[var(--color-accent)]" />
              <h3 className="mt-5 text-lg font-semibold text-[var(--color-ink)]">
                Apply without repeating yourself
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
                Build your profile once, attach a resume, and apply to new roles
                in a couple of clicks.
              </p>
            </div>
            <div className="border-l-4 border-[var(--color-ink)] bg-[var(--color-surface)] p-8">
              <LayoutGrid size={22} className="text-[var(--color-ink)]" />
              <h3 className="mt-5 text-lg font-semibold text-[var(--color-ink)]">
                Hiring in one dashboard
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
                Recruiters post roles, review applicants, and manage the whole
                pipeline from a single place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-dark)]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20 lg:px-8">
          <h2
            className="text-3xl font-medium text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready for what's next?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[var(--color-dark-muted)]">
            Create your account and start applying, or post your first job in
            under five minutes.
          </p>
          <Link
            to="/register"
            className="mt-9 inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-hover)]"
          >
            Get started
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
