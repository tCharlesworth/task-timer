<script setup>
import { defineModel, ref } from 'vue'
import { pad2 } from '../../helpers/helpers'
import './clockInput.css'

const timeModel = defineModel('time', { required: true })

const initialTime = timeModel.value.split(':');

const hours = ref(initialTime.length >= 1 ? initialTime[0] : '0'),
      minutes = ref(initialTime.length >= 2 ? initialTime[1] : '0'),
      seconds = ref(initialTime.length >= 3 ? initialTime[2] : '0')

const minRef = ref(),
      secRef = ref()

const checkDigit = (e) => {
  if(e.key.length === 1 && isNaN(Number(e.key))) {
    e.preventDefault();
  }
}

function update() {
  timeModel.value = `${pad2(hours.value)}:${pad2(minutes.value)}:${pad2(seconds.value)}`
}

function checkHourInput (e) {
  const val = e.target.value
  if(val.length >= 2) {
    minRef.value.focus()
    minRef.value.select()
  }
  update()
}
function checkMinuteInput (e) {
  const val = e.target.value
  if(val.length >= 2) {
    secRef.value.focus()
    secRef.value.select()
  }
  update()
}
function checkSecondInput() {
  update()
}
</script>

<template>
  <div class="clock-input">
    <input type="text" v-model="hours" @input="checkHourInput" @keydown="checkDigit" maxlength="2" />
    <span>:</span>
    <input type="text" ref="minRef" v-model="minutes" @input="checkMinuteInput" @keydown="checkDigit" maxlength="2" />
    <span>:</span>
    <input type="text" ref="secRef" v-model="seconds" @input="checkSecondInput" @keydown="checkDigit" maxlength="2" />
  </div>
</template>