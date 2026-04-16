import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router, { initializeRouter } from './router';
import './styles/main.css';

await initializeRouter();

createApp(App).use(router).use(ElementPlus).mount('#app');
