<script setup>
import { onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'
import './Timer.css'

defineProps(['name'])
defineEmits(['remove'])

const name = ref('name');
const startTime = ref(null);
const elapsed = ref(0);
const accumulated = ref(0);

let animate

function setName(e) {
  name.value = e.target.value
}
function update() {
  if(startTime.value) {
    elapsed.value = dayjs().diff(startTime.value, 'seconds')
  }
  animate = requestAnimationFrame(update);
}
function startTimer() {
  startTime.value = dayjs();
  animate = requestAnimationFrame(update);
}
function pauseTimer() {

}

onUnmounted(() => {
  cancelAnimationFrame(animate)
})
</script>

<template>
  <div class="timer">
    <div>
      <input type="text" :class="focus-outline" :value="name" @change="setName" />
    </div>
    <div class="timer__content">
      <div>
        <!-- Time Display -->
        <p>{{ Math.floor(elapsed/60).toString().padStart(2, '0') }}:{{ Math.floor(elapsed%60).toString().padStart(2, '0') }}</p>
      </div>
      <div>
        <!-- Actions -->
        <button @click="startTimer">></button>
        <button @click="pauseTimer">||</button>
        <button @click="$emit('remove')">X</button>
      </div>
    </div>
  </div>
</template>
