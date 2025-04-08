<template>
  <div class="header">
    <div class="title">{{ title }}</div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "HeaderLine",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;

  .title {
    font-size: 25px;
    font-weight: bold;
    color: #16274a;
    flex: none;
  }

  .line {
    width: 100%;
    height: 3px;
    margin-left: 8px;
    background-color: #16274a;
  }
}
</style>
