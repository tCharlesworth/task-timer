<script setup>
import { ref } from 'vue'
import Stopwatch from '../../components/stopwatch.vue'

const stopwatches = ref([])
const createCount = ref(0)

const addStopwatch = ()=>{
  createCount.value += 1;
  stopwatches.value.push({
    id: crypto.randomUUID(),
    name: `Stopwatch ${createCount.value}`
  })
};

const removeStopwatch = (swid) => {
  stopwatches.value = stopwatches.value.filter((sw) =>{ return sw.id !== swid });
}

addStopwatch();

</script>

<template>
  <main>
    <p>Stopwatches</p>
    <div class="stopwatch-list">
      <Stopwatch v-for="(stopwatch) in stopwatches"
        :key="stopwatch.id"
        :swid="stopwatch.id"
        :name="stopwatch.name"
        @remove="removeStopwatch"
      ></Stopwatch>
    </div>
    <button class="fluid" @click="addStopwatch">Add Stopwatch</button>
  </main>
</template>
