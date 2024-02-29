<script setup>
import { ref } from 'vue'
import clockInput from '../clockInput/clockInput.vue'

const props = defineProps(['name', 'tid'])

const name = ref(props.name)

const timeText = ref('12:12')
const lastTimeText = ref('')
const showInput = ref(true)

function setName(e) {
  name.value = e.target.value
}

function setTimeText(value) {
  console.log('parent: ', value)
  lastTimeText.value = timeText.value
  timeText.value = value
}

</script>

<template>
  <div class="timer">
    <div>
      <input type="text" :class="focus-outline" :value="name" @input="setName" />
    </div>
    <div>
      <div v-if="showInput">
        <clock-input @update="setTimeText" :value="timeText" />
      </div>
      <div v-if="!showInput">
        <p>{{ Math.floor((elapsed + accumulated)/60).toString().padStart(2, '0') }}:{{ Math.floor((elapsed + accumulated)%60).toString().padStart(2, '0') }}</p>
      </div>
      <div>
        <!-- Actions -->
        <button>></button>
        <button>||</button>
        <button @click="$emit('remove', props.tid)">X</button>
      </div>
    </div>
  </div>
</template>