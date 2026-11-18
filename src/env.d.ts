/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly BASE_PATH?: string;
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly PUBLIC_LMS_URL?: string;
  readonly PUBLIC_TAGMANGO_REGISTRATION_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
