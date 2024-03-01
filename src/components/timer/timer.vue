<script setup>
import { ref } from 'vue'
import clockInput from '../clockInput/clockInput.vue'

const props = defineProps(['name', 'tid'])

const name = ref(props.name)

const minText = ref('10')
const hourText = ref('10')
const showInput = ref(true)

function setName(e) {
  name.value = e.target.value
}

function startTimer() {
  showInput.value = false
}

</script>

<template>
  <div class="timer">
    <div>
      <input type="text" :class="focus-outline" :value="name" @input="setName" />
    </div>
    <div>
      <div v-if="showInput">
        <clock-input v-model:hour="hourText" v-model:minute="minText" />
      </div>
      <div v-if="!showInput">
        <p>{{ Math.floor((elapsed + accumulated)/60).toString().padStart(2, '0') }}:{{ Math.floor((elapsed + accumulated)%60).toString().padStart(2, '0') }}</p>
      </div>
      <div>
        <!-- Actions -->
        <button @click="startTimer">></button>
        <button>||</button>
        <button @click="$emit('remove', props.tid)">X</button>
      </div>
    </div>
  </div>
</template>