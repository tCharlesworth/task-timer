<script setup>
import { defineModel, ref } from 'vue'
import './clockInput.css'

const hourModel = defineModel('hour', { required: true })
const minModel = defineModel('minute', { required: true })

const minRef = ref()

const checkDigit = (e) => {
  if(e.key.length === 1 && isNaN(Number(e.key))) {
    e.preventDefault();
  }
}

const checkInput = (e) => {
  const val = e.target.value
  if(val.length >= 2) {
    minRef.value.focus()
    minRef.value.select()
  }
}
</script>

<template>
  <div class="clock-input">
    <input type="text" v-model="hourModel" @input="checkInput" @keydown="checkDigit" maxlength="2" />
    <span>:</span>
    <input type="text" ref="minRef" v-model="minModel" @keydown="checkDigit" maxlength="2" />
  </div>
</template>