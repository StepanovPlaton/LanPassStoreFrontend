/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_DOMAIN: string;
  readonly VITE_BACKEND_PORT: string;
  readonly VITE_API_PATTERN: string;
  readonly VITE_APP_PHONE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
