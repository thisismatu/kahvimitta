import ReactGA from 'react-ga4';

export const trackEvent = (category: string, action: string, label: string) =>
  ReactGA.event({ category, action, label });

export const getParam = (prop: string) => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get(prop);
};

export const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);
