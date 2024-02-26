<script setup>
import { ref } from 'vue'
import Stopwatch from '../../components/stopwatch/stopwatch.vue'
import Timer from '../../components/timer/timer.vue'

const TYPES = { Timer: 'timer', Stopwatch: 'stopwatch' }

const areQuickActionsVisible = ref(false)
const items = ref([])
const createCount = ref(0)

const toggleQuickActions = ()=>{
  areQuickActionsVisible.value = !areQuickActionsVisible.value
}

const addStopwatch = ()=>{
  areQuickActionsVisible.value = false
  items.value.push({
    id: crypto.randomUUID(),
    type: TYPES.Stopwatch,
    name: `Stopwatch ${createCount.value}`
  })
}

const addTimer = ()=>{
  areQuickActionsVisible.value = false
  items.value.push({
    id: crypto.randomUUID(),
    type: TYPES.Timer,
    name: `Timer ${createCount.value}`
  })
}

const removeItemById = (id)=>{
  items.value = items.value.filter((i) =>{ return i.id !== id });
}

</script>

<template>
  <div v-if="areQuickActionsVisible" class="quick-action-menu">
    <div class="backdrop" @click="toggleQuickActions"></div>
    <div class="actions">
      <button @click="addTimer">T</button>
      <button @click="addStopwatch">S</button>
    </div>
  </div>
  <main>
    <div class="list">
      <template v-for="item in items" :key="item.id">
        <Stopwatch 
          v-if="item.type == TYPES.Stopwatch"
          :swid="item.id"
          :name="item.name"
          @remove="removeItemById"
        ></Stopwatch>
        <Timer
          v-if="item.type == TYPES.Timer"
          :tid="item.id"
          :name="item.name"
          @remove="removeItemById"
        ></Timer>
      </template>
    </div>
    
    <button class="quick-actions-trigger primary round" @click="toggleQuickActions">+</button>
  </main>
</template>