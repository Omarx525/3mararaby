# 3mararaby

Free programming courses in Arabic (English toggle), with exercises, quizzes, sign-in, saved progress, and certificates that have a verification number and a PDF download.

Stack: Next.js 14 (App Router) + Supabase (auth and Postgres). No server code of its own: the browser talks to Supabase, and the database rules (row level security and two SQL functions) enforce who can see and do what.

## What works
- 6 courses, 29 lessons (Python, JavaScript, C, Rust, Lua, Elixir), each with an explanation, code sample, fill-in-the-blank exercise and a quiz. Arabic and English.
- Email and password sign-in (Supabase Auth).
- Progress saved per user. A correct quiz answer marks the lesson done.
- When every lesson of a course is done, the student types their name and gets a certificate with a verification number (like MR-AB12CD34EF) and the completion date (the day the last lesson was finished).
- Download: the Download PDF button opens the print dialog; choose "Save as PDF" (A4 landscape layout).
- Public verification page at /verify/<number>. It shows only the name, course and dates.

## Honest limits
- Quizzes and exercises are checked in the browser, so a technically skilled user could mark lessons done without answering. Fine for a free learning site; not for a proctored exam.
- "Run" only compares the typed answer. It does not execute code.
- The lessons are my drafts and have not been reviewed by a teacher. Please have someone read them before promoting the site.
- Email confirmation uses Supabase's built-in sender, which is rate limited (a few emails per hour) on the free tier. For real traffic, set up your own SMTP in Supabase later.
- The free Supabase tier pauses a project after about a week with no activity. Opening the dashboard unpauses it.

## Run locally (optional)
```
cp .env.example .env.local   # then fill in the two values
npm install
npm run dev
```

## Deploy: steps you do yourself (both are free tiers, no card needed)

### 1. Supabase (database and sign-in)
1. Go to supabase.com and sign in (GitHub login is the easiest). Click "New project". Pick a name (3mararaby), a region close to Cairo (for example Frankfurt), and a strong database password. Save that password somewhere safe. Choose the Free plan.
2. When the project is ready, open SQL Editor, click "New query", paste the whole content of `supabase/schema.sql`, and press Run. It should say success.
3. Open Project Settings, then API. Copy the Project URL and the `anon` `public` key. (Do not use the `service_role` key anywhere in this project.)
4. Authentication, then Providers: Email must be enabled. Under Authentication, then Sign In / Providers (or Settings), leave "Confirm email" on if you want confirmation, or turn it off for easier testing.

### 2. Put the code on GitHub
1. Create a new private repository named 3mararaby on github.com.
2. Upload this project's files to it (drag and drop the unzipped folder contents in the GitHub page, or use git). Do not upload `node_modules`, `.next` or any `.env.local` file.

### 3. Vercel (hosting)
1. Go to vercel.com, sign in with GitHub, and choose "Add New Project", then import the 3mararaby repository.
2. Framework is detected as Next.js. Before you click Deploy, open "Environment Variables" and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = the Project URL from step 1.3
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the anon public key from step 1.3
3. Click Deploy. In a minute you get a URL like `https://3mararaby.vercel.app`.
4. Back in Supabase, Authentication, then URL Configuration: set Site URL to your Vercel URL and add it to Redirect URLs.
5. Test: open the site, create an account, finish one lesson, then finish a whole course (Lua is the shortest, 4 lessons), get the certificate, and open its verify link in a private window.

### Costs
The Vercel Hobby plan and the Supabase Free plan cost nothing. A custom domain is optional (about 10 to 15 dollars a year). Hobby plan is for non-commercial use: if you start charging for courses, move to Vercel Pro.

## Where things are
- `lib/courses.ts` course list. `lib/lessons.ts` lesson text, quizzes, exercises (Arabic and English).
- `lib/i18n.tsx` interface text (add a language by adding a column to the dictionary).
- `supabase/schema.sql` tables, security rules, `issue_certificate()` and `verify_certificate()`.
- To add a course: add it to `lib/courses.ts` and `lib/lessons.ts`, and add a row to the `courses` table with its lesson count (insert into courses (id, lesson_count) values ('go', 5);).
