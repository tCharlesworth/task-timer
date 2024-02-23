<script setup>
import { ref } from 'vue'
import Stopwatch from '../../components/stopwatch.vue'

const stopwatches = ref([]);

const addStopwatch = ()=>{
  stopwatches.value.push({
    name: `Stopwatch ${stopwatches.length + 1}`
  })
};

addStopwatch();

</script>

<template>
  <main>
    <p>Stopwatches</p>
    <div class="stopwatch-list">
      <Stopwatch v-for="(stopwatch, index) in stopwatches"
        :key="index"
        :name="stopwatch.name"
        @remove="stopwatches.splice(index, 1)"
      ></Stopwatch>
    </div>
    <button class="fluid" @click="addStopwatch">Add Stopwatch</button>
  </main>
</template>
