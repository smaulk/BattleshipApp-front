import { createApp } from 'vue'
import App from '@/App.vue';
import '@/assets/sass/style.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import routerConfig from "@/router.config.ts";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const host: string = import.meta.env.VITE_HOST ?? 'http://127.0.0.1'
const port: number = import.meta.env.PROD ? 9001 : 80;

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  wsHost: import.meta.env.VITE_PUSHER_HOST,
  wsPort: import.meta.env.VITE_PUSHER_PORT,
  wssPort: import.meta.env.VITE_PUSHER_PORT,
  forceTLS: import.meta.env.VITE_PUSHER_SCHEME === 'https',
  authEndpoint: `${host}:${port}/broadcasting/auth`,
  enabledTransports: ['ws', 'wss'],
});


createApp(App)
  .use(routerConfig)
  .mount('#app');
