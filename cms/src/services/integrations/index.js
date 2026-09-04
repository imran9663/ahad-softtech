const enabled = value => String(value).toLowerCase() === 'true';

export const integrationConfig = {
  crm: enabled(process.env.INTEGRATION_CRM_ENABLED),
  hrms: enabled(process.env.INTEGRATION_HRMS_ENABLED),
  whatsapp: enabled(process.env.INTEGRATION_WHATSAPP_ENABLED),
  marketing: enabled(process.env.INTEGRATION_MARKETING_ENABLED),
  leadScoring: enabled(process.env.INTEGRATION_LEAD_SCORING_ENABLED),
  i18n: enabled(process.env.INTEGRATION_I18N_ENABLED),
  analytics: enabled(process.env.INTEGRATION_ANALYTICS_ENABLED),
  workflow: enabled(process.env.INTEGRATION_WORKFLOW_ENABLED),
};

export function isIntegrationEnabled(name) { return Boolean(integrationConfig[name]); }
