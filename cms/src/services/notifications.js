const EMAIL_ENDPOINT = process.env.EMAIL_API_URL;
const EMAIL_API_KEY = process.env.EMAIL_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_TO = process.env.EMAIL_TO;

function enabled() {
  return Boolean(EMAIL_ENDPOINT && EMAIL_API_KEY && EMAIL_FROM && EMAIL_TO);
}

async function sendEmail({ subject, text }) {
  if (!enabled()) return { sent: false, reason: 'email_not_configured' };

  const response = await fetch(EMAIL_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${EMAIL_API_KEY}`
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [EMAIL_TO],
      subject,
      text
    })
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Email provider returned ${response.status}: ${detail.slice(0, 300)}`);
  }
  return { sent: true };
}

module.exports = { sendEmail };
