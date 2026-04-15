export type Theme = 'light' | 'dark';

export const THEME_COOKIE_NAME = 'theme';

const THEME_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 365;

export function parseThemeFromCookieHeader(
  cookieHeader: string | undefined | null,
): Theme {
  if (!cookieHeader) {
    return 'light';
  }
  for (const part of cookieHeader.split(';')) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf('=');
    if (eq === -1) {
      continue;
    }
    const name = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (name !== THEME_COOKIE_NAME) {
      continue;
    }
    if (value === 'dark') {
      return 'dark';
    }
    if (value === 'light') {
      return 'light';
    }
  }
  return 'light';
}

export function applyThemeClass(doc: Document, theme: Theme): void {
  const root = doc.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function writeThemeCookie(doc: Document, theme: Theme): void {
  const view = doc.defaultView;
  if (!view) {
    return;
  }
  const secure = view.location.protocol === 'https:' ? '; Secure' : '';
  doc.cookie = `${THEME_COOKIE_NAME}=${theme}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE_SEC}; SameSite=Lax${secure}`;
}
