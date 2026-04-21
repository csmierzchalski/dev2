# SubWise — developer notes

## Prisma + Supabase (Supavisor pooler)

Use the **connection pooler** from the Supabase Dashboard (**Connect**), not a direct `db.<project>.supabase.co:5432` URL from a local machine. Prisma expects:

| Variable | Role | Typical port | Notes |
|----------|------|--------------|--------|
| `DATABASE_URL` | **Transaction** pooler | **6543** | App runtime queries. Add `?pgbouncer=true&sslmode=require` (or equivalent query params shown in Dashboard). |
| `DIRECT_URL` | **Session** pooler | **5432** | Migrations, `prisma db pull`, introspection. Same pooler **host** as transaction mode, different port. Add `sslmode=require`. |

### Host and user

- **Host:** `aws-0-<region>.pooler.supabase.com` (region is shown under **Connect**, e.g. `eu-west-1`).
- **User:** `postgres.<PROJECT_REF>` (project ref is the Supabase project id in the URL / settings).

Replace `<PROJECT_REF>`, `<REGION>`, and `[PASSWORD]` with values from **Project Settings → Database** (or the connection string builder in **Connect**). Never commit real passwords.

### Example shape (placeholders only)

```text
DATABASE_URL="postgresql://postgres.<PROJECT_REF>:[PASSWORD]@aws-0-<REGION>.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require"
DIRECT_URL="postgresql://postgres.<PROJECT_REF>:[PASSWORD]@aws-0-<REGION>.pooler.supabase.com:5432/postgres?sslmode=require"
```

Copy the exact strings from **Dashboard → Connect → ORMs / Prisma** when available; parameter names may match slightly but **transaction = 6543**, **session = 5432** on the **pooler** host is the intended split.

---

## Subscriptions (Supabase database)

The app stores each user’s subscriptions in Postgres via Supabase. **Create the table and RLS policies once** by running the SQL file in the Supabase SQL Editor:

- File: `supabase/migrations/001_subscriptions.sql`

After it runs successfully, signed-in users can **create, read, update, and delete** only their own rows (`user_id` = `auth.uid()`). The Subscriptions page and dashboard read from this table; amounts are **GBP** in the UI.

If you see errors like `relation "public.subscriptions" does not exist`, the migration has not been applied yet.
