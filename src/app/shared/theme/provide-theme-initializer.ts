import { DOCUMENT, isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID, provideAppInitializer } from '@angular/core';
import { injectRequest } from '@analogjs/router/tokens';
import {
  applyThemeClass,
  parseThemeFromCookieHeader,
} from '@/shared/theme/theme-cookie';

export function provideThemeFromCookieInitializer() {
  return provideAppInitializer(() => {
    const platformId = inject(PLATFORM_ID);
    const doc = inject(DOCUMENT);
    if (isPlatformServer(platformId)) {
      const req = injectRequest();
      const theme = parseThemeFromCookieHeader(req?.headers?.cookie);
      applyThemeClass(doc, theme);
    } else {
      const theme = parseThemeFromCookieHeader(doc.cookie);
      applyThemeClass(doc, theme);
    }
  });
}
