# Command Center - Saksham's Business Dashboard

## Overview
Unified dashboard for managing all of Saksham's businesses, tools, and workflows.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (Postgres + Auth + Realtime)
- **Deployment:** Vercel

## Modules (8 Total)

### 1. Daily Briefing Generator
- Morning summary card
- Pulls: Calendar events (next 24h), urgent emails, business metrics, AI news
- Single glanceable view
- Auto-generates at configurable time

### 2. Income Stream Tracker
- 8 business streams:
  - Wear N Share (clothing rental)
  - Netflix/Subs resale (Sellix)
  - Website development (freelance)
  - AI automation services
  - Women's Traditional Clothing (1% commission)
  - Stake promo (seasonal)
  - Social media AI (Nimmy, Heer)
  - Asmera (fashion e-commerce)
- Daily/weekly/monthly revenue per stream
- Manual input + API integrations where possible
- Charts and totals

### 3. Browser Profile Manager
- Manage 500+ browser profiles
- Naming convention: [OWNER]-[BIZ]-[NUM] (12 chars)
- Owner codes: PSN, SHB, SHP, ASM
- Business codes: MAN, WNS, NFX, STK, BMS, SMM, SMG, FRL, LDG, etc.
- Features:
  - List all profiles with status
  - One-click session health check
  - Bulk operations
  - Organized by business

### 4. AI Character Asset Library
- Characters: Nimmy Ambers, Heer Kaul
- Store:
  - Reference images (face angles, body angles)
  - Prompts that worked (with settings)
  - Failed experiments (with notes)
  - Scene prompts
- Tagging and search
- Version history for prompts

### 5. Client Pipeline (Freelance)
- Sources: Fiverr, Upwork, VED, WEB, Cold outreach
- Track:
  - Lead name, source, project type
  - Quote amount (₹)
  - Status: lead → quoted → negotiating → won/lost → completed
  - Follow-up reminders
- Focus on ₹10k website deals

### 6. Expense/Revenue Logger
- For Shareverse LLP bookkeeping
- Simple input:
  - Date, amount, category, description
  - Income vs Expense toggle
  - Receipt upload (optional)
- Categories tied to business streams
- Monthly P&L summary

### 7. Ticket Scalping Dashboard
- Real-time view of Firefox containers (100+)
- Per-account status:
  - Logged in / Session expired
  - Last activity
  - Account health
- Alerts when sessions expire
- Bulk refresh capability
- Tied to BMS (BookMyShow) profiles

### 8. GMAT Study Tracker
- Target: 750+
- Features:
  - Topic progress (Quant, Verbal, IR, AWA)
  - Practice test scores over time
  - Weak area identification
  - Spaced repetition reminders
  - Study session logging

## Design Principles
- Dark mode default
- Mobile responsive
- Fast, minimal, no clutter
- Real data > pretty charts

## File Structure
```
/app
  /dashboard          # Main dashboard with summary cards
  /briefing           # Daily briefing
  /income             # Income stream tracker
  /profiles           # Browser profile manager
  /assets             # AI character asset library
  /pipeline           # Client pipeline
  /expenses           # Expense/revenue logger
  /scalping           # Ticket scalping dashboard
  /gmat               # GMAT study tracker
/components
  /ui                 # shadcn components
  /shared             # Shared components
/lib
  /supabase           # Supabase client
  /utils              # Utility functions
/types                # TypeScript types
```

## Database Schema (Supabase)

### income_entries
- id, stream (enum), amount, date, notes, created_at

### browser_profiles
- id, code (12 char), owner, business, number, status, last_checked, notes

### ai_assets
- id, character, type (face/body/scene/prompt), file_url, prompt_text, settings_json, worked (bool), notes, created_at

### pipeline_leads
- id, name, source, project_type, quote_amount, status, follow_up_date, notes, created_at, updated_at

### expenses
- id, date, amount, is_income (bool), category, description, receipt_url, created_at

### scalping_accounts
- id, profile_id (FK), platform, username, status, last_login, session_health, created_at

### gmat_sessions
- id, date, topic, duration_min, score, notes, created_at

## Priority Order
1. Daily Briefing Generator (quick win)
2. Income Stream Tracker (high visibility)
3. AI Character Asset Library (prevent context loss)
4. Expense/Revenue Logger (simple, ties to income)
5. Client Pipeline (CRM basics)
6. Browser Profile Manager (complex)
7. Ticket Scalping Dashboard (builds on profiles)
8. GMAT Study Tracker (can wait)
