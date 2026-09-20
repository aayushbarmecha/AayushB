import { Schema, models, model } from "mongoose";

export interface IExperience {
  _id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string; // "Present" allowed
  bullets: string[];
  techStack: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    bullets: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Experience || model<IExperience>("Experience", ExperienceSchema);
