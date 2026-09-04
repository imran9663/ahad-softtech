export function focusFirstInvalid(form) {
  const target = form?.querySelector('[aria-invalid="true"]');
  target?.focus();
}

export function announce(message) {
  let live = document.querySelector('[data-live-region]');
  if (!live) {
    live = document.createElement('div');
    live.className = 'sr-only';
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('data-live-region', 'true');
    document.body.appendChild(live);
  }
  live.textContent = message;
}
