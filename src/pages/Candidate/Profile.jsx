import { Camera, MapPin, Save, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { FireAPI } from "../../services/api";

const Profile = () => {
  const { user, getCurrentUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    bio: "",
    skills: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      location: user.location || "",
      bio: user.bio || "",
      skills: Array.isArray(user.skills) ? user.skills.join(", ") : "",
    });

    setPreview(user.avatar?.url || "");
  }, [user]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skills = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      await FireAPI("auth/profile", "PUT", {
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        skills,
      });

      if (avatar) {
        const avatarData = new FormData();
        avatarData.append("avatar", avatar);

        await FireAPI("uploads/avatar", "PATCH", avatarData);
      }

      toast.success("Profile updated successfully");

      setAvatar(null);
      await getCurrentUser();
    } catch (error) {
      console.log("Profile Update Error:", error);

      toast.error(
        error?.message || "Unable to update profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div>
          <p className="text-sm font-medium text-[var(--color-accent)]">
            Candidate Profile
          </p>

          <h1
            className="mt-2 text-4xl font-medium text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your profile
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-ink-muted)]">
            Keep your information up to date so recruiters can better understand
            your experience and skills.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
        >
          <div className="border-b border-[var(--color-border)] px-5 py-6 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[var(--color-surface-alt)] text-[var(--color-primary)]">
                  {preview ? (
                    <img
                      src={preview}
                      alt={formData.name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound size={30} />
                  )}
                </div>

                <label
                  htmlFor="avatar"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-primary)] text-white"
                >
                  <Camera size={15} />

                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <h2 className="text-base font-semibold text-[var(--color-ink)]">
                  Profile photo
                </h2>

                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                  Add a professional photo to your profile.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 px-5 py-6 sm:px-8 sm:py-8">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
              >
                Full name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-10 pr-4 text-sm text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
              >
                Location
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]"
                />

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-10 pr-4 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
                  placeholder="Karachi, Pakistan"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
              >
                Bio
              </label>

              <textarea
                id="bio"
                name="bio"
                rows={5}
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell recruiters a little about yourself..."
                className="w-full resize-none rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
              />
            </div>

            <div>
              <label
                htmlFor="skills"
                className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
              >
                Skills
              </label>

              <input
                id="skills"
                name="skills"
                type="text"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, Express.js"
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
              />

              <p className="mt-2 text-xs text-[var(--color-ink-muted)]">
                Separate multiple skills with commas.
              </p>
            </div>
          </div>

          <div className="flex justify-end border-t border-[var(--color-border)] px-5 py-5 sm:px-8">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />

              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
