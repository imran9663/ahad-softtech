# Health endpoint

`GET /api/health` is intended for load-balancer/container health checks.

It checks Strapi process health and PostgreSQL connectivity and returns HTTP 503 when the database check fails.
