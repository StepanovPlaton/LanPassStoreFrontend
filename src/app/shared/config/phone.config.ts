const raw = import.meta.env['VITE_APP_PHONE'] as string | undefined;

export const APP_PHONE_DISPLAY = raw ?? '+7 777 585 22 50';

export const APP_PHONE_RAW = APP_PHONE_DISPLAY.replace(/[^+\d]/g, '');

export const TELEGRAM_URL = `https://t.me/+${APP_PHONE_RAW.replace(/^\+/, '')}`;
export const WHATSAPP_URL = `https://wa.me/${APP_PHONE_RAW.replace(/^\+/, '')}`;
