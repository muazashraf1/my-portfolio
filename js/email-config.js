// EmailJS Configuration Settings (Loaded dynamically from .env at runtime)
window.EMAILJS_CONFIG = {
  publicKey: '',
  serviceId: '',
  templateId: '',
  loaded: false,
  promise: null
};

// Fetch and parse the .env file relative to this script's folder
(function() {
  const scriptSrc = document.currentScript ? document.currentScript.src : window.location.href;
  // Resolve .env relative to the folder of this script (js/email-config.js -> ../.env)
  const envUrl = new URL('../.env', scriptSrc).href;

  window.EMAILJS_CONFIG.promise = fetch(envUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      return response.text();
    })
    .then(text => {
      text.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const index = trimmed.indexOf('=');
        if (index > 0) {
          const key = trimmed.substring(0, index).trim();
          const value = trimmed.substring(index + 1).trim().replace(/^['"]|['"]$/g, '');
          if (key === 'EMAILJS_PUBLIC_KEY') {
            window.EMAILJS_CONFIG.publicKey = value;
          } else if (key === 'EMAILJS_SERVICE_ID') {
            window.EMAILJS_CONFIG.serviceId = value;
          } else if (key === 'EMAILJS_TEMPLATE_ID') {
            window.EMAILJS_CONFIG.templateId = value;
          }
        }
      });
      window.EMAILJS_CONFIG.loaded = true;
    })
    .catch(error => {
      console.warn('Could not load EmailJS config from .env: ', error);
    });
})();
