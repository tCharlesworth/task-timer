<script setup>
import { ref, watch } from 'vue'
import './clockInput.css'

const props = defineProps(['value'])
const emit = defineEmits(['update'])

let initHour = '', initMin = ''

if( props.value ) {
  if(props.value.indexOf(':') !== -1) {
    const txt = props.value.split(':')
    initHour = txt[0]
    initMin = txt[1]
  } else {
    initHour = props.value
  }
}

const hourRef = ref()
      minRef = ref()

const updateParent = (hourText, minText) => {
  emit('update', `${hourText}:${minText}`)
}

const checkDigit = (e) => {
  if(e.key.length === 1 && isNaN(Number(e.key))) {
    e.preventDefault();
  }
}
const setHourText = (e) => {
  updateParent(e.target.value, initMin)
}

const setMinText = (e) => {
  updateParent(initHour, e.target.value)
}

const onPropsChanged = (newVal, oldVal) => {

}

watch( ()=>props.value, onPropsChanged)

</script>

<template>
  <div class="clock-input">
    <input type="text" ref="hourRef" :value="hourText" @input="setHourText" @keydown="checkDigit" maxlength="2" />
    <span>:</span>
    <input type="text" ref="minRef" :value="minText" @input="setMinText" @keydown="checkDigit" maxlength="2" />
  </div>
  
</template>