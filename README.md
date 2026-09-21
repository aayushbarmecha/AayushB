# Portfolio

Personal portfolio + technical blog for Aayush Barmecha. Next.js (App Router) + TypeScript + Tailwind CSS v4 + MongoDB/Mongoose + Auth.js (NextAuth v5) + MDX.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** for styling, dark/light mode via `next-themes`
- **MongoDB + Mongoose** for blog posts, projects, experience, contact messages
- **Auth.js (next-auth v5)** credentials login for the `/admin` dashboard
- **next-mdx-remote** for rendering Markdown/MDX blog content, with syntax highlighting, copy-code buttons, and a table of contents
- **Framer Motion** for scroll reveals and page transitions

## 1. Local setup

```bash
npm install
```

Fill in `.env.local`:

```
MONGODB_URI=...       # see step 2
AUTH_SECRET=...       # generate with: openssl rand -base64 32
```

## 2. MongoDB setup

You need a MongoDB connection string. The free tier of MongoDB Atlas is plenty for this site.

1. Go to **https://www.mongodb.com/cloud/atlas/register** and create a free account.
2. Create a new **free (M0) cluster** — any cloud provider/region is fine.
3. Under **Database Access**, add a database user with a username and password (you'll use these in the connection string).
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) — simplest option for a small personal site deployed on Vercel, which uses dynamic IPs.
5. Click **Connect** on your cluster → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```
6. Paste it into `.env.local` as `MONGODB_URI`. The app automatically uses a database named `portfolio` (no need to add it to the URI).

Alternative for local development only: run MongoDB in Docker instead of Atlas:

```bash
docker run -d --name portfolio-mongo -p 27017:27017 mongo:7
```

Then use `MONGODB_URI=mongodb://localhost:27017/portfolio` locally, and switch to your real Atlas URI when you deploy.

## 3. Admin user setup

Seed the database with an admin user, your experience, projects, and one sample blog post:

```bash
npm run seed
```

This creates an admin login with username **`test`** and password **`test`** (see `scripts/seed.ts`). **Change this password** by logging in and going to **`/admin/settings`** — don't re-run `npm run seed` to do this, since it re-inserts all Projects and Experience from scratch and would wipe any edits you've made through the admin dashboard (it does leave an existing admin user alone, but it's not the right tool for a password change).

## 4. Running locally

```bash
npm run dev
```

Visit `http://localhost:3000`. Admin dashboard is at `http://localhost:3000/admin`.

## 5. Deploying to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Go to **https://vercel.com/new** and import the repo.
3. In the project's **Environment Variables** settings, add:
   - `MONGODB_URI` — your Atlas connection string
   - `AUTH_SECRET` — a freshly generated secret (`openssl rand -base64 32`)
4. Deploy. Your site will be live at `your-project-name.vercel.app` — no custom domain needed.
5. Update `siteUrl` in `lib/site.config.ts` to your actual Vercel URL (used for SEO metadata, sitemap, and Open Graph tags), then redeploy.

## 6. Creating / publishing a blog post

1. Log in at `/admin` with your admin credentials.
2. Go to **Blog Posts → New post**.
3. Fill in title, description, tags, and the post body as Markdown (headings `##`/`###` automatically populate the table of contents; fenced code blocks get syntax highlighting and a copy button).
4. Set **Status** to `Published` and save. It's immediately live at `/blog/<slug>`.
5. To edit later, click the post from the **Blog Posts** list.

The public site caches these reads and only re-queries MongoDB when you publish/edit/delete something (via on-demand cache invalidation) or once an hour, whichever comes first — it does not hit the database on every visitor page load.

## 7. Replacing personal assets

No code changes needed for any of these:

- **Profile photo** — replace `public/profile.jpg` with your own photo (same filename).
- **Resume** — replace `public/resume.pdf` with your own PDF (same filename).
- **Social links, email, phone, bio blurbs** — edit `lib/site.config.ts`.
- **Project/experience images** — drop files into `public/projects/` and reference them (e.g. `/projects/my-image.png`) from the admin forms for Projects.

## Project structure

```
app/            Routes (App Router) — public pages + /admin dashboard
components/     UI components
lib/            Config, DB connection, data-fetching, auth, markdown pipeline
models/         Mongoose schemas: BlogPost, Project, Experience, ContactMessage, AdminUser
scripts/seed.ts Seeds admin user + experience + projects + a sample blog post
```
