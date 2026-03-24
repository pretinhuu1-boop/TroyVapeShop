# Troy Projects

Monorepo with two projects. Always be concise — no summaries, no preamble.

## Projects

### site-cloud-lab (Cloud Lab Store)
- Path: `troyagent/site-cloud-lab/`
- Stack: Vite + Vanilla JS/TS + Tailwind CSS + Supabase + Express
- Run: `npm run dev` (port 3000), `npm run server` (API)
- Build: `npm run build`, lint: `tsc --noEmit`
- DB: Supabase (remote) + SQLite (local fallback)

### troyagent (TAURA)
- Stack: Node.js + TypeScript — multi-channel AI gateway
- Based on OpenClaw/TAURA Research
- Uses pnpm

## Rules
- Use specific file paths in requests, never broad exploration
- Prefer `Edit` over full file rewrites
- No markdown in responses unless asked
- No trailing summaries — user reads diffs
- Keep responses under 150 words when possible
- Test before marking done
- Portuguese (BR) for communication
