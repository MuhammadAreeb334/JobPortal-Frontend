import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FireAPI } from "../../services/api";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const response = await FireAPI(`jobs/${id}`, "GET");

        setJob(response.job);
      } catch (error) {
        console.log("Get Job Details Error:", error);

        toast.error(error?.message || "Unable to load job.");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();

    if (!user?.resume?.url) {
      toast.error("Please upload your resume before applying.");
      navigate("/candidate/resume");
      return;
    }

    setApplying(true);

    try {
      await FireAPI("application", "POST", {
        jobId: id,
        coverLetter,
      });

      toast.success("Application submitted successfully");

      setCoverLetter("");

      navigate("/candidate/applied-jobs");
    } catch (error) {
      console.log("Apply Job Error:", error);

      toast.error(error?.message || "Unable to submit application.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-[var(--color-ink-muted)]">Loading job...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-[var(--color-ink)]">
          Job not found
        </h1>

        <Link
          to="/jobs"
          className="mt-4 inline-block text-sm font-semibold text-[var(--color-primary)]"
        >
          Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={16} />
          Back to jobs
        </Link>

        <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[var(--color-surface-alt)] text-[var(--color-primary)]">
              {job.company?.logo?.url ? (
                <img
                  src={job.company.logo.url}
                  alt={job.company.name || "Company"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <BriefcaseBusiness size={24} />
              )}
            </div>

            <div>
              <h1
                className="text-3xl font-medium text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {job.title}
              </h1>

              <p className="mt-2 text-sm font-medium text-[var(--color-primary)]">
                {job.company?.name}
              </p>

              <div className="mt-3 flex flex-wrap gap-3 text-sm text-[var(--color-ink-muted)]">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={15} />
                  {job.location}
                </span>

                <span>{job.jobType}</span>

                <span>{job.experience}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            <div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                  Job Description
                </h2>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--color-ink-muted)]">
                  {job.description}
                </p>
              </div>

              {job.requirements?.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                    Requirements
                  </h2>

                  <ul className="mt-4 space-y-3">
                    {job.requirements.map((requirement, index) => (
                      <li
                        key={`${requirement}-${index}`}
                        className="flex gap-2 text-sm text-[var(--color-ink-muted)]"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-[var(--color-primary)]"
                        />

                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.skills?.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                    Skills
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[var(--color-surface-alt)] px-3 py-1.5 text-xs text-[var(--color-ink-muted)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="h-fit rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
              <h2 className="text-base font-semibold text-[var(--color-ink)]">
                Apply for this job
              </h2>

              {!user?.resume?.url ? (
                <div className="mt-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                  <p className="text-sm leading-6 text-[var(--color-ink-muted)]">
                    You need to upload your resume before applying.
                  </p>

                  <Link
                    to="/candidate/resume"
                    className="mt-3 inline-block text-sm font-semibold text-[var(--color-primary)]"
                  >
                    Upload resume →
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleApply} className="mt-5">
                  <label
                    htmlFor="coverLetter"
                    className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
                  >
                    Cover letter
                  </label>

                  <textarea
                    id="coverLetter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={7}
                    maxLength={5000}
                    placeholder="Tell the recruiter why you are a good fit..."
                    className="w-full resize-none rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-3 text-sm leading-6 text-[var(--color-ink)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
                  />

                  <button
                    type="submit"
                    disabled={applying}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] disabled:opacity-60"
                  >
                    <Send size={17} />

                    {applying ? "Applying..." : "Submit Application"}
                  </button>
                </form>
              )}

              <div className="mt-5 border-t border-[var(--color-border)] pt-5">
                <p className="text-sm text-[var(--color-ink-muted)]">
                  Salary:{" "}
                  <span className="font-medium text-[var(--color-ink)]">
                    {job.salary}
                  </span>
                </p>

                {job.deadline && (
                  <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                    Deadline:{" "}
                    <span className="font-medium text-[var(--color-ink)]">
                      {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
