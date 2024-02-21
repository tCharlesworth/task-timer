<script setup>

defineProps(['name'])
defineEmits(['remove'])

const startTime = null;
const accumulatedTime = null;

</script>

<template>
  <div class="timer">
    <p>TIMER {{ name }}</p>
    <button @click="$emit('remove')">X</button>
  </div>
</template>
