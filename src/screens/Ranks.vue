<template>
  <div class="screen">
    <div class="action">
      <button @click="getRanks(4)">
        <span> Very easy </span>
      </button>
      <button @click="getRanks(16)">
        <span> Easy </span>
      </button>
      <button @click="getRanks(36)">
        <span> Normal </span>
      </button>
      <button @click="getRanks(64)">
        <span> Hard </span>
      </button>
      <button @click="getRanks(100)">
        <span> Very hard </span>
      </button>
    </div>
    <h1>Ranks 🏆</h1>
    <div class="ranks-head">
      <div class="rank-item">
        <span class="a">STT</span>
        <span class="b">Name</span>
        <span class="c">Time</span>
      </div>
    </div>
    <div class="ranks-container">
      <div class="rank-item" v-for="(item, index) in ranks">
        <span class="a">{{ index + 1 }}</span>
        <span class="b">{{ item.name }}</span>
        <span class="c">{{ item.time }} s</span>
      </div>
    </div>
    <button @click="handleBackToHome"><span>Home</span></button>
  </div>
</template>
<script setup>
import { defineEmits, ref } from 'vue';
import { getScores } from '../firebase';

const emits = defineEmits(['onBackToHome']);
const ranks = ref([]);

const getRanks = async (mode) => {
  const scores = await getScores({ mode: mode });
  ranks.value = scores;
};

getRanks(4);

const handleBackToHome = () => {
  emits('onBackToHome');
};
</script>
<style lang="scss" scoped>
.screen {
  justify-content: flex-start;
}

.action {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  margin: 2rem 0;
  display: block;
}

button {
  font-family: 'Odibee Sans', sans-serif;
  width: 100px;
  height: 60px;
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
  span {
    font-size: 1.2rem;
  }
}

.b {
  display: inline-block;
  width: 200px;
}

.a {
  display: inline-block;
  width: 100px;
}

.c {
  display: inline-block;
  width: 100px;
}

.ranks-container {
  height: 500px;
  overflow-y: scroll;
  width: 100%;
  padding: 0 5rem;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.ranks-head {
  width: 100%;
  padding: 0 5rem;
}

.ranks-container::-webkit-scrollbar {
  display: none;
}

.rank-item {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 1.5rem;
    display: inline-block;
  }
}
</style>
