<script setup>
import Main from './screens/Main.vue';
import Result from './screens/Result.vue';
import Interact from './screens/Interact.vue';
import CopyRight from './screens/CopyRight.vue';
import Ranks from './screens/Ranks.vue';
import { ref } from 'vue';

const statusMatch = ref('default');
const settings = ref({
  block: 0,
  startedAt: null,
  timeFinished: null,
  cardContexts: [],
});

const handleBeforeStart = (configs) => {
  settings.value.block = configs.block;
  const genArray = Array.from({ length: configs.block / 2 }, (_, i) => i + 1);
  const cardContexts = genArray.flatMap((i) => [i, i]);
  settings.value.cardContexts = cardContexts.sort(() => Math.random() - 0.5);
  settings.value.startedAt = new Date().getTime();
  statusMatch.value = 'match';
};

const handleFinish = () => {
  const currentTime = new Date().getTime();
  const time = (currentTime - settings.value.startedAt) / 1000;
  settings.value.timeFinished = time.toFixed(2);
  statusMatch.value = 'finish';
};

const handlePlayAgain = () => {
  statusMatch.value = 'default';
};
</script>

<template>
  <div id="app">
    <h1 v-if="statusMatch !== 'ranks'" class="rank" @click="statusMatch = 'ranks'">🏆</h1>
    <Main @onStart="handleBeforeStart" v-if="statusMatch === 'default'" />
    <Interact
      v-if="statusMatch === 'match'"
      :cardContexts="settings.cardContexts"
      @onFinish="handleFinish"
    />
    <Result
      v-if="statusMatch === 'finish'"
      :time="settings.timeFinished"
      :block="settings.block"
      @onPlayAgain="handlePlayAgain"
    />
    <Ranks v-if="statusMatch === 'ranks'" @on-back-to-home="statusMatch = 'default'" />
    <CopyRight />
  </div>
</template>

<style scoped>
.rank {
  position: absolute;
  margin: 0;
  display: block;
  z-index: 3;
  top: 0;
  right: 0;
  font-size: 3rem;
  margin: 1rem;
  cursor: pointer;
}
</style>
