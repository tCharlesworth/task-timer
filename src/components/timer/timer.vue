<script setup>
import { onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'
import clockInput from '../clockInput/clockInput.vue'
import { pad2 } from '../../helpers/helpers'
import './timer.css'

const props = defineProps(['name', 'tid'])

const name = ref(props.name)

const timeText = ref('0:0:0')
const showInput = ref(true)

const startTime = ref(null)
const elapsed = ref(0)
const accumulated = ref(0)

let animate

function setName(e) {
  name.value = e.target.value
}

function update() {
  if(startTime.value) {
    elapsed.value = dayjs().diff(startTime.value, 'seconds')
    animate = requestAnimationFrame(update)
  }
}
function startTimer() {
  showInput.value = false
  startTime.value = dayjs()
  animate = requestAnimationFrame(update)
}
function pauseTimer() {
  accumulated.value += elapsed.value
  elapsed.value = 0
  startTime.value = null
  cancelAnimationFrame(update)
}

function timeRemaining() {
  let h = 0, m = 0, s = 0;
  try {
    const t = timeText.value.split(':')
    h = parseInt(t[0]) || 0
    m = parseInt(t[1]) || 0
    s = parseInt(t[2]) || 0
  } catch (err) {
    console.error(err)
  }

  const secondsStartedWith = ((h*60) + m) * 60 + s;
  const sumSecRemaining = secondsStartedWith - (elapsed.value + accumulated.value)
  const sumMinRemaining = sumSecRemaining/60;
  const sText = sumSecRemaining%60;
  const hText = Math.floor(sumMinRemaining/60)
  const mText = Math.floor(sumMinRemaining % 60)

  return `${pad2(hText)}:${pad2(mText)}:${pad2(sText)}`
}

onUnmounted(() => {
  cancelAnimationFrame(animate)
})
</script>

<template>
  <div class="timer">
    <div>
      <input type="text" :class="focus-outline" :value="name" @input="setName" />
    </div>
    <div class="timer__content">
      <div v-if="showInput">
        <clock-input v-model:time="timeText" />
      </div>
      <div v-if="!showInput">
        <p>{{ timeRemaining() }}</p>
      </div>
      <div>
        <!-- Actions -->
        <button @click="startTimer" :disabled="startTime ? true : false">></button>
        <button @click="pauseTimer" :disabled="startTime ? false : true">||</button>
        <button @click="$emit('remove', props.tid)" :disabled="startTime ? true : false">X</button>
      </div>
    </div>
  </div>
</template>