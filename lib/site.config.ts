// Central place for personal info, contact details, and social links.
// Update this file to change what shows up across the whole site.

export const siteConfig = {
  name: "Aayush Barmecha",
  role: "Software Engineer",
  tagline: "Software engineer building AI systems, distributed data pipelines, and developer tooling.",
  location: "Hyderabad, India",
  email: "barmecha99@gmail.com",
  phone: "+91 9898865148",
  // Swap /public/profile.jpg with your own photo whenever you have one — no code changes needed.
  profileImage: "/author.jpg",
  resumeUrl: "/resume.pdf",
  siteUrl: "https://your-name.vercel.app", // update after first Vercel deploy
  ogImage: "/og-image.png",

  // TODO: fill in your real profile URLs — these are left empty on purpose.
  social: {
    github: "",
    linkedin: "",
    leetcode: "",
    geeksforgeeks: "",
    codechef: "",
  },

  focusAreas: [
    "AI / LLM Systems",
    "Distributed Systems",
    "ETL & Data Pipelines",
    "Developer Tooling",
    "VS Code Extensions",
    "Full-Stack Product Engineering",
  ],

  education: [
    {
      school: "Indian Institute of Information Technology, Guwahati",
      degree: "Bachelor of Technology, Computer Science & Engineering — CPI: 9.42",
      period: "Dec 2020 – May 2024",
      location: "Assam, India",
    },
    {
      school: "Scholar English Academy",
      degree: "Class XII — 95%",
      period: "Jun 2018 – Mar 2020",
      location: "Gujarat, India",
    },
    {
      school: "Metas Adventist School",
      degree: "Class X — 93.2%",
      period: "Jun 2016 – Mar 2018",
      location: "Gujarat, India",
    },
  ],

  skills: {
    Languages: ["Go", "TypeScript", "JavaScript", "Python", "C#", "C++", "Java", "SQL"],
    "Frameworks / Libraries": ["React", "Node.js", "Express.js", ".NET", "Jest"],
    "AI / LLM Tooling": ["n8n", "LLM Agents & Evaluation Pipelines", "Prompt Engineering"],
    "Distributed Systems & Data": ["ETL Pipelines", "Concurrency", "Fault Tolerance", "Low-Latency Systems"],
    "Cloud / DevOps": ["Azure", "CI/CD (One-Branch)", "Git", "GitHub", "Docker", "Firebase"],
    Databases: ["MongoDB", "SQL Server", "Azure Table Storage"],
  },
};

export type SiteConfig = typeof siteConfig;
