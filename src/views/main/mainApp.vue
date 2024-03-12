<script setup>
import { ref } from 'vue'
import { GetStoredClocks, SetStoredClocks } from '../../helpers/localStorage'
import Stopwatch from '../../components/stopwatch/stopwatch.vue'
import Timer from '../../components/timer/timer.vue'

const TYPES = { Timer: 'timer', Stopwatch: 'stopwatch' }

// console.log('loaded: ', GetStoredClocks())
const areQuickActionsVisible = ref(false)
const items = ref(GetStoredClocks())
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
  SetStoredClocks(items.value)
}

const addTimer = ()=>{
  areQuickActionsVisible.value = false
  items.value.push({
    id: crypto.randomUUID(),
    type: TYPES.Timer,
    name: `Timer ${createCount.value}`
  })
  SetStoredClocks(items.value)
}

const removeItemById = (id)=>{
  items.value = items.value.filter((i) =>{ return i.id !== id });
  SetStoredClocks(items.value)
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
          :clock="item"
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