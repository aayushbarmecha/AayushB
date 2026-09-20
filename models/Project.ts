import { Schema, models, model } from "mongoose";

export interface IProject {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage?: string;
  images: string[];
  tags: string[];
  problem: string;
  approach: string;
  architecture: string;
  technologies: string[];
  challenges: string;
  impact: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    summary: { type: String, required: true },
    coverImage: { type: String },
    images: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    problem: { type: String, default: "" },
    approach: { type: String, default: "" },
    architecture: { type: String, default: "" },
    technologies: { type: [String], default: [] },
    challenges: { type: String, default: "" },
    impact: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Project || model<IProject>("Project", ProjectSchema);
