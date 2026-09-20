import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AdminUser from "@/models/AdminUser";
import Experience from "@/models/Experience";
import Project from "@/models/Project";
import BlogPost from "@/models/BlogPost";

const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set in .env.local — see README.md for setup steps.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI, { dbName: "portfolio" });
  console.log("Connected to MongoDB.");

  // --- Admin user ---
  const adminUsername = "test";
  const adminPassword = "test"; // Change this from /admin/settings after logging in — don't edit and re-seed, it won't touch an existing admin user anyway.
  const existingAdmin = await AdminUser.findOne({ username: adminUsername });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await AdminUser.create({ username: adminUsername, passwordHash });
    console.log(`Created admin user "${adminUsername}" / "${adminPassword}" — change this password.`);
  } else {
    console.log("Admin user already exists, skipping.");
  }

  // --- Experience ---
  await Experience.deleteMany({});
  await Experience.insertMany([
    {
      company: "Yext",
      role: "Software Engineer",
      location: "Hyderabad/Hybrid",
      startDate: "Sept 2025",
      endDate: "Present",
      order: 0,
      bullets: [
        "Contributed to Yext Scout, an AI-powered enterprise platform, developing n8n backend workflows, AI evaluation agents, admin dashboards, and role-based access management to enable platform integrations and product capabilities, contributing to a 30% increase in client adoption.",
        "Engineered high-throughput, distributed ETL and data ingestion pipelines in Go for the Yext Knowledge Graph while owning enterprise implementations and production initiatives; improved scalability and reliability and reduced high-risk production flags from 60% to 25%.",
        "Designed and implemented an internal AI-powered issue triage and automation system that decomposes product issue tickets into actionable engineering sub-tasks, generates resolution summaries, and automatically routes issues to appropriate engineering teams, reducing manual effort by 40% and improving incident handling and engineering workflows.",
        "Engineered an AI-powered Chrome extension for Yext technical learning using Chrome Built-in AI (Gemini Nano), Prompt API, and Summarization API to generate source-grounded flashcards and certification-style challenges for Yext documentation, used by 60% of the company strength.",
      ],
      techStack: ["Go", "n8n", "LLM Agents", "Chrome Built-in AI", "React", "MongoDB"],
    },
    {
      company: "MAQ Software",
      role: "Software Engineer",
      location: "Hyderabad, India",
      startDate: "December 2023",
      endDate: "August 2025",
      order: 1,
      bullets: [
        "Developed a VS Code extension for Power BI report exports in TMDL language, applying compiler design principles (using ANTLR for lexing and parsing) and implementing features like code formatting and auto-complete to enhance user experience.",
        "Optimized memory usage by 33% and reduced processing time by 50% for features like auto-complete and hover, by designing a custom data structure to efficiently replace the default ANTLR-generated parse tree.",
        "Developed a C# script to automate schema generation using a CI/CD pipeline leveraging the One-Branch template, completely eliminating manual effort.",
        "Developed automated unit test cases using the Jest framework, reducing manual testing efforts and cutting testing time by 80%.",
      ],
      techStack: ["TypeScript", "C#", ".NET", "React", "ANTLR", "Jest", "Azure"],
    },
  ]);
  console.log("Seeded experience.");

  // --- Projects ---
  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: "Yext Scout — AI-Powered Enterprise Platform",
      slug: "yext-scout",
      summary: "n8n backend workflows, AI evaluation agents, and admin tooling that drove a 30% increase in client adoption.",
      coverImage: "/projects/cover-yext-scout.jpg",
      images: [],
      tags: ["AI/LLM", "Full-Stack", "Platform Engineering"],
      problem:
        "Yext Scout needed backend workflows and admin tooling that could reliably orchestrate AI agents, evaluate their output, and give enterprise clients controlled access to new platform capabilities — without engineering having to hand-hold every integration.",
      approach:
        "Built n8n-based backend workflows to orchestrate AI evaluation agents, paired with admin dashboards and role-based access management so platform integrations and product capabilities could be enabled per client without one-off engineering work.",
      architecture:
        "Workflow orchestration (n8n) sits between the product surface and the LLM evaluation agents, with an admin layer for role-based access management controlling which capabilities and integrations a given client can reach.",
      technologies: ["n8n", "LLM Agents", "Prompt Engineering", "React", "MongoDB"],
      challenges:
        "Coordinating AI evaluation agents with deterministic, auditable admin controls — the workflows had to stay flexible enough for fast iteration on prompts and agent behavior while giving admins a reliable, role-based way to turn capabilities on or off per client.",
      impact: "Contributed to a 30% increase in client adoption of the platform.",
      featured: true,
      order: 0,
    },
    {
      title: "AI-Powered Issue Triage & Automation",
      slug: "ai-issue-triage",
      summary: "An internal system that decomposes product issues into engineering sub-tasks and routes them automatically, cutting manual effort by 40%.",
      coverImage: "/projects/cover-ai-issue-triage.jpg",
      images: [],
      tags: ["AI/LLM", "Developer Tooling", "Automation"],
      problem:
        "Incoming product issue tickets required significant manual effort to break down into engineering-actionable sub-tasks, summarize, and route to the right team — slowing down incident handling and engineering workflows.",
      approach:
        "Designed and implemented an AI-powered triage system that decomposes tickets into actionable engineering sub-tasks, generates resolution summaries, and automatically routes issues to the appropriate engineering teams.",
      architecture:
        "An LLM-driven pipeline ingests raw issue tickets, applies decomposition and summarization steps, and routes structured output to the owning team's workflow — replacing what was previously a manual triage step.",
      technologies: ["LLM Agents", "Prompt Engineering", "Automation Pipelines"],
      challenges:
        "Getting decomposition and routing accurate enough to trust with minimal human review, across a wide variety of ticket types and severities, while keeping resolution summaries concise and actionable for engineers.",
      impact: "Reduced manual effort by 40% and improved incident handling and engineering workflows.",
      featured: true,
      order: 1,
    },
    {
      title: "Yext Learn — AI-Powered Chrome Extension (FlashLearn)",
      slug: "yext-learn-flashlearn",
      summary: "A Chrome Built-in AI (Gemini Nano) extension generating source-grounded flashcards and certification challenges, used by 60% of the company.",
      coverImage: "/projects/cover-yext-learn.jpg",
      images: [],
      tags: ["AI/LLM", "Chrome Extension", "Developer Tooling"],
      problem:
        "Yext employees needed an efficient way to learn and certify on Yext's technical documentation, rather than reading dense docs end-to-end.",
      approach:
        "Built an AI-powered Chrome extension using Chrome's Built-in AI (Gemini Nano), the Prompt API, and the Summarization API to generate source-grounded flashcards and certification-style challenges directly from Yext documentation.",
      architecture:
        "Runs entirely on Chrome's on-device Gemini Nano model via the Prompt and Summarization APIs, grounding every generated flashcard or challenge in the source documentation being viewed — no external LLM calls required.",
      technologies: ["Chrome Built-in AI", "Gemini Nano", "Prompt API", "Summarization API", "JavaScript"],
      challenges:
        "Keeping generated flashcards and challenges strictly grounded in source documentation (avoiding hallucination) while working within the constraints of an on-device model.",
      impact: "Adopted by 60% of the company for technical learning and certification prep.",
      featured: true,
      order: 2,
    },
    {
      title: "TMDL VS Code Extension",
      slug: "tmdl-vscode-extension",
      summary: "A VS Code language extension for Power BI's TMDL, built with ANTLR — with a custom data structure that cut memory 33% and processing time 50%.",
      coverImage: "/projects/tmdl-SemanticHighlighting.png",
      images: ["/projects/tmdl-Autocomplete.png", "/projects/tmdl-Breadcrumbs.png", "/projects/tmdl-CodeFormatting.png"],
      tags: ["Developer Tooling", "Compilers", "VS Code Extension"],
      problem:
        "Power BI report authors working with TMDL (Tabular Model Definition Language) had no first-class VS Code support — no syntax highlighting, autocomplete, formatting, or hover information tuned to the language.",
      approach:
        "Applied compiler design principles using ANTLR for lexing and parsing TMDL, then built language features on top: code formatting and auto-complete, tuned for a smooth editing experience.",
      architecture:
        "ANTLR generates the initial lexer/parser for TMDL. Rather than operating directly on ANTLR's generated parse tree for hot-path features like auto-complete and hover, a custom data structure replaces it to serve those lookups far more efficiently.",
      technologies: ["TypeScript", "ANTLR", "VS Code Extension API", "C#", ".NET"],
      challenges:
        "The default ANTLR-generated parse tree was too heavy for interactive features like auto-complete and hover, which need near-instant responses on every keystroke — this required designing a custom data structure specifically to replace it on those hot paths.",
      impact: "Cut memory usage by 33% and reduced processing time by 50% for auto-complete and hover.",
      featured: true,
      order: 3,
    },
  ]);
  console.log("Seeded projects.");

  // --- Blog: TMDL post ---
  await BlogPost.deleteOne({ slug: "replacing-antlr-parse-trees-tmdl-vscode" });
  await BlogPost.create({
    title: "Why We Replaced ANTLR's Parse Tree in the TMDL VS Code Extension",
    slug: "replacing-antlr-parse-trees-tmdl-vscode",
    description:
      "Building language support for Power BI's TMDL with ANTLR, and why the default generated parse tree wasn't good enough for auto-complete and hover.",
    coverImage: "/projects/tmdl-SemanticHighlighting.png",
    tags: ["ANTLR", "VS Code Extension", "Compilers", "TypeScript"],
    status: "published",
    publishedAt: new Date("2025-06-10"),
    content: `## The problem: TMDL had no first-class editor support

[TMDL](https://go.microsoft.com/fwlink/?linkid=2295924) (Tabular Model Definition Language) is the code behind Power BI semantic models. Authors were editing it with no syntax highlighting, no autocomplete, no formatting, and no hover information — just a generic text editor experience for a real language.

We built the [TMDL extension for Visual Studio Code](https://github.com/microsoft/vscode-tmdl) to fix that:

![TMDL syntax highlighting in VS Code](/projects/tmdl-SemanticHighlighting.png)

## Lexing and parsing with ANTLR

Rather than hand-rolling a lexer and parser, we used **ANTLR** (ANother Tool for Language Recognition) to generate them from a grammar. ANTLR gives you a parse tree for free, and for a lot of language tooling that's exactly what you want:

\`\`\`text
grammar Tmdl;

document : statement* EOF;
statement : property | table | column;
property  : IDENTIFIER ':' value;
\`\`\`

On top of the generated lexer/parser, we implemented the features that actually make editing TMDL pleasant:

- **Autocomplete** — context-aware suggestions as you type
- **Code formatting** — consistent structure across a document
- **Breadcrumbs** — hierarchical navigation within a document
- **Hover information** — contextual detail on mouse-over

![Autocomplete suggestions](/projects/tmdl-Autocomplete.png)

## Where the generated parse tree fell short

ANTLR's generated parse tree is convenient, but it's built for correctness and generality — not for being queried on every keystroke. Features like autocomplete and hover need near-instant answers to questions like *"what's the enclosing property at this cursor position?"*, run continuously as the user types.

Walking the default parse tree for every keystroke was too slow and too memory-heavy for that. Profiling showed the tree's generic node representation — built to support arbitrary grammars — was carrying overhead we didn't need for TMDL specifically.

## Replacing it with a custom data structure

We designed a custom data structure purpose-built for TMDL's actual shape, replacing the generic ANTLR parse tree on the hot paths (autocomplete, hover). It kept only the information those features actually needed, indexed for fast lookup by position rather than requiring a tree walk.

The result:

- **33% reduction in memory usage**
- **50% reduction in processing time** for autocomplete and hover

![Code formatting in action](/projects/tmdl-CodeFormatting.png)

## Takeaway

Generated tooling like ANTLR's parse tree is a great starting point — but it's a general-purpose default, not necessarily the right runtime representation for your hottest code paths. Profiling first, then designing a narrower data structure for the features that actually need to be fast, made the difference here.
`,
  });
  console.log("Seeded TMDL blog post.");

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
