<template>
  <div
    class="screen main-screen"
    :style="{
      width: `${
        ((((738 - 16 * 4) / Math.sqrt(cardContexts.length) - 16) * 3) / 4 + 16) *
        (Math.sqrt(cardContexts.length) + 0.75)
      }px`,
    }"
  >
    <CardFlip
      :image-path="`images/${card}.png`"
      v-for="(card, index) in cardContexts"
      :key="index"
      ref="cardRefs"
      :card="{ value: card, index }"
      @onOpen="checkRule"
      @onClose="handleRemoveCard"
      :is-no-flip="rules.length >= 2"
      :card-contexts="cardContexts"
    />
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits, handleError } from 'vue';
import CardFlip from '../components/Card.vue';

const emits = defineEmits(['onFinish']);

const props = defineProps({
  cardContexts: {
    type: Array,
    required: true,
  },
});

// ref card
const cardRefs = ref([]);

const cardFinish = ref(0);
const rules = ref([]);

const handleRemoveCard = ({ card }) => {
  rules.value = rules.value.filter((item) => item.index !== card.index);
};

const checkRule = ({ card }) => {
  if (rules.value.length >= 2) return;
  if (rules.value.length === 1) {
    if (rules.value[0].index === card.index) {
      rules.value = [];
      return;
    }
  }
  rules.value.push(card);
  if (rules.value.length === 2) {
    if (rules.value[0].value === rules.value[1].value) {
      console.log('match');
      setTimeout(() => {
        cardFinish.value += 2;
        cardRefs.value[rules.value[0].index].handleDisableCard();
        console.log(cardRefs.value[rules.value[0].index]);
        cardRefs.value[rules.value[1].index].handleDisableCard();
        rules.value = [];
        if (cardFinish.value === props.cardContexts.length) {
          emits('onFinish');
        }
      }, 500);
    } else {
      setTimeout(() => {
        cardRefs.value[rules.value[0].index].handleBackCard();
        cardRefs.value[rules.value[1].index].handleBackCard();
        rules.value = [];
      }, 500);
    }
  }
  console.log(rules.value);
};
</script>

<style lang="scss" scoped>
.main-screen {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: auto;
}
</style>
