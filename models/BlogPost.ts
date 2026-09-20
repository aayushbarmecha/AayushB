import { Schema, models, model } from "mongoose";

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  tags: string[];
  content: string; // Markdown/MDX source
  status: "draft" | "published";
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    coverImage: { type: String },
    tags: { type: [String], default: [] },
    content: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export default models.BlogPost || model<IBlogPost>("BlogPost", BlogPostSchema);
