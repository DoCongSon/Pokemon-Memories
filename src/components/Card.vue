<template>
  <div
    class="card"
    :class="{ disabled: isDisabled }"
    :style="{
      height: `${(738 - 16 * 4) / Math.sqrt(cardContexts.length) - 16}px`,
      width: `${(((738 - 16 * 4) / Math.sqrt(cardContexts.length) - 16) * 3) / 4}px`,
      perspective: `${((((738 - 16 * 4) / Math.sqrt(cardContexts.length) - 16) * 3) / 4) * 2}px`,
    }"
  >
    <div
      @transitionstart="isTransition = true"
      @transitionend="isTransition = false"
      @click="handleToggleCard"
      class="card__inner"
      :class="{ 'is-flipped': isCardFlipped }"
    >
      <div class="card__face card__face--font">
        <div class="card__content"></div>
      </div>
      <div class="card__face card__face--back">
        <div
          class="card__content"
          :style="{ backgroundImage: `url('src/assets/${imagePath}')` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const isCardFlipped = ref(false);
const emits = defineEmits(['onOpen', 'onClose']);
const isTransition = ref(false);
const isDisabled = ref(false);
const props = defineProps({
  imagePath: {
    type: String,
    required: true,
  },
  card: {
    type: [Object, Number],
    required: true,
  },
  isNoFlip: {
    type: Boolean,
    default: true,
  },
  cardContexts: {
    type: Array,
    required: true,
  },
});

const handleToggleCard = () => {
  if (props.isNoFlip) return;
  if (isTransition.value) return;
  if (isDisabled.value) return;
  isCardFlipped.value = !isCardFlipped.value;
  if (isCardFlipped.value) {
    emits('onOpen', { card: props.card });
  } else {
    emits('onClose', { card: props.card });
  }
};

const handleBackCard = () => {
  isCardFlipped.value = false;
};

const handleDisableCard = () => {
  isDisabled.value = true;
};

defineExpose({
  handleBackCard,
  handleDisableCard,
});
</script>

<style lang="scss">
.card {
  display: inline-block;
  margin: 0 1rem 1rem 0;
  perspective: 300px;

  &__inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    transform-style: preserve-3d;
    cursor: pointer;

    &.is-flipped {
      transform: rotateY(-180deg);
    }
  }

  &__face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    @media (prefers-color-scheme: light) {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    &--font {
      .card__content {
        background-image: url('../assets/images/icon_back.png');
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        width: 90%;
        margin: auto;
        height: 100%;
      }
    }

    &--back {
      .card__content {
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        width: 90%;
        margin: auto;
        height: 100%;
      }
      transform: rotateY(180deg);
    }
  }
}

.disabled {
  .card__inner {
    cursor: default;
  }
}
</style>
