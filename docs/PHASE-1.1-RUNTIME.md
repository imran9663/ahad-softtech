# Phase 1.1 — Runtime Initialization

## Target
Initialize the actual frontend + Strapi 5 + PostgreSQL runtime contract.

## Implemented in scaffold
- Root npm workspaces for `frontend` and `cms`.
- Strapi configuration files for PostgreSQL, server, admin, middleware, API and uploads.
- PostgreSQL Docker Compose service.
- Frontend CMS REST client using `PUBLIC_CMS_URL`.
- CMS `.env.example` with required secrets/configuration.
- Node 20–24 runtime contract.

## Local startup
1. Copy `cms/.env.example` to `cms/.env` and replace secrets with generated values.
2. Start PostgreSQL: `docker compose up -d postgres`.
3. Install workspace dependencies: `npm install`.
4. Start CMS: `npm run dev:cms`.
5. Start frontend: `npm run dev:frontend`.

## Completion gate
The phase is complete only after:
- PostgreSQL accepts a connection from Strapi.
- Strapi admin initializes successfully.
- REST API responds on port 1337.
- Frontend starts successfully.
- Frontend can reach the CMS endpoint.

## Current limitation
Dependency installation could not be completed in this build environment because the package-install command timed out. The source/runtime configuration has therefore been initialized, but local runtime verification must be performed in an environment with npm registry access.
