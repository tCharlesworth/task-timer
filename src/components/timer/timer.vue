<script setup>
import { ref } from 'vue'
const props = defineProps(['name', 'tid'])

const name = ref(props.name);

function setName(e) {
  name.value = e.target.value
}

</script>

<template>
  <div class="timer">
    <div>
      <input type="text" :class="focus-outline" :value="name" @change="setName" />
    </div>
    <div>
      <div>
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