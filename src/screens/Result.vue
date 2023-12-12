<template>
  <div class="screen">
    <h1>🎉 Congratulation 🎉</h1>
    <h3>
      You have finished the game after <span>{{ time }}</span> second, ranked
      <span>{{ stt }}</span> out of <span>{{ total }}</span> player
    </h3>
    <input
      type="text"
      placeholder="Type your name"
      v-model="nameFlayer"
      :class="{ error: error }"
    />
    <div class="action">
      <button @click="handleSave">Save your score</button>
      <button @click="handlePlayAgain">Play again</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import { setScore, getScores } from '../firebase';

const emits = defineEmits(['onPlayAgain']);
const nameFlayer = ref('');
const stt = ref(1);
const total = ref(0);
const ranks = ref([]);
const error = ref(false);

watch(nameFlayer, (value) => {
  if (value !== '') {
    error.value = false;
  }
});

const props = defineProps({
  time: {
    type: [Number, String],
    required: true,
  },
  block: {
    type: Number,
    required: true,
  },
});

const handlePlayAgain = () => {
  emits('onPlayAgain');
};

const getRanks = async () => {
  const scores = await getScores({ mode: props.block });
  ranks.value = scores;
  total.value = scores.length + 1;
  stt.value = total.value;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i].time > Number(props.time)) {
      stt.value = i + 1;
      break;
    }
  }
};

getRanks();

watch(ranks, (value) => {
  console.log(value);
});

const handleSave = async () => {
  if (nameFlayer.value === '') {
    error.value = true;
    return;
  }
  await setScore({ name: nameFlayer.value, time: Number(props.time), mode: props.block });
  emits('onPlayAgain');
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 5rem;
}

h3 {
  margin-top: 1.5rem;
  font-size: 3rem;
}

span {
  color: #efe308;
}

input {
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-family: 'Odibee Sans', sans-serif;
  border: 2px solid white;
  font-size: 2rem;
  color: white;
  background-color: transparent;
  transition: all 0.3s ease-in-out;
  &:focus {
    outline: none;
    border-color: #213547;
  }
  &.error {
    border-color: red;
    &::placeholder {
      color: rgb(162, 4, 4);
    }
  }
}

.action {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  font-family: 'Odibee Sans', sans-serif;
  background: transparent;
  box-shadow: none;
  border: 1px solid white;
  color: rgba(255, 255, 255, 0.87);
  margin: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: white;
    color: #213547;
  }
}
</style>
