/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
    alias: {
      '@': path.resolve(__dirname, './src/app'),
      '@ui/accordion': path.resolve(__dirname, './src/app/shared/ui/accordion/src/index.ts'),
      '@ui/alert': path.resolve(__dirname, './src/app/shared/ui/alert/src/index.ts'),
      '@ui/alert-dialog': path.resolve(__dirname, './src/app/shared/ui/alert-dialog/src/index.ts'),
      '@ui/aspect-ratio': path.resolve(__dirname, './src/app/shared/ui/aspect-ratio/src/index.ts'),
      '@ui/autocomplete': path.resolve(__dirname, './src/app/shared/ui/autocomplete/src/index.ts'),
      '@ui/avatar': path.resolve(__dirname, './src/app/shared/ui/avatar/src/index.ts'),
      '@ui/badge': path.resolve(__dirname, './src/app/shared/ui/badge/src/index.ts'),
      '@ui/breadcrumb': path.resolve(__dirname, './src/app/shared/ui/breadcrumb/src/index.ts'),
      '@ui/button': path.resolve(__dirname, './src/app/shared/ui/button/src/index.ts'),
      '@ui/button-group': path.resolve(__dirname, './src/app/shared/ui/button-group/src/index.ts'),
      '@ui/calendar': path.resolve(__dirname, './src/app/shared/ui/calendar/src/index.ts'),
      '@ui/card': path.resolve(__dirname, './src/app/shared/ui/card/src/index.ts'),
      '@ui/carousel': path.resolve(__dirname, './src/app/shared/ui/carousel/src/index.ts'),
      '@ui/checkbox': path.resolve(__dirname, './src/app/shared/ui/checkbox/src/index.ts'),
      '@ui/collapsible': path.resolve(__dirname, './src/app/shared/ui/collapsible/src/index.ts'),
      '@ui/combobox': path.resolve(__dirname, './src/app/shared/ui/combobox/src/index.ts'),
      '@ui/command': path.resolve(__dirname, './src/app/shared/ui/command/src/index.ts'),
      '@ui/context-menu': path.resolve(__dirname, './src/app/shared/ui/context-menu/src/index.ts'),
      '@ui/date-picker': path.resolve(__dirname, './src/app/shared/ui/date-picker/src/index.ts'),
      '@ui/dialog': path.resolve(__dirname, './src/app/shared/ui/dialog/src/index.ts'),
      '@ui/dropdown-menu': path.resolve(__dirname, './src/app/shared/ui/dropdown-menu/src/index.ts'),
      '@ui/empty': path.resolve(__dirname, './src/app/shared/ui/empty/src/index.ts'),
      '@ui/field': path.resolve(__dirname, './src/app/shared/ui/field/src/index.ts'),
      '@ui/form-field': path.resolve(__dirname, './src/app/shared/ui/form-field/src/index.ts'),
      '@ui/hover-card': path.resolve(__dirname, './src/app/shared/ui/hover-card/src/index.ts'),
      '@ui/icon': path.resolve(__dirname, './src/app/shared/ui/icon/src/index.ts'),
      '@ui/input': path.resolve(__dirname, './src/app/shared/ui/input/src/index.ts'),
      '@ui/input-group': path.resolve(__dirname, './src/app/shared/ui/input-group/src/index.ts'),
      '@ui/input-otp': path.resolve(__dirname, './src/app/shared/ui/input-otp/src/index.ts'),
      '@ui/item': path.resolve(__dirname, './src/app/shared/ui/item/src/index.ts'),
      '@ui/kbd': path.resolve(__dirname, './src/app/shared/ui/kbd/src/index.ts'),
      '@ui/label': path.resolve(__dirname, './src/app/shared/ui/label/src/index.ts'),
      '@ui/menubar': path.resolve(__dirname, './src/app/shared/ui/menubar/src/index.ts'),
      '@ui/native-select': path.resolve(__dirname, './src/app/shared/ui/native-select/src/index.ts'),
      '@ui/navigation-menu': path.resolve(__dirname, './src/app/shared/ui/navigation-menu/src/index.ts'),
      '@ui/pagination': path.resolve(__dirname, './src/app/shared/ui/pagination/src/index.ts'),
      '@ui/popover': path.resolve(__dirname, './src/app/shared/ui/popover/src/index.ts'),
      '@ui/progress': path.resolve(__dirname, './src/app/shared/ui/progress/src/index.ts'),
      '@ui/radio-group': path.resolve(__dirname, './src/app/shared/ui/radio-group/src/index.ts'),
      '@ui/resizable': path.resolve(__dirname, './src/app/shared/ui/resizable/src/index.ts'),
      '@ui/scroll-area': path.resolve(__dirname, './src/app/shared/ui/scroll-area/src/index.ts'),
      '@ui/select': path.resolve(__dirname, './src/app/shared/ui/select/src/index.ts'),
      '@ui/separator': path.resolve(__dirname, './src/app/shared/ui/separator/src/index.ts'),
      '@ui/sheet': path.resolve(__dirname, './src/app/shared/ui/sheet/src/index.ts'),
      '@ui/sidebar': path.resolve(__dirname, './src/app/shared/ui/sidebar/src/index.ts'),
      '@ui/skeleton': path.resolve(__dirname, './src/app/shared/ui/skeleton/src/index.ts'),
      '@ui/slider': path.resolve(__dirname, './src/app/shared/ui/slider/src/index.ts'),
      '@ui/sonner': path.resolve(__dirname, './src/app/shared/ui/sonner/src/index.ts'),
      '@ui/spinner': path.resolve(__dirname, './src/app/shared/ui/spinner/src/index.ts'),
      '@ui/switch': path.resolve(__dirname, './src/app/shared/ui/switch/src/index.ts'),
      '@ui/table': path.resolve(__dirname, './src/app/shared/ui/table/src/index.ts'),
      '@ui/tabs': path.resolve(__dirname, './src/app/shared/ui/tabs/src/index.ts'),
      '@ui/textarea': path.resolve(__dirname, './src/app/shared/ui/textarea/src/index.ts'),
      '@ui/toggle': path.resolve(__dirname, './src/app/shared/ui/toggle/src/index.ts'),
      '@ui/toggle-group': path.resolve(__dirname, './src/app/shared/ui/toggle-group/src/index.ts'),
      '@ui/tooltip': path.resolve(__dirname, './src/app/shared/ui/tooltip/src/index.ts'),
      '@ui/typography': path.resolve(__dirname, './src/app/shared/ui/typography/src/index.ts'),
      '@ui/utils': path.resolve(__dirname, './src/app/shared/ui/utils/src/index.ts'),
    },
  },
  plugins: [
    analog({
      ssr: true,
      static: false,
      prerender: {
        routes: [],
      },
    }),
    tailwindcss()
  ],
}));
