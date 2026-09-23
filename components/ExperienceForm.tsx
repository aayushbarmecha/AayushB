"use client";

import { saveExperience, deleteExperience } from "@/app/admin/actions";
import type { IExperience } from "@/models/Experience";

export default function ExperienceForm({ experience }: { experience?: IExperience }) {
  const action = saveExperience.bind(null, experience?._id ?? null);
  const field =
    "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none ring-accent/30 focus:ring-2";
  const label = "mb-1.5 block text-sm font-medium";

  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Company</label>
          <input name="company" defaultValue={experience?.company} required className={field} />
        </div>
        <div>
          <label className={label}>Role</label>
          <input name="role" defaultValue={experience?.role} required className={field} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={label}>Location</label>
          <input name="location" defaultValue={experience?.location} required className={field} />
        </div>
        <div>
          <label className={label}>Start date</label>
          <input name="startDate" defaultValue={experience?.startDate} placeholder="Sept 2025" required className={field} />
        </div>
        <div>
          <label className={label}>End date</label>
          <input name="endDate" defaultValue={experience?.endDate} placeholder="Present" required className={field} />
        </div>
      </div>

      <div>
        <label className={label}>Bullet points (one per line)</label>
        <textarea name="bullets" defaultValue={experience?.bullets?.join("\n")} rows={6} required className={field} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Tech stack (comma separated)</label>
          <input name="techStack" defaultValue={experience?.techStack?.join(", ")} className={field} />
        </div>
        <div>
          <label className={label}>Order (lower shows first)</label>
          <input type="number" name="order" defaultValue={experience?.order ?? 0} className={field} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
          {experience ? "Save changes" : "Create entry"}
        </button>
        {experience && (
          <button
            type="submit"
            formAction={deleteExperience.bind(null, experience._id)}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-red-500"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
