<script setup>
import { onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'
import { UpdateStoredClock } from '../../helpers/localStorage';
import { timeToSeconds, secondsToTime } from '../../helpers/helpers'
import './stopwatch.css'

const props = defineProps(['clock'])
defineEmits(['remove'])

const initClock = props.clock || {};
const name = ref(initClock.name ? initClock.name : 'Stopwatch');
const startTime = ref(initClock.startTime ? dayjs(initClock.startTime) : null);
const elapsed = ref(0);
const accumulated = ref(initClock.accumulated ? initClock.accumulated : timeToSeconds('0:0:0'));

let animate

/**1710222889
 * @returns {Stopwatch}
 */
function updateData() {
  UpdateStoredClock({
    id: props.clock.id,
    name: name.value,
    type: 'stopwatch',
    startTime: startTime.value ? startTime.value.toISOString() : null,
    accumulated: accumulated.value
  })
}
function setName(e) {
  name.value = e.target.value
  updateData()
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
  updateData()
}
function pauseStopwatch() {
  accumulated.value += elapsed.value;
  elapsed.value = 0;
  startTime.value = null;
  cancelAnimationFrame(animate)
  updateData()
}

function getDisplayTime() {
  return secondsToTime(elapsed.value + accumulated.value)
}

if(startTime.value) {
  animate = requestAnimationFrame(update);
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
        <button @click="$emit('remove', props.clock.id)" :disabled="startTime ? true : false">X</button>
      </div>
    </div>
  </div>
</template>
