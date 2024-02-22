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
  <main>
    <p>Timers</p>
    <div class="timer-list">
      <Timer v-for="(timer, index) in timers"
        :key="index"
        :name="timer.name"
        @remove="timers.splice(index, 1)"
      ></Timer>
    </div>
    <button class="fluid" @click="addTimer">Add Timer</button>
  </main>
</template>
