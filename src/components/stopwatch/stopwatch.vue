<script setup>
import { onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'
import { timeToSeconds, secondsToTime } from '../../helpers/helpers'
import './stopwatch.css'

const timeModel = defineModel('time', { required: true })
const props = defineProps(['name', 'swid'])
defineEmits(['remove'])



const name = ref(props.name);
const startTime = ref(null);
const elapsed = ref(0);
const accumulated = ref(timeToSeconds(timeModel.value || '0:0:0'));

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
function startStopwatch() {
  startTime.value = dayjs();
  animate = requestAnimationFrame(update);
}
function pauseStopwatch() {
  accumulated.value += elapsed.value;
  elapsed.value = 0;
  startTime.value = null;
  cancelAnimationFrame(animate)
}

function getDisplayTime() {
  return secondsToTime(elapsed.value + accumulated.value)
}

onUnmounted(() => {
  cancelAnimationFrame(animate)
})
</script>

<template>
  <div class="stopwatch">
    <div>
      <input type="text" :class="focus-outline" :value="name" @change="setName" />
    </div>
    <div class="stopwatch__content">
      <div>
        <!-- Time Display -->
        <p>{{ getDisplayTime() }}</p>
      </div>
      <div>
        <!-- Actions -->
        <button @click="startStopwatch" :disabled="startTime ? true : false">></button>
        <button @click="pauseStopwatch" :disabled="startTime ? false : true">||</button>
        <button @click="$emit('remove', props.swid)" :disabled="startTime ? true : false">X</button>
      </div>
    </div>
  </div>
</template>
