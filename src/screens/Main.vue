<template>
  <div class="screen">
    <h1>POKEMON MEMORIES</h1>
    <h3>SELECT MODE TO START GAME</h3>
    <div class="action">
      <button @click="onStart(4)">
        <span> 2x2 </span>
        <span> Very easy </span>
      </button>
      <button @click="onStart(16)">
        <span> 4x4 </span>
        <span> Easy </span>
      </button>
      <button @click="onStart(36)">
        <span> 6x6 </span>
        <span> Normal </span>
      </button>
      <button @click="onStart(64)">
        <span> 8x8 </span>
        <span> Hard </span>
      </button>
      <button @click="onStart(100)">
        <span> 10x10 </span>
        <span> Very hard </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['OnStart']);

function onStart(block) {
  emits('OnStart', { block });
}
</script>

<style scoped lang="scss">
.screen {
  h1 {
    font-size: 4.5rem;
    text-transform: uppercase;
  }
  p {
    font-size: 2rem;
  }
}

.action {
  display: flex;
  margin-top: 2rem;
  button {
    font-family: 'Odibee Sans', sans-serif;
    width: 150px;
    height: 150px;
    background: transparent;
    box-shadow: none;
    border: 1px solid white;
    color: rgba(255, 255, 255, 0.87);
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    margin: 0 1rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: white;
      color: #213547;
    }
    span:first-child {
      font-size: 2rem;
    }
    span:last-child {
      display: block;
      font-size: 1.25rem;
      margin-top: 0.5rem;
    }
  }
}
</style>
