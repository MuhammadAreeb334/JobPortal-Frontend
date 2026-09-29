import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FireAPI } from "../../services/api";

const statusClasses = {
  Pending: "bg-yellow-50 text-yellow-700",
  Reviewed: "bg-blue-50 text-blue-700",
  Interview: "bg-purple-50 text-purple-700",
  Accepted: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [withdrawingId, setWithdrawingId] = useState(null);

  const fetchApplications = async () => {
    try {
      const response = await FireAPI("application/my-applications", "GET");

      setApplications(response.applications || []);
    } catch (error) {
      console.log("Get Applications Error:", error);

      toast.error(error?.message || "Unable to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleWithdraw = async (applicationId) => {
    setWithdrawingId(applicationId);

    try {
      await FireAPI(`applications/${applicationId}`, "DELETE");

      setApplications((previous) =>
        previous.filter((application) => application._id !== applicationId),
      );

      toast.success("Application withdrawn");
    } catch (error) {
      console.log("Withdraw Application Error:", error);

      toast.error(error?.message || "Unable to withdraw application.");
    } finally {
      setWithdrawingId(null);
    }
  };

  return (
    <section className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-[var(--color-accent)]">
          Candidate Workspace
        </p>

        <h1
          className="mt-2 text-4xl font-medium text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Applied jobs
        </h1>

        <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
          Track your applications and their current status.
        </p>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <p className="text-sm text-[var(--color-ink-muted)]">
              Loading applications...
            </p>
          </div>
        ) : applications.length === 0 ? (
          <div className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-16 text-center">
            <BriefcaseBusiness
              size={36}
              className="mx-auto text-[var(--color-ink-muted)]"
            />

            <h2 className="mt-4 text-lg font-semibold text-[var(--color-ink)]">
              No applications yet
            </h2>

            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
              Find a job and submit your first application.
            </p>

            <Link
              to="/jobs"
              className="mt-5 inline-block rounded-md bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white"
            >
              Find Jobs
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {applications.map((application) => {
              const job = application.job;

              if (!job) return null;

              const statusClass =
                statusClasses[application.status] || "bg-gray-50 text-gray-700";

              return (
                <article
                  key={application._id}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[var(--color-surface-alt)] text-[var(--color-primary)]">
                        {job.company?.logo?.url ? (
                          <img
                            src={job.company.logo.url}
                            alt={job.company.name || "Company"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <BriefcaseBusiness size={21} />
                        )}
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                          {job.title}
                        </h2>

                        <p className="mt-1 text-sm text-[var(--color-primary)]">
                          {job.company?.name}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-3 text-sm text-[var(--color-ink-muted)]">
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={15} />
                            {job.location}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <CalendarDays size={15} />
                            Applied{" "}
                            {new Date(
                              application.createdAt,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1.5 text-xs font-medium ${statusClass}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-4">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="text-sm font-semibold text-[var(--color-primary)]"
                    >
                      View Job
                    </Link>

                    {application.status !== "Accepted" &&
                      application.status !== "Rejected" && (
                        <button
                          type="button"
                          disabled={withdrawingId === application._id}
                          onClick={() => handleWithdraw(application._id)}
                          className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] disabled:opacity-50"
                        >
                          <RotateCcw size={15} />
                          {withdrawingId === application._id
                            ? "Withdrawing..."
                            : "Withdraw"}
                        </button>
                      )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AppliedJobs;
