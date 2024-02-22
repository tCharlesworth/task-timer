import '../../styles.css';
import './app.css';
import { createApp } from "vue"
import App from './app.vue'

createApp(App).mount('#app');

// const Load = async () => {
//   const data = await window.electronAPI.getSaveData();
//   console.log('data: ', data);
// }