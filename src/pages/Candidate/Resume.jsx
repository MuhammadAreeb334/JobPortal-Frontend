import { CheckCircle2, FileText, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { FireAPI } from "../../services/api";

const Resume = () => {
  const { user, getCurrentUser } = useAuth();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const resume = user?.resume;

  useEffect(() => {
    return () => {
      if (file) {
      }
    };
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      e.target.value = "";
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Resume must be 5 MB or smaller.");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a PDF resume.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      await FireAPI("uploads/resume", "PATCH", formData);

      await getCurrentUser();

      setFile(null);

      e.target.reset();

      toast.success("Resume uploaded successfully");
    } catch (error) {
      console.log("Resume Upload Error:", error);

      toast.error(error?.message || "Unable to upload resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-[var(--color-accent)]">
          Candidate Profile
        </p>

        <h1
          className="mt-2 text-4xl font-medium text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your resume
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-ink-muted)]">
          Upload a current PDF resume. Your resume will be attached
          automatically when you apply for jobs.
        </p>

        <div className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          {resume?.url ? (
            <div className="flex flex-col gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-surface-alt)] text-[var(--color-primary)]">
                  <FileText size={21} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[var(--color-ink)]">
                    Resume uploaded
                  </p>

                  <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                    Your current resume is ready for job applications.
                  </p>
                </div>
              </div>

              <a
                href={resume.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[var(--color-primary)]"
              >
                View Resume →
              </a>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[var(--color-border)] p-8 text-center">
              <FileText
                size={34}
                className="mx-auto text-[var(--color-ink-muted)]"
              />

              <h2 className="mt-4 text-base font-semibold text-[var(--color-ink)]">
                No resume uploaded
              </h2>

              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                Upload your resume before applying for jobs.
              </p>
            </div>
          )}

          <form onSubmit={handleUpload} className="mt-8">
            <label
              htmlFor="resume"
              className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
            >
              {resume?.url ? "Replace resume" : "Upload resume"}
            </label>

            <input
              id="resume"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="block w-full cursor-pointer rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[var(--color-ink-muted)] file:mr-4 file:border-0 file:bg-[var(--color-surface-alt)] file:px-4 file:py-3 file:text-sm file:font-medium file:text-[var(--color-ink)]"
            />

            <p className="mt-2 text-xs text-[var(--color-ink-muted)]">
              PDF only. Maximum file size: 5 MB.
            </p>

            {file && (
              <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-primary)]">
                <CheckCircle2 size={17} />
                {file.name}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !file}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Upload size={17} />
              {loading
                ? "Uploading..."
                : resume?.url
                  ? "Replace Resume"
                  : "Upload Resume"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Resume;
