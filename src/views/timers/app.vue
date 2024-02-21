<script setup>
import { ref } from 'vue'
import Timer from '../../components/Timer.vue'

const timers = ref([]);

const addTimer = ()=>{
  timers.value.push({
    name: 'New Timer'
  })
};

</script>

<template>
  <div>
    <p>Timers</p>
    <div>
      <Timer v-for="(timer, index) in timers"
        :key="index"
        :name="timer.name"
        @remove="timers.splice(index, 1)"
      ></Timer>
    </div>
    <button @click="addTimer">Add Timer</button>
  </div>
</template>
