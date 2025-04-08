<template>
  <div
    class="button-container"
    :class="[isOutline ? 'bg-outline' : 'bg', isDisabeld ? 'bg-disabeld' : '']"
    @click="onClick"
  >
    <div class="label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    isOutline: {
      type: Boolean,
      required: false,
      default: false,
    },
    isDisabeld: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.button-container {
  min-width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  cursor: pointer;
  font-size: 17px;

  &.bg-outline {
    border: #16274a 1px solid;
    background-color: #ffffff;
    color: #16274a;
  }

  &.bg {
    background-color: #16274a;
    border: #16274a 1px solid;
    color: #ffffff;
  }

  &.bg-disabeld {
    background-color: #6b7287;
    border: #6b7287 1px solid;
    pointer-events: none;
    cursor: default;
  }
}
</style>
