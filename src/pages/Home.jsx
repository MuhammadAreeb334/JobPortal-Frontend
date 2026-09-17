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
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div>
            <h1
              className="max-w-xl text-[2.75rem] font-medium leading-[1.1] text-[#171B26] sm:text-6xl"
              style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
            >
              Work that fits the life you're building.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-7 text-[#5B6472]">
              Browse open roles from companies that are actually hiring, and
              apply in a few minutes with a profile you build once.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-md bg-[#1F6F5C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#195c4c]"
              >
                Find jobs
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-[#171B26] underline decoration-[#E4E7E2] decoration-2 underline-offset-4 transition hover:decoration-[#1F6F5C]"
              >
                Post a job instead
              </Link>
            </div>

            <div className="mt-12 flex divide-x divide-[#E4E7E2]">
              <div className="pr-6">
                <p className="text-2xl font-semibold text-[#171B26]">1,200+</p>
                <p className="mt-1 text-sm text-[#5B6472]">Open jobs</p>
              </div>
              <div className="px-6">
                <p className="text-2xl font-semibold text-[#171B26]">500+</p>
                <p className="mt-1 text-sm text-[#5B6472]">Companies</p>
              </div>
              <div className="pl-6">
                <p className="text-2xl font-semibold text-[#171B26]">5,400+</p>
                <p className="mt-1 text-sm text-[#5B6472]">Candidates</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E4E7E2] bg-[#F3F5F1] p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#171B26]">
                Recently posted
              </p>
              <Link
                to="/jobs"
                className="text-sm font-medium text-[#1F6F5C] hover:underline"
              >
                See all
              </Link>
            </div>

            <div className="mt-4 divide-y divide-[#E4E7E2] rounded-xl border border-[#E4E7E2] bg-white">
              {listings.map((job) => (
                <Link
                  key={job.title}
                  to="/jobs"
                  className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-[#F9FAF8]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#171B26]">
                      {job.title}
                    </p>
                    <p className="mt-1 truncate text-sm text-[#5B6472]">
                      {job.company} · {job.meta}
                    </p>
                  </div>
                  <ArrowRight size={16} className="shrink-0 text-[#9AA3AF]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[#E4E7E2] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2
            className="max-w-lg text-3xl font-medium leading-tight text-[#171B26] sm:text-4xl"
            style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
          >
            Everything you need, nothing you don't.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#E4E7E2] bg-[#E4E7E2] sm:grid-cols-3">
            <div className="border-l-4 border-[#1F6F5C] bg-white p-8">
              <Filter size={22} className="text-[#1F6F5C]" />
              <h3 className="mt-5 text-lg font-semibold text-[#171B26]">
                Search that narrows fast
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5B6472]">
                Filter by role, location, and job type to see only the openings
                worth your time.
              </p>
            </div>

            <div className="border-l-4 border-[#E4572E] bg-white p-8">
              <Handshake size={22} className="text-[#E4572E]" />
              <h3 className="mt-5 text-lg font-semibold text-[#171B26]">
                Apply without repeating yourself
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5B6472]">
                Build your profile once, attach a resume, and apply to new roles
                in a couple of clicks.
              </p>
            </div>

            <div className="border-l-4 border-[#171B26] bg-white p-8">
              <LayoutGrid size={22} className="text-[#171B26]" />
              <h3 className="mt-5 text-lg font-semibold text-[#171B26]">
                Hiring in one dashboard
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5B6472]">
                Recruiters post roles, review applicants, and manage the whole
                pipeline from a single place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#171B26]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20 lg:px-8">
          <h2
            className="text-3xl font-medium text-white sm:text-4xl"
            style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
          >
            Ready for what's next?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[#9AA3AF]">
            Create your account and start applying, or post your first job in
            under five minutes.
          </p>
          <Link
            to="/register"
            className="mt-9 inline-flex items-center gap-2 rounded-md bg-[#E4572E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#cc4a25]"
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
