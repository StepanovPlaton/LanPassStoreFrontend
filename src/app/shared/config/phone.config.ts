const raw = import.meta.env['VITE_APP_PHONE'] as string | undefined;

export const APP_PHONE_DISPLAY = raw ?? '+7 777 585 22 50';

export const APP_PHONE_RAW = APP_PHONE_DISPLAY.replace(/[^+\d]/g, '');
