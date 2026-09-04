const enabled = value => String(value).toLowerCase() === 'true';

export const integrations = Object.freeze({
  crm: enabled(import.meta.env.VITE_INTEGRATION_CRM_ENABLED),
  whatsapp: enabled(import.meta.env.VITE_INTEGRATION_WHATSAPP_ENABLED),
  marketing: enabled(import.meta.env.VITE_INTEGRATION_MARKETING_ENABLED),
  analytics: enabled(import.meta.env.VITE_INTEGRATION_ANALYTICS_ENABLED),
  i18n: enabled(import.meta.env.VITE_INTEGRATION_I18N_ENABLED),
});
