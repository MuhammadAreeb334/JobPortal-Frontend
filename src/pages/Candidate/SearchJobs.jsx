import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FireAPI } from "../../services/api";

const SearchJobs = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const [jobs, setJobs] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const fetchJobs = async (currentPage = 1) => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (keyword.trim()) {
        params.set("keyword", keyword.trim());
      }

      if (location.trim()) {
        params.set("location", location.trim());
      }

      params.set("page", currentPage);
      params.set("limit", 9);

      const response = await FireAPI(`jobs?${params.toString()}`, "GET");

      setJobs(response.jobs || []);
      setPage(response.currentPage || 1);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.log("Get Jobs Error:", error);

      toast.error(error?.message || "Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(1);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    fetchJobs(1);
  };

  return (
    <section className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="text-sm font-medium text-[var(--color-accent)]">
            Find Opportunities
          </p>

          <h1
            className="mt-2 text-4xl font-medium text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Search jobs
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-ink-muted)]">
            Find open positions that match your skills, experience, and
            location.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5"
        >
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]"
              />

              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, skill, or keyword"
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] py-3 pl-10 pr-4 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
              />
            </div>

            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]"
              />

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] py-3 pl-10 pr-4 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
            >
              <Search size={17} />
              Search
            </button>
          </div>
        </form>

        <div className="mt-8">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <p className="text-sm text-[var(--color-ink-muted)]">
                Loading jobs...
              </p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-16 text-center">
              <BriefcaseBusiness
                size={36}
                className="mx-auto text-[var(--color-ink-muted)]"
              />

              <h2 className="mt-4 text-lg font-semibold text-[var(--color-ink)]">
                No jobs found
              </h2>

              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                Try a different keyword or location.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <article
                    key={job._id}
                    className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[var(--color-surface-alt)] text-[var(--color-primary)]">
                      {job.company?.logo?.url ? (
                        <img
                          src={job.company.logo.url}
                          alt={job.company.name || "Company"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <BriefcaseBusiness size={20} />
                      )}
                    </div>

                    <div className="mt-5">
                      <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                        {job.title}
                      </h2>

                      <p className="mt-1 text-sm text-[var(--color-primary)]">
                        {job.company?.name || "Company"}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[var(--color-surface-alt)] px-3 py-1 text-xs text-[var(--color-ink-muted)]">
                          {job.jobType}
                        </span>

                        <span className="rounded-full bg-[var(--color-surface-alt)] px-3 py-1 text-xs text-[var(--color-ink-muted)]">
                          {job.experience}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-ink-muted)]">
                        <MapPin size={16} />
                        {job.location}
                      </div>

                      <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
                        Salary: {job.salary}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                      <Link
                        to={`/jobs/${job._id}`}
                        className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                      >
                        View job details →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => fetchJobs(page - 1)}
                    className="inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  <span className="text-sm text-[var(--color-ink-muted)]">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => fetchJobs(page + 1)}
                    className="inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm disabled:opacity-40"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchJobs;
