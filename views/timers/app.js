import { createApp } from "vue";

console.log('app')

createApp({
  data() {
    return {
      items: [],
      message: 'Hello World'
    }
  }
}).mount('#app');

// const Load = async () => {
//   const data = await window.electronAPI.getSaveData();
//   console.log('data: ', data);
// }