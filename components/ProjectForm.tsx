"use client";

import { saveProject, deleteProject } from "@/app/admin/actions";
import type { IProject } from "@/models/Project";

export default function ProjectForm({ project }: { project?: IProject }) {
  const action = saveProject.bind(null, project?._id ?? null);
  const field =
    "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none ring-accent/30 focus:ring-2";
  const label = "mb-1.5 block text-sm font-medium";

  return (
    <form action={action} className="space-y-5">
      <div>
        <label className={label}>Title</label>
        <input name="title" defaultValue={project?.title} required className={field} />
      </div>

      <div>
        <label className={label}>Slug (leave blank to auto-generate)</label>
        <input name="slug" defaultValue={project?.slug} placeholder="project-name" className={field} />
      </div>

      <div>
        <label className={label}>Summary</label>
        <textarea name="summary" defaultValue={project?.summary} rows={2} required className={field} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Cover image path</label>
          <input name="coverImage" defaultValue={project?.coverImage} placeholder="/projects/example.png" className={field} />
        </div>
        <div>
          <label className={label}>Extra image paths (comma separated)</label>
          <input name="images" defaultValue={project?.images?.join(", ")} className={field} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Tags (comma separated)</label>
          <input name="tags" defaultValue={project?.tags?.join(", ")} placeholder="AI, Chrome Extension" className={field} />
        </div>
        <div>
          <label className={label}>Technologies (comma separated)</label>
          <input name="technologies" defaultValue={project?.technologies?.join(", ")} className={field} />
        </div>
      </div>

      <div>
        <label className={label}>Problem</label>
        <textarea name="problem" defaultValue={project?.problem} rows={3} className={field} />
      </div>
      <div>
        <label className={label}>Technical Approach</label>
        <textarea name="approach" defaultValue={project?.approach} rows={3} className={field} />
      </div>
      <div>
        <label className={label}>Architecture</label>
        <textarea name="architecture" defaultValue={project?.architecture} rows={3} className={field} />
      </div>
      <div>
        <label className={label}>Engineering Challenges</label>
        <textarea name="challenges" defaultValue={project?.challenges} rows={3} className={field} />
      </div>
      <div>
        <label className={label}>Impact / Results</label>
        <textarea name="impact" defaultValue={project?.impact} rows={3} className={field} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="featured" defaultChecked={project?.featured} className="h-4 w-4" />
          Featured on homepage
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="pinned" defaultChecked={project?.pinned} className="h-4 w-4" />
          Pin to the top
        </label>
        <div>
          <label className={label}>Order</label>
          <input type="number" name="order" defaultValue={project?.order ?? 0} className={field} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
          {project ? "Save changes" : "Create project"}
        </button>
        {project && (
          <button
            type="submit"
            formAction={deleteProject.bind(null, project._id)}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-red-500"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
