import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { httpErrorInterceptor } from '@/shared/interceptors/http-error.interceptor';
import { provideThemeFromCookieInitializer } from '@/shared/theme/provide-theme-initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideThemeFromCookieInitializer(),
    provideFileRouter(),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor, httpErrorInterceptor]),
    ),
    provideClientHydration(withEventReplay()),
  ],
};
