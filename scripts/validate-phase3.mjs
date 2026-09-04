import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'docker-compose.yml',
  'docker-compose.production.yml',
  'cms/Dockerfile',
  'frontend/Dockerfile',
  'frontend/nginx.conf',
  'cms/src/api/health/controllers/health.js',
  'cms/src/api/health/routes/health.js',
  'docs/PHASE-3-PRODUCTION-INTEGRATION-QA.md',
  'docs/deployment/PRODUCTION-RUNBOOK.md'
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing required Phase 3 files:', missing.join(', '));
  process.exit(1);
}

console.log(`Phase 3 file validation passed (${required.length} required files).`);
